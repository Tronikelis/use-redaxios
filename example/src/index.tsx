import React from "react";
import ReactDOM from "react-dom";

import Test from "./test";
import { FetchProvider } from "use-redaxios";

ReactDOM.render(
    <FetchProvider
        options={{
            interceptors: {
                request: async request => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve(request);
                        }, 10_000);
                    });
                },
            },
            onSuccess: () => console.log("yes"),
            onError: () => console.log("error"),
        }}
    >
        <Test />
    </FetchProvider>,
    document.getElementById("root")
);
