import React from "react";
import ReactDOM from "react-dom";

import Test from "./test";
import { RedaxiosProvider } from "use-redaxios";

ReactDOM.render(
    <RedaxiosProvider
        options={{
            
            onSuccess: () => console.log("yes"),
            onError: () => console.log("error"),
        }}
    >
        <Test />
    </RedaxiosProvider>,
    document.getElementById("root")
);
