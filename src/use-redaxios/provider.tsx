import { createContext, ReactNode } from "react";
import axios from "redaxios";
import { useRedaxiosOptions } from "../typings";

const defaults = {
    axios: axios.defaults,
} as useRedaxiosOptions<unknown>;

export const RedaxiosContext = createContext({
    options: defaults,
});

export function RedaxiosProvider({
    options,
    children,
}: {
    options: useRedaxiosOptions<unknown>;
    children: ReactNode;
}) {
    return <RedaxiosContext.Provider value={{ options }}>{children}</RedaxiosContext.Provider>;
}
