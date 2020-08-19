import { fork, all } from "redux-saga/effects";

import {
  userLoginWatcher,
  userSignUpWatcher,
  userAccreditationWatcher,
  userLogoutWatcher,
} from "./userAuthSagas";

function* rootSaga() {
  all([
    yield fork(userLoginWatcher),
    yield fork(userSignUpWatcher),
    yield fork(userAccreditationWatcher),
    yield fork(userLogoutWatcher),
  ]);
}

export default rootSaga;
