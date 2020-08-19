import { fork, all } from "redux-saga/effects";

import { userLoginWatcher, userSignUpWatcher } from "./userAuthSagas";

function* rootSaga() {
  all([yield fork(userLoginWatcher), yield fork(userSignUpWatcher)]);
}

export default rootSaga;
