import { takeLatest } from "redux-saga/effects";

import { PRODUCT_TYPES } from "../../constants";

const { LOAD_VIEW_PRODUCT_DETAIL } = PRODUCT_TYPES;

function* handleLoadProductViewWorker() {
  yield console.log("ok");
}

export function* loadProductViewWatcher() {
  yield takeLatest(LOAD_VIEW_PRODUCT_DETAIL, handleLoadProductViewWorker);
}
