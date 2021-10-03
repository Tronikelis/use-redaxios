import LRU from "quick-lru";
import stringify from "fast-json-stable-stringify";

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const cyrb53 = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

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
    return cyrb53(stringify({ ...args }));
};

export const cache = new LRU({
    maxSize: 500,
    maxAge: 1000 * 60 * 60,
});
