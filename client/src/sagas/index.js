import { fork, all } from "redux-saga/effects";

import {
  userLoginWatcher,
  userSignUpWatcher,
  userAccreditationWatcher,
  userLogoutWatcher,
} from "./userAuthSagas";

import { websiteLoadWatcher } from "./globalWebsiteSaga";

import {
  loadProductsWatcher,
  loadMoreResultsWatcher,
  productCartWatcher,
  productCartLoadWatcher,
  loadProductViewWatcher,
} from "./ProductsSagas";

function* rootSaga() {
  yield all([
    yield fork(websiteLoadWatcher),
    yield fork(userLoginWatcher),
    yield fork(userSignUpWatcher),
    yield fork(userAccreditationWatcher),
    yield fork(userLogoutWatcher),
    yield fork(loadProductsWatcher),
    yield fork(loadMoreResultsWatcher),
    yield fork(productCartWatcher),
    yield fork(productCartLoadWatcher),
    yield fork(loadProductViewWatcher),
  ]);
}

export default rootSaga;
