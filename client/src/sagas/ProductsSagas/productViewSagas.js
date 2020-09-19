/**
 * Product Detail Saga.
 * @summary - take Product Id to get the Product details from api!
 * @description - This saga will fetch product details along with similar products from api only once!
 *                If the user/client requests for same product detail, the detail will not be fetched from API.
 *                Instead the details will be fetched from store !!!
 *                To avoid performance-lag once the store requests reaches 30 requests the last item will and re-pushed!!!
 */

import { takeLatest, select, call, put, delay } from "redux-saga/effects";

import { PRODUCT_TYPES } from "../../constants";

// history is used here as withRouter is not supported outside JSX component!
import history from "../../history";

// API Endpoints!
import {
  getProductDetailEndPoint,
  getProductsDetailsForGrpIdsEndPoint,
} from "../../api";

// Actions are dispatched using saga put!
import {
  getProductDetail,
  globalFailureMessenger,
  reOccuringProductDetailRequests,
} from "../../actions";

const { LOAD_VIEW_PRODUCT_DETAIL } = PRODUCT_TYPES;

// To get the Product Detail
// When view action is dispatched the action takes product type which containes category and product Id.
const getViewDetailsDataFromStore = ({ productDetail }) => productDetail;

// To get Stores Product Details Requests
const getStoredRequestsFromStore = ({ requests }) => ({ requests });

// Saga-Worker
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
      const response = yield call(getProductsDetailsForGrpIdsEndPoint, {
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
    yield console.clear();
    yield put(
      globalFailureMessenger("Server didn't respond please try again later!")
    );
    yield history.goBack();
    yield delay(3200);
    yield put(globalFailureMessenger(null));
  }
}

// Saga-Watcher
export function* loadProductViewWatcher() {
  yield takeLatest(LOAD_VIEW_PRODUCT_DETAIL, handleLoadProductViewWorker);
}
