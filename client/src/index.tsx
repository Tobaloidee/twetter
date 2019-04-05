// Imports
import "bulma/css/bulma.min.css";
import React from "react";
import ReactDOM from "react-dom";

// Components
import App from "./App";

// PWA
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
