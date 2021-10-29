import { useRedaxios } from "use-redaxios";

export function Test1() {
    const { data, loading, error, get, fetching } = useRedaxios(
        "https://jsonplaceholder.typicode.com/posts/1"
    );

    return (
        <>
            <h1>Another redaxios</h1>
            <button onClick={() => get()}>get</button>
            <div>data: {JSON.stringify(data)}</div>
            <div>loading: {JSON.stringify(loading)}</div>
            <div>fetching: {JSON.stringify(fetching)}</div>
            <div>error: {JSON.stringify(error)}</div>
        </>
    );
}
