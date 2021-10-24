import { useCallback, useContext, useState } from "react";
import axios, { Response, Options } from "redaxios";
import { merge } from "merge-anything";
import { dequal as isEqual } from "dequal";
import { useCustomCompareEffect as useDeepEffect } from "use-custom-compare";

import { useRedaxiosOptions, useRedaxiosFnReturns, RequestTypes } from "../typings";
import { RedaxiosContext } from "./provider";
import { cache, genKey } from "../cache";

export function useRedaxios<Body>(
    url: string,
    options: useRedaxiosOptions<Body> = {},
    deps?: any[]
) {
    // default options
    const { options: defaults } = useContext(RedaxiosContext);

    // data, loading, error state
    // try to get the cached data when the component mounts
    const [data, setData] = useState<Body | undefined>(
        (cache.get(genKey({ url, relativeUrl: "", type: "get", options, deps })) as Body) ??
            undefined
    );
    const [loading, setLoading] = useState(!!deps);
    const [fetching, setFetching] = useState(!!deps);
    const [error, setError] = useState<Response<any> | undefined>(undefined);

    // main request firing callback
    const axiosRequest = async <T>(type: RequestTypes, relativeUrl: string, body?: T) => {
        setFetching(true);

        // see if we have this url's cache already
        const curCache = cache.get(genKey({ url, relativeUrl, type, body, options, deps }));

        if (curCache) {
            setData(curCache as Body);
            // we have the cache so don't load, but still request
            setLoading(false);
        } else setLoading(true);

        // merge the default options with the currently passed ones
        const mergedOpts = merge(defaults, options);

        // helper methods
        const onSuccess = (res: Body) => {
            mergedOpts.onSuccess && mergedOpts.onSuccess(res);
        };
        const onError = (res: Response<any>) => {
            mergedOpts.onError && mergedOpts.onError(res);
        };
        
        // interceptor helpers
        const requestInterceptor = (options: Options) => {
            if (mergedOpts.interceptors?.request) {
                return mergedOpts.interceptors.request(options);
            }
            return options;
        };
        const responseInterceptor = (data: Body) => {
            if (mergedOpts.interceptors?.response) {
                return mergedOpts.interceptors.response(data);
            }
            return data;
        };

        // execute request interceptor
        mergedOpts.axios = await requestInterceptor(mergedOpts.axios ?? {});

        // fire the request with proper error handling
        const [data, error] = await awaitPromise(
            axios<Body>({
                url: url + relativeUrl,
                method: type,
                data: body as any,
                ...mergedOpts.axios,
            })
        );
        // if error fire the onError callback
        if (error) {
            setError(data);
            onError(data);
            setFetching(false);
            setLoading(false);
            return;
        }

        // execute response interceptor
        data.data = (await responseInterceptor(data.data)) as Body;

        // don't re-render the data if we have the cache already
        if (!isEqual(data.data, curCache)) {
            // add to cache
            cache.set(genKey({ url, relativeUrl, type, body, options, deps }), data.data);
            setData(data.data);
        }
        setError(undefined);
        onSuccess(data.data);
        setFetching(false);
        setLoading(false);

        return data.data;
    };

    // effect when to fire the request
    useDeepEffect(
        () => {
            if (Array.isArray(deps)) {
                axiosRequest<null>("get", "");
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [...(deps ?? [])],
        isEqual
    );

    // for manual request firing
    const get = useCallback(async (url = "") => {
        return axiosRequest("get", url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    const post = useCallback(async <T>(url = "", data: T) => {
        return axiosRequest("post", url, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    const del = useCallback(async (url = "") => {
        return axiosRequest("delete", url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
    
    const put = useCallback(async <T>(url = "", data: T) => {
        return axiosRequest("put", url, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
    
    const patch = useCallback(async <T>(url = "", data: T) => {
        return axiosRequest("patch", url, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return {
        data,
        error,
        fetching,
        loading,
        get,
        post,
        del,
        put,
        patch,
    } as useRedaxiosFnReturns<Body>;
}

// helper function with try catch hell
async function awaitPromise<T>(promise: Promise<T>): Promise<[T, true | false]> {
    try {
        const data = await promise;
        return [data as T, false];
    } catch (data) {
        return [data as unknown as T, true];
    }
}
