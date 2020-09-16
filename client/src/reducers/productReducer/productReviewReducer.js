import { PRODUCT_TYPES } from "../../constants";

const { GET_PRODUCT_REVIEWS } = PRODUCT_TYPES;

export const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEWS:
      return { ...state, productReviewsList: action.data };

    default:
      return { ...state };
  }
};
