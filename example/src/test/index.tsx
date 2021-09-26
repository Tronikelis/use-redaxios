import { useState } from "react";
import { useRedaxios } from "use-redaxios-hook";

export default function Test() {
    const [count, setCount] = useState(1);

    const { data, loading, error, get } = useRedaxios<object>(
        "https://jsonplaceholder.typicode.com/posts/",
        { onSuccess: () => console.log("success") },
    );

    // will only request when this callback has been called
    const fire = () => {
        get("relative path")
    }

    return (
        <div>
            <button onClick={() => {
                setCount(x => x + 1);
                get(count.toString());
            }}>inc</button>
            <br />
            <button onClick={() => get("e")}>get</button>
            <br />
            data: {JSON.stringify(data)}
            <br />
            loading: {JSON.stringify(loading)}
            <br />
            err: {JSON.stringify(error)}
        </div>
    );
}
