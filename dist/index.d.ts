import { Options, Response } from 'redaxios';
import { ReactNode } from 'react';

interface useRedaxiosOptions<Body> {
  interceptors?: {
    request?: (request: Options) => Promise<Options>
  }
  onSuccess?: (res: Body) => void
  onError?: (error: Response<any>) => void
  axios?: Options
}

type BodyMethod = <Data>(url: string, data: any) => Promise<Data>
type BodylessMethod<T> = (url?: string) => Promise<T>

interface useRedaxiosFnReturns<T> {
  get: BodylessMethod<T>
  del: BodylessMethod<T>

  post: BodyMethod
  put: BodyMethod
  patch: BodyMethod

  loading: boolean
  data: T | null
  error: Response<any>
}

type RequestTypes = 'post' | 'get' | 'delete' | 'put' | 'patch'

declare function useRedaxios<T>(
  url: string,
  options: useRedaxiosOptions<T> = {},
  deps?: any[]
): useRedaxiosFnReturns<T>

declare function FetchProvider({
  options,
  children
}: {
  options: useRedaxiosOptions<unknown>
  children: ReactNode
}): JSX.Element

export { FetchProvider, RequestTypes, useRedaxios, useRedaxiosFnReturns, useRedaxiosOptions };
