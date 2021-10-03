import { Options, Response } from "redaxios";
import { ReactNode } from "react";

export { Response };

export interface useRedaxiosOptions<Body> {
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

export interface useRedaxiosFnReturns<T> {
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

export type RequestTypes = "post" | "get" | "delete" | "put" | "patch";

export function useRedaxios<T>(
    url: string,
    options?: useRedaxiosOptions<T>,
    deps?: any[]
): useRedaxiosFnReturns<T>;

export function RedaxiosProvider({
    options,
    children,
}: {
    options: useRedaxiosOptions<unknown>;
    children: ReactNode;
}): JSX.Element;
