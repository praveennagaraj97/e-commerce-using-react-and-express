import { PRODUCT_TYPES, LOADERS } from "../../constants";

const { GET_PRODUCT_REVIEWS } = PRODUCT_TYPES;
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

    default:
      return { ...state };
  }
};
