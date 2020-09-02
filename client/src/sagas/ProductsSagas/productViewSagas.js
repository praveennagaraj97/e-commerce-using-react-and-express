import { takeLatest, select, call, put, delay } from "redux-saga/effects";

import { PRODUCT_TYPES } from "../../constants";

import { getProductDetailEndPoint } from "../../api";
import { getProductDetail, globalFailureMessenger } from "../../actions";

const { LOAD_VIEW_PRODUCT_DETAIL } = PRODUCT_TYPES;

const getViewDetailsDataFromStore = ({ productDetail }) => productDetail;

function* handleLoadProductViewWorker() {
  const { productType } = yield select(getViewDetailsDataFromStore);

  try {
    const { data } = yield call(
      getProductDetailEndPoint,
      productType.productId
    );
    yield put(getProductDetail(data.detail));
  } catch (err) {
    yield put(
      globalFailureMessenger("Server didn't respond please try again later!")
    );
    yield delay(3200);
    yield put(globalFailureMessenger(null));
  }
}

export function* loadProductViewWatcher() {
  yield takeLatest(LOAD_VIEW_PRODUCT_DETAIL, handleLoadProductViewWorker);
}
