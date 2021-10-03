import LRU from "lru-cache";

export const cache = new LRU({
    max: 500,
    maxAge: 1000 * 60 * 60,
});
