import { takeLatest, select, call, put, delay } from "redux-saga/effects";

import { PRODUCT_TYPES } from "../../constants";

import {
  getProductDetailEndPoint,
  getProductsDetailsInCartEndPoint as getProductDetailStoredinarray,
} from "../../api";
import history from "../../history";
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

    if (data.detail.productFullDetails.length > 0) {
      const response = yield call(getProductDetailStoredinarray, {
        cartItems: data.detail.productFullDetails[0].productId,
      });

      data.detail.productFullDetails[0].productId = response.data.details;
    }

    yield put(getProductDetail(data.detail));

    yield history.push(`/${productType.productCategory}/detail`);
  } catch (err) {
    yield put(
      globalFailureMessenger("Server didn't respond please try again later!")
    );
    yield history.goBack();
    yield delay(3200);
    yield put(globalFailureMessenger(null));
  }
}

export function* loadProductViewWatcher() {
  yield takeLatest(LOAD_VIEW_PRODUCT_DETAIL, handleLoadProductViewWorker);
}
