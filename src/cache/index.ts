import LRU from "quick-lru";

export interface CacheKeyObject {
    url: string;
    relativeUrl: string;
    options: {
        defaults: any;
        options: any;
    };
    type: string;
}

export const cache = new LRU({
    maxSize: 500,
    maxAge: 1000 * 60 * 60,
});
