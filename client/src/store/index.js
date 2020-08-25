import { createStore, compose, applyMiddleware } from "redux";

import reducers from "../reducers";

const composeEnchaner = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [];

const store = createStore(
  reducers,
  composeEnchaner(applyMiddleware(...middlewares))
);

export default store;
