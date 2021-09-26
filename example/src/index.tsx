import React from "react";
import ReactDOM from "react-dom";

import Test from "./test";
import { RedaxiosProvider } from "use-redaxios";

ReactDOM.render(
    <RedaxiosProvider
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
    </RedaxiosProvider>,
    document.getElementById("root")
);
