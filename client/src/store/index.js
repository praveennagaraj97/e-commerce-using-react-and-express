import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reduxThunk from "redux-thunk";

import reducers from "../reducers";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const composeEnchaner = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [sagaMiddleware, reduxThunk];

const store = createStore(
  reducers,
  composeEnchaner(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
