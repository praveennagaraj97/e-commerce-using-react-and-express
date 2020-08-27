import { takeLatest, select, call, put } from "redux-saga/effects";

import { PRODUCT_TYPES } from "../constants";
import { getProductsBasedOnQuery } from "../api";

import {
  getProductsOnQuery,
  globalFailureMessenger,
  holdPreviousProductQuery,
} from "../actions";

const { LOAD_GET_PRODUCTS_BASED_ON_QUERY } = PRODUCT_TYPES;

const getQueryRequestedFromStore = ({ productsList }) => productsList;

function* handleLoadProductWorker() {
  const { query } = yield select(getQueryRequestedFromStore);

  if (query.prev !== query.current) {
    try {
      yield put(holdPreviousProductQuery(query.current));
      const { data } = yield call(getProductsBasedOnQuery, query.current);
      if (data.message === "No Document Found")
        return yield put(getProductsOnQuery([]));
      yield put(getProductsOnQuery(data.details));
    } catch (err) {
      try {
        yield put(globalFailureMessenger(err.response.data.message));
      } catch (err) {
        yield put(
          globalFailureMessenger("Something went wrong Please try again later!")
        );
      }
    }
  }
}

export function* loadProductsWatcher() {
  yield takeLatest(LOAD_GET_PRODUCTS_BASED_ON_QUERY, handleLoadProductWorker);
}
