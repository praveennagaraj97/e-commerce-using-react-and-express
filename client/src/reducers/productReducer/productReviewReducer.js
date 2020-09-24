import { PRODUCT_TYPES, LOADERS } from "../../constants";

const {
  GET_PRODUCT_REVIEWS,
  REVIEW_FOUND_HELPFUL,
  LOAD_NEW_PRODUCT_REVIEW,
} = PRODUCT_TYPES;
const { REVIEW_LOADING } = LOADERS;

export const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_LOADING:
      return { ...state, reviewLoading: action.boolean };
    case GET_PRODUCT_REVIEWS:
      return {
        ...state,
        productReviewsList: action.data ? action.data.details : null,
        reviewForProduct: action.data.reviewForProduct,
      };
    case REVIEW_FOUND_HELPFUL:
      return { ...state, reviewHelpfulId: action.reviewId };

    default:
      return state;
  }
};

export const addNewProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_NEW_PRODUCT_REVIEW:
      return { ...state, addedReview: action.review };
    default:
      return state;
  }
};
