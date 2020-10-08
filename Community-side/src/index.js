import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { QueryCache, ReactQueryCacheProvider } from "react-query";

import store from "./store";
import App from "./components/App";

const queryCache = new QueryCache();

render(
  <ReactQueryCacheProvider queryCache={queryCache}>
    <Provider store={store}>
      <App />
    </Provider>
  </ReactQueryCacheProvider>,
  document.getElementById("root")
);
