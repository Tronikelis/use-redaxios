import { useState } from "react";
import { useRedaxios } from "use-redaxios-hook";

export default function Test() {
    const [count, setCount] = useState(1);

    const { data, loading, error, get } = useRedaxios(
        "https://jsonplaceholder.typicode.com/posts/" + count,
        { onSuccess: () => console.log("yes 1") },
        [count]
    );

    return (
        <div>
            <button onClick={() => setCount(x => x + 1)}>inc</button>
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
