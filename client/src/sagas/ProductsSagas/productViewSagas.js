import { takeLatest, select, call, put, delay } from "redux-saga/effects";

import { PRODUCT_TYPES } from "../../constants";

import {
  getProductDetailEndPoint,
  getProductsDetailsInCartEndPoint as getProductDetailStoredinarray,
} from "../../api";
import history from "../../history";
import {
  getProductDetail,
  globalFailureMessenger,
  reOccuringProductDetailRequests,
} from "../../actions";

const { LOAD_VIEW_PRODUCT_DETAIL } = PRODUCT_TYPES;

const getViewDetailsDataFromStore = ({ productDetail }) => productDetail;

const getStoredRequestsFromStore = ({ requests }) => ({ requests });

function* handleLoadProductViewWorker() {
  const { productType } = yield select(getViewDetailsDataFromStore);

  const {
    requests: { productDetailRequests },
  } = yield select(getStoredRequestsFromStore);
  if (productDetailRequests) {
    if (Object.keys(productDetailRequests).includes(productType.productId)) {
      yield put(
        getProductDetail(productDetailRequests[productType.productId].detail)
      );
      yield history.push(`/${productType.productCategory}/detail`);
      return;
    }
  }

  try {
    const { data } = yield call(
      getProductDetailEndPoint,
      productType.productId
    );

    // Similar Items
    if (data.detail.productFullDetails.length > 0) {
      const response = yield call(getProductDetailStoredinarray, {
        cartItems: data.detail.productFullDetails[0].productId,
      });

      data.detail.productFullDetails[0].productId = response.data.details;
    }

    yield put(
      reOccuringProductDetailRequests({
        id: [productType.productId],
        data: data,
      })
    );

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
