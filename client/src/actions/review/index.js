import { PRODUCT_TYPES, LOADERS } from "../../constants";

const {
  REVIEW_FOUND_HELPFUL,
  GET_PRODUCT_REVIEWS,
  LOAD_NEW_PRODUCT_REVIEW,
  LOAD_PRODUCT_REVIEWS,
} = PRODUCT_TYPES;
const { REVIEW_LOADING } = LOADERS;

// Product Review
export const productReviewLoading = (boolean) => ({
  type: REVIEW_LOADING,
  boolean,
});

export const loadProductReview = () => ({ type: LOAD_PRODUCT_REVIEWS });

export const getProductReviews = (data) => ({
  type: GET_PRODUCT_REVIEWS,
  data,
});

export const reviewFoundHelpful = (reviewId) => ({
  type: REVIEW_FOUND_HELPFUL,
  reviewId,
});

export const loadNewProductReview = (review) => ({
  type: LOAD_NEW_PRODUCT_REVIEW,
  review,
});
