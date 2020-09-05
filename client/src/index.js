import "intersection-observer";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import store from "./store";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
