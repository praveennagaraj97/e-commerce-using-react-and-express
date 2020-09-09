import { fork, all } from "redux-saga/effects";

import {
  userLoginWatcher,
  userSignUpWatcher,
  userAccreditationWatcher,
  userLogoutWatcher,
  userForgotPasswordWatcher,
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
    // website init watch
    yield fork(websiteLoadWatcher),

    // User watch
    yield fork(userLoginWatcher),
    yield fork(userSignUpWatcher),
    yield fork(userAccreditationWatcher),
    yield fork(userForgotPasswordWatcher),
    yield fork(userLogoutWatcher),

    // Product watch
    yield fork(loadProductsWatcher),
    yield fork(loadMoreResultsWatcher),
    yield fork(productCartWatcher),
    yield fork(productCartLoadWatcher),
    yield fork(loadProductViewWatcher),
  ]);
}

export default rootSaga;
