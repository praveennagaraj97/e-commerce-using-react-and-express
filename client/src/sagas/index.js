import { fork, all } from "redux-saga/effects";

import {
  userLoginWatcher,
  userSignUpWatcher,
  userAccreditationWatcher,
  userLogoutWatcher,
} from "./userAuthSagas";

import { websiteLoadWatcher } from "./globalWebsiteSaga";

import { loadProductsWatcher } from "./productsSaga";

function* rootSaga() {
  all([
    yield fork(websiteLoadWatcher),
    yield fork(userLoginWatcher),
    yield fork(userSignUpWatcher),
    yield fork(userAccreditationWatcher),
    yield fork(userLogoutWatcher),
    yield fork(loadProductsWatcher),
  ]);
}

export default rootSaga;
