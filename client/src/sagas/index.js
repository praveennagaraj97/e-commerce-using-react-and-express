import { fork } from "redux-saga/effects";
import {
  userAuthLoginWatcher,
  userSignUpWatcher,
  userAccreditWatcher,
} from "./userAuthSaga";

function* rootSaga() {
  yield fork(userAuthLoginWatcher);
  yield fork(userSignUpWatcher);
  yield fork(userAccreditWatcher);
}

export default rootSaga;
