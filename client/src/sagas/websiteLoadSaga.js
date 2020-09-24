import { takeLatest } from "redux-saga/effects";

import { WEBSITE_LOAD } from "../constants";

function* handleWebsiteLoadWorker() {
  // yield call(handleProductsCategoryWorker);
  yield;
}

export function* websiteLoadWatcher() {
  yield takeLatest(WEBSITE_LOAD, handleWebsiteLoadWorker);
}
