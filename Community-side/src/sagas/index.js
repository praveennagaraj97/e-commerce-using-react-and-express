import { fork, all } from "redux-saga/effects";

import { loginWatcher } from "./userAuthSaga";

function* rootSaga() {
  yield all([yield fork(loginWatcher)]);
}

export default rootSaga;
