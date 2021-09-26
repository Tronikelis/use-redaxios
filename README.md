<p align="center">
    <h1 align="center">useRedaxios</h1>
</p>

<div align="center">
  <sup>
    🚢 React hook for making http requests     
  </sup>
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

## Simple usage with dependencies

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

```tsx
import { useRedaxios } from "use-redaxios";

const [count, setCount] = useState(1);

const { data, loading, error, get } = useRedaxios<object>(
    "https://jsonplaceholder.typicode.com/posts/",
    { onSuccess: () => console.log("success") }
);

// will only request when this callback has been called
const fire = () => {
    get("relative path");
};

return <div>data: {JSON.stringify(data)}</div>;
```

<br />

# Advanced usage examples

## POST'ing body with dependencies

-   Same as GET, but just with a body (sometimes useful)

```tsx
import { useRedaxios } from "use-redaxios";

// changing data
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

soon
