import { useState } from "react";
import { useRedaxios } from "use-redaxios";

import { Test1 } from "./diff";

export default function Test() {
    const [count, setCount] = useState({ count: 1 });

    const {
        data = {},
        loading,
        error,
        get,
    } = useRedaxios<object>(
        "https://jsonplaceholder.typicode.com/posts/" + count.count,
        {
            onSuccess: () => console.log("success"),
        },
        [count]
    );

    return (
        <>
            <div>
                <button
                    onClick={() => {
                        setCount(x => ({ count: x.count + 1 }));
                    }}
                >
                    inc
                </button>
                <br />
                <button onClick={() => get()}>get</button>
                <br />
                data: {JSON.stringify(data)}
                <br />
                loading: {JSON.stringify(loading)}
                <br />
                err: {JSON.stringify(error)}
            </div>

            <div>
                <Test1 />
            </div>
        </>
    );
}
