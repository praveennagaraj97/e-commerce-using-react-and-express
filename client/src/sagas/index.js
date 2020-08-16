import { fork } from "redux-saga/effects";
import { userAuthLoginWatcher, userSignUpWatcher } from "./userAuthSaga";

function* rootSaga() {
  yield fork(userAuthLoginWatcher);
  yield fork(userSignUpWatcher);
}

export default rootSaga;
