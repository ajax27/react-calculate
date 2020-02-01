import "./runConcent";
import React from "react";
import ReactDOM from "react-dom";
import { clearContextIfHot } from "concent";

import App from "./App";

clearContextIfHot();
ReactDOM.render(<App />, document.getElementById("root"));
