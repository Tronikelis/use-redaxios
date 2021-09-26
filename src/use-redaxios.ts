import { useContext, useState } from "react";
import axios, { Response } from "redaxios";
import { merge } from "merge-anything";
import { dequal as isEqual } from "dequal";
import {
    useCustomCompareEffect as useDeepEffect, useCustomCompareCallback as useDeepCallback
} from "use-custom-compare";

import { useRedaxiosOptions, useRedaxiosFnReturns, RequestTypes } from "./typings";
import { FetchContext } from "./provider";

export function useRedaxios<Body>(
    url: string,
    options: useRedaxiosOptions<Body> = {},
    deps?: any[]
) {
    // default options
    const { options: defaults } = useContext(FetchContext);

    // data, loading, error state
    const [data, setData] = useState<Body | null>(null);
    const [loading, setLoading] = useState(!!deps);
    const [error, setError] = useState<Response<any> | null>(null);

    // main request firing callback
    const axiosRequest = useDeepCallback(
        async <T>(type: RequestTypes, relativeUrl: string, body?: T) => {

            // merge the default options with the currently passed ones
            const mergedOpts = merge(defaults, options);

            // helper methods
            const onSuccess = (res: Body) => {
                mergedOpts.onSuccess && mergedOpts.onSuccess(res);
            };
            const onError = (res: Response<any>) => {
                mergedOpts.onError && mergedOpts.onError(res);
            };

            // start loading
            setLoading(true);

            // execute interceptors
            mergedOpts.axios = options.interceptors?.request
                ? await options.interceptors.request(mergedOpts.axios ?? {})
                : mergedOpts.axios;

            // fire the request with proper error handling
            const [data, error] = await awaitPromise(
                axios<Body>({
                    url: url + relativeUrl,
                    method: type,
                    body: body as any,
                    ...mergedOpts.axios,
                })
            );
            // if error fire the onError callback
            if (error) {
                setLoading(false);
                setError(data);
                onError(data);
                return;
            }

            setLoading(false);
            setData(data.data);
            setError(null);
            onSuccess(data.data);
            return data.data;
        },
        [defaults, options, url],
        isEqual
    );

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
    const get = async (url: string = "") => {
        return await axiosRequest<null>("get", url);
    };
    const post = async <T>(url: string = "", data: T) => {
        return await axiosRequest("post", url, data);
    };
    const del = async (url: string = "") => {
        return await axiosRequest("delete", url);
    };
    const put = async <T>(url: string = "", data: T) => {
        return await axiosRequest("put", url, data);
    };
    const patch = async <T>(url: string = "", data: T) => {
        return await axiosRequest("patch", url, data);
    };

    return {
        data,
        loading,
        error,
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
