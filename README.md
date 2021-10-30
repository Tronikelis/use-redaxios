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

<p align="center">
    <img src="https://img.shields.io/npm/l/use-redaxios?style=flat-square" />
    <img src="https://img.shields.io/npm/dm/use-redaxios?style=flat-square">
    <img src="https://img.shields.io/npm/v/use-redaxios?style=flat-square">
    <img src="https://img.shields.io/bundlephobia/min/use-redaxios?style=flat-square">
    <img src="https://img.shields.io/snyk/vulnerabilities/npm/use-redaxios?style=flat-square">
    <img src="https://img.shields.io/github/stars/Trunkelis/use-redaxios?style=flat-square">
</p>
<br/>

# Features

-   Simple caching 📝
-   9kb size 🗜️
-   Request interceptors 🔑
-   Typescript support

<br />

# Table of contents

- [Features](#features)
- [Table of contents](#table-of-contents)
- [Simple usage](#simple-usage)
  - [Simple usage with dependencies](#simple-usage-with-dependencies)
  - [Simple usage without dependencies](#simple-usage-without-dependencies)
- [Advanced usage examples](#advanced-usage-examples)
  - [POST'ing body with dependencies](#posting-body-with-dependencies)
- [Default options with provider](#default-options-with-provider)
- [How caching works](#how-caching-works)
- [Documentation](#documentation)
  - [Return objects](#return-objects)
  - [Passing options](#passing-options)
    - [Request interceptor example](#request-interceptor-example)
    - [Response interceptor example](#response-interceptor-example)

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

# Default options with provider

You can set the the default [options](#passing-options) with a context provider:

```tsx
import { RedaxiosProvider } from "use-redaxios";

ReactDOM.render(
    <RedaxiosProvider
        options={{
            interceptors: {
                // useful for authorization keys
                request: async request => {
                    return await { ...request };
                },
            },
            axios: {},
            onSuccess: () => console.log("yes"),
            onError: () => console.log("error"),
        }}
    >
        <Test />
    </RedaxiosProvider>,
    document.getElementById("root")
);
```

Note: these default options will be overwritten using a deep merge when you pass the options into the hook

# How caching works

Here is the gist of it 😎:

-   A new request has been initiated
-   A new key will be generated based on:
    -   The request's type
    -   The request's body
    -   The request's complete url
    -   The useRedaxios dependencies
    -   The useRedaxios options
-   Then the cache will be checked for this key
-   This key exists:
    -   Set loading to false, but don't cancel the request
    -   Check if the data from the request is deeply equal to the cache
    -   It is equal:
        -   No action
    -   It is not equal:
        -   Set the updated cache on this key
-   This key doesn't exist:
    -   Continue the request normally, at the end set the cache

<br />

# Documentation

<br />

## Return objects

```tsx
const { data, loading, fetching, error, get, del, patch, post, put } =
    useRedaxios<object>("url");
```

| Object     | Type                                                                   | Returns                                                                                                                                                                |
| ---------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`     | `unknown` or a generic type that is passed into the `useRedaxios` hook | Returns the response body                                                                                                                                              |
| `loading`  | `boolean`                                                              | Returns a boolean which will be true if the _cache is empty, request is currently pending_                                                                             |
| `fetching` | `boolean`                                                              | Returns a boolean which will be true if the _request is currently pending, cache doesn't matter_                                                                       |
| `error`    | `Response`                                                             | Returns the whole failed response                                                                                                                                      |
| `get`      | `BodylessMethod`                                                       | Returns a function that will manually GET request the supplied url, you can pass another url to it that will get added on top of the supplied one                      |
| `del`      | `BodylessMethod`                                                       | Returns a function that will manually DELETE request the supplied url, you can pass another url to it that will get added on top of the supplied one                   |
| `patch`    | `BodyMethod`                                                           | Returns a function that will manually PATCH request the supplied url, you can pass a request body and another url to it that will get added on top of the supplied one |
| `post`     | `BodyMethod`                                                           | Returns a function that will manually POST request the supplied url, you can pass a request body and another url to it that will get added on top of the supplied one  |
| `put`      | `BodyMethod`                                                           | Returns a function that will manually PUT request the supplied url, you can pass a request body and another url to it that will get added on top of the supplied one   |

<br />

## Passing options

Option interface currently looks like this

```ts
export interface useRedaxiosOptions<Body> {
    interceptors?: {
        request?: (request: Options) => Promise<Options>;
        response?: (body: Body) => Promise<any>;
    };
    onSuccess?: (res: Body) => void;
    onError?: (error: Response<any>) => void;
    axios?: Options;
}
```

| Option                 | More info                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `interceptors.request` | Pass an `async` function that will be called before every request, it must return the modified options |

### Request interceptor example

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

| Option                 | More info                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `interceptor.response` | Pass an `async` function that will be called every time the request _succeeds_, it must return the modified response body |

### Response interceptor example

```ts
interceptors: {
    response: async data => {
        console.log(data);
        return {
            ...data,
            foo: await bar
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
