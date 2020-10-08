import { applyMiddleware, compose, createStore } from "redux";
import createreduxSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducers from "../reducers";
import rootSaga from "../sagas";

const sagaMiddleware = createreduxSagaMiddleware();
const middlewares = [sagaMiddleware];

const reduxPersistConfig = {
  key: "lexa-store",
  storage,
  blacklist: [
    "form",
    "notify",
    "loaders",
    // "user"
  ],
};

const persistedReducer = persistReducer(reduxPersistConfig, reducers);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export default store;
