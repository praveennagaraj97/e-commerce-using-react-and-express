import { compose, createStore, applyMiddleware } from "redux";
// import reduxLogger from "redux-logger";
import reduxThunk from "redux-thunk";
import createReduxSagaMiddleware from "redux-saga";

import reducers from "../reducers";
import rootSaga from "../sagas";

import { USER_AUTH_TYPES, WEBSITE_LOAD } from "../constants";

const {
  USER_STATUS: { LOAD_ACCREDITATION },
} = USER_AUTH_TYPES;

const sagaMiddleware = createReduxSagaMiddleware();

let composeEnhancer;
if (process.env.NODE_ENV === "development") {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancer = compose;
}

const middlewares = [sagaMiddleware, reduxThunk];

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

store.dispatch({ type: LOAD_ACCREDITATION });
store.dispatch({ type: WEBSITE_LOAD });

export default store;
