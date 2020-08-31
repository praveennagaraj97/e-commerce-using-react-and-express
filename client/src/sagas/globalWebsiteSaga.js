import { takeLatest, call, put, delay } from "redux-saga/effects";

import { WEBSITE_LOAD } from "../constants";
import { getAllCategoriesEndpoint } from "../api";

import { getAllCategories, globalFailureMessenger } from "../actions";

function* handleWebsiteLoadWorker() {
  try {
    const { data } = yield call(getAllCategoriesEndpoint);
    yield put(getAllCategories(data.details));
  } catch (err) {
    yield put(
      globalFailureMessenger(
        "Something went Wrong Server didn't respond!! Trying again"
      )
    );
    yield delay(5000);
    yield put(globalFailureMessenger(null));
    yield put({ type: WEBSITE_LOAD });
  }
}

export function* websiteLoadWatcher() {
  yield takeLatest(WEBSITE_LOAD, handleWebsiteLoadWorker);
}
