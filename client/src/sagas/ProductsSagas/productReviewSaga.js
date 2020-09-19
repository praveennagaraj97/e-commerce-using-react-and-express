import { call, put, select, takeLatest } from "redux-saga/effects";

import { getProductReviews, productReviewLoading } from "../../actions";
import { PRODUCT_TYPES } from "../../constants";

import { getListOfProductReviewsEndPoint } from "../../api";

const { LOAD_PRODUCT_REVIEWS } = PRODUCT_TYPES;

const getProductIdFromStore = ({ productDetail }) => productDetail;
const getCurrentReviewFromStore = ({ productReview }) => productReview;

function* handleGetProductReviewWorker() {
  const {
    productType: { productId },
  } = yield select(getProductIdFromStore);

  // Check if the product review already exist for current product!!
  const { reviewForProduct } = yield select(getCurrentReviewFromStore);

  if (reviewForProduct) {
    if (reviewForProduct === productId) return;
  }

  try {
    yield put(productReviewLoading(true));
    const { data } = yield call(getListOfProductReviewsEndPoint, productId);
    data.reviewForProduct = productId;
    yield put(productReviewLoading(false));
    yield put(getProductReviews(data));
  } catch (err) {
    let data = {};
    yield put(productReviewLoading(false));
    data.reviewForProduct = productId;
    yield put(getProductReviews(data));
    // Clear API FETCH LOG
    yield console.clear();
  }
}

export function* loadProductReviewWatcher() {
  yield takeLatest(LOAD_PRODUCT_REVIEWS, handleGetProductReviewWorker);
}
