import LRU from "quick-lru";
import stringify from "fast-json-stable-stringify";

export const genKey = ({
    ...args
}: {
    url: string;
    relativeUrl: string;
    type: string;
    options: any;
    body?: any;
    deps?: any[];
}) => {
    return stringify({ ...args });
};

export const cache = new LRU({
    maxSize: 500,
    maxAge: 1000 * 60 * 60,
});
