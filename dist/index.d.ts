import { Options, Response } from 'redaxios';
export { Response } from 'redaxios';
import { ReactNode } from 'react';

interface useRedaxiosOptions<Body> {
    interceptors?: {
        request?: (request: Options) => Promise<Options>;
        response?: (body: Body) => Promise<any>;
    };
    onSuccess?: (res: Body) => void;
    onError?: (error: Response<any>) => void;
    axios?: Options;
}

type BodyMethod = <Data>(url: string, data: any) => Promise<Data>;
type BodylessMethod<T> = (url?: string) => Promise<T>;

interface useRedaxiosFnReturns<T> {
    get: BodylessMethod<T>;
    del: BodylessMethod<T>;

    post: BodyMethod;
    put: BodyMethod;
    patch: BodyMethod;

    fetching: boolean;
    loading: boolean;

    data: T | undefined;
    error: Response<any> | undefined;
}

type RequestTypes = "post" | "get" | "delete" | "put" | "patch";

declare function useRedaxios<T>(
    url: string,
    options?: useRedaxiosOptions<T>,
    deps?: any[]
): useRedaxiosFnReturns<T>;

declare function RedaxiosProvider({
    options,
    children,
}: {
    options: useRedaxiosOptions<unknown>;
    children: ReactNode;
}): JSX.Element;

export { RedaxiosProvider, RequestTypes, useRedaxios as default, useRedaxios, useRedaxiosFnReturns, useRedaxiosOptions };
