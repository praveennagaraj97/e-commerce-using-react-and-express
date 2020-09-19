import { call, put, delay } from "redux-saga/effects";

import { WEBSITE_LOAD } from "../../constants";
import { getAllCategoriesEndpoint } from "../../api";

import {
  productCategoryLoading,
  getAllCategories,
  globalFailureMessenger,
} from "../../actions";

export function* handleProductsCategoryWorker() {
  try {
    yield put(productCategoryLoading(true));
    const { data } = yield call(getAllCategoriesEndpoint);
    yield put(productCategoryLoading(false));
    yield put(getAllCategories(data.details));
  } catch (err) {
    yield put(productCategoryLoading(false));
    yield console.clear();
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
