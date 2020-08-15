import { fork } from "redux-saga/effects";
import { userAuthLoginWatcher } from "./userAuthSaga";

function* rootSaga() {
  yield fork(userAuthLoginWatcher);
}

export default rootSaga;
