import { compose, createStore, applyMiddleware } from "redux";
// import reduxLogger from "redux-logger";

import reducers from "./reducers";

const composeEnhancher = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [];

const store = createStore(
  reducers,
  composeEnhancher(applyMiddleware(...middlewares))
);

export default store;
