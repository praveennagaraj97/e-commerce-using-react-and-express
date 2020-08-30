import { takeLatest, call, put } from "redux-saga/effects";

import { WEBSITE_LOAD } from "../constants";
import { getAllCategoriesEndpoint } from "../api";

import { getAllCategories, globalFailureMessenger } from "../actions";

function* handleWebsiteLoadWorker() {
  try {
    const { data } = yield call(getAllCategoriesEndpoint);
    yield put(getAllCategories(data.details));
  } catch (err) {
    yield put(
      globalFailureMessenger("Something went Wrong Please try Again Later")
    );
  }
}

export function* websiteLoadWatcher() {
  yield takeLatest(WEBSITE_LOAD, handleWebsiteLoadWorker);
}
