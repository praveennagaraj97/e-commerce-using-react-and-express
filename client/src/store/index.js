import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import createReduxSagaMiddleware from "redux-saga";

import reducers from "../reducers";
import rootSaga from "../sagas";
import { USER_AUTH_TYPES, WEBSITE_LOAD } from "../constants";

import createEncryptor from "redux-persist-transform-encrypt";

const {
  USER_STATUS: { LOAD_ACCREDITATION },
} = USER_AUTH_TYPES;

const encryptor = createEncryptor({
  secretKey: "react-and-redux-is-fun",
  onError: function (error) {},
});

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["userAuthorization"],

  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createReduxSagaMiddleware();

let composeEnhancer;
if (process.env.NODE_ENV === "development") {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancer = compose;
}

const middlewares = [sagaMiddleware];

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

store.dispatch({ type: LOAD_ACCREDITATION });
store.dispatch({ type: WEBSITE_LOAD });

export default store;
