import stringify from "fast-json-stable-stringify";

export const isEqual = (a: any, b: any) => (
    stringify(a) === stringify(b)
);