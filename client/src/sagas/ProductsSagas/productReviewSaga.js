import { call, put, select, takeLatest } from "redux-saga/effects";

import { getProductReviews } from "../../actions";
import { PRODUCT_TYPES } from "../../constants";

import { getListOfProductReviewsEndPoint } from "../../api";

const { LOAD_PRODUCT_REVIEWS } = PRODUCT_TYPES;

const getProductIdFromStore = ({ productDetail }) => productDetail;
const getCurrentReviewFromStore = ({ productReview }) => productReview;

function* handleGetProductReviewWorker() {
  const {
    productType: { productId },
  } = yield select(getProductIdFromStore);

  //   Check if the product review already exist for current product!!
  const { productReviewsList } = yield select(getCurrentReviewFromStore);
  if (productReviewsList) {
    if (productReviewsList.reviewForProduct === productId) return;
  }
  try {
    const { data } = yield call(getListOfProductReviewsEndPoint, productId);
    data.reviewForProduct = productId;
    yield put(getProductReviews(data));
  } catch (err) {
    yield put(getProductReviews(null));
  }
}

export function* loadProductReviewWatcher() {
  yield takeLatest(LOAD_PRODUCT_REVIEWS, handleGetProductReviewWorker);
}
