<h1 align="center">useRedaxios</h1>

<div align="center">
  <h3>
    🚢 Yet another react hook for making http requests     
  </h3>
</div>

<br />
    
<div align="center">
  <pre>npm i use-redaxios</pre>
</div>

<br/>

## Features

-   Typescript support
-   8kb size
-   request interceptors
-   Caching, soon

<br />

## Table of contents

- [Simple usage](#simple-usage)
  - [Simple usage with dependencies](#simple-usage-with-dependencies)
  - [Simple usage without dependencies](#simple-usage-without-dependencies)
- [Advanced usage examples](#advanced-usage-examples)
  - [POST'ing body with dependencies](#posting-body-with-dependencies)
- [Documentation](#documentation)
  - [Return objects](#return-objects)
  - [Passing options](#passing-options)
    - [Interceptor example](#interceptor-example)

<br />

# Simple usage

<br />

## Simple usage with dependencies

It's like useEffect with its dependencies, will request the relative url when the passed objects change. The equality is deep

```tsx
import { useRedaxios } from "use-redaxios";

const [count, setCount] = useState(1);

const { data, loading, error } = useRedaxios<object>(
    "https://jsonplaceholder.typicode.com/posts/" + count,
    {
        onSuccess: data => {
            // Do something
        },
        onError: response => {
            // Handle error
        },
    },
    // fire on dependency changes
    [count]
);

return <div>data: {JSON.stringify(data)}</div>;
```

## Simple usage without dependencies

With this example you'll have to manually fire the requests

```tsx
import { useRedaxios } from "use-redaxios";

const [count, setCount] = useState(1);

const { data, loading, error, get } = useRedaxios<object>(
    "https://jsonplaceholder.typicode.com/posts/",
    { onSuccess: () => console.log("success") }
);

// will only request when this callback has been called
const fire = () => {
    // this will change the data var as well
    const res = get("relative path");
};

return <div>data: {JSON.stringify(data)}</div>;
```

<br />

# Advanced usage examples

<br />

## POST'ing body with dependencies

Same as [GET](#simple-usage-with-dependencies), but just with a body (sometimes useful)

```tsx
import { useRedaxios } from "use-redaxios";

// changing data, use useState(obj) here
const body = {
    foo: "bar",
};

const {
    data = {},
    loading,
    error,
    get,
} = useRedaxios<object>(
    "https://jsonplaceholder.typicode.com/posts/" + count,
    {
        onSuccess: () => console.log("success"),
        axios: {
            method: "post",
            data: body,
        },
    },
    [count]
);
```

<br />

# Documentation

<br />

## Return objects

```tsx
const { data, loading, error, get, del, patch, post, put } = useRedaxios<object>("url");
```

| Object    | Type                                                                   | Returns                                                                                                                                                                |
| --------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`    | `unknown` or a generic type that is passed into the `useRedaxios` hook | Returns the response body                                                                                                                                              |
| `loading` | `boolean`                                                              | Returns a boolean which will be true if the request is currently pending, and vice versa                                                                               |
| `error`   | `Response`                                                             | Returns the whole failed response                                                                                                                                      |
| `get`     | `BodylessMethod`                                                       | Returns a function that will manually GET request the supplied url, you can pass another url to it that will get added on top of the supplied one                      |
| `del`     | `BodylessMethod`                                                       | Returns a function that will manually DELETE request the supplied url, you can pass another url to it that will get added on top of the supplied one                   |
| `patch`   | `BodyMethod`                                                           | Returns a function that will manually PATCH request the supplied url, you can pass a request body and another url to it that will get added on top of the supplied one |
| `post`    | `BodyMethod`                                                           | Returns a function that will manually POST request the supplied url, you can pass a request body and another url to it that will get added on top of the supplied one  |
| `put`     | `BodyMethod`                                                           | Returns a function that will manually PUT request the supplied url, you can pass a request body and another url to it that will get added on top of the supplied one   |

<br />

## Passing options

Option interface currently looks like this

```ts
interface useRedaxiosOptions<Body> {
    interceptors?: {
        request?: (request: Options) => Promise<Options>;
    };
    onSuccess?: (res: Body) => void;
    onError?: (error: Response<any>) => void;
    axios?: Options;
}
```

| Option                 | More info                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `interceptors.request` | Pass an `async` function that will be called before every request, it must return the modified options |

### Interceptor example

```ts
interceptors: {
    request: async request => {
        return {
            ...request,
            headers: {
                ...request.headers,
                Authorization: await "Some key",
            },
        };
    },
},
```

<br />

| Option      | More                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| `onSuccess` | This function (callback) will be called with the response's body when the response has been successful |
| `onError`   | This function (callback) will be called with the whole response when the response has failed           |
| `axios`     | Pass in additional request options, api is very similar to the native fetch options                    |
