import React, { createContext, ReactNode } from "react";
import axios from "redaxios";
import { useRedaxiosOptions } from "./typings";

const defaults = {
    axios: axios.defaults,
} as useRedaxiosOptions<unknown>;

export const FetchContext = createContext({
    options: defaults,
});

export function FetchProvider({
    options,
    children,
}: {
    options: useRedaxiosOptions<unknown>;
    children: ReactNode;
}) {
    return <FetchContext.Provider value={{ options }}>{children}</FetchContext.Provider>;
}
