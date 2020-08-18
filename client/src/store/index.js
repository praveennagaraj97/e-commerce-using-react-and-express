import { compose, createStore, applyMiddleware } from "redux";
// import reduxLogger from "redux-logger";
import createReduxSagaMiddleware from "redux-saga";

import reducers from "../reducers";
import rootSaga from "../sagas";

import { USER_AUTH_TYPES } from "../constants";

const {
  AUTH: { LOAD_ACCREDIT },
} = USER_AUTH_TYPES;

const sagaMiddleware = createReduxSagaMiddleware();

let composeEnhancer;
if (process.env.NODE_ENV === "development") {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancer = compose;
}

const middlewares = [sagaMiddleware];

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

store.dispatch({ type: LOAD_ACCREDIT });

export default store;
