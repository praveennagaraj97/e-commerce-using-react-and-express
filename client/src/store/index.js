import { compose, createStore, applyMiddleware } from "redux";
// import reduxLogger from "redux-logger";
import createReduxSagaMiddleware from "redux-saga";

import reducers from "../reducers";
import rootSaga from "../sagas";

const sagaMiddleware = createReduxSagaMiddleware();

const composeEnhancher = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [sagaMiddleware];

const store = createStore(
  reducers,
  composeEnhancher(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
