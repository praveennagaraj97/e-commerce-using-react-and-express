import { PRODUCT_TYPES } from "../constants";

const {
  ADDED_NEW_PRODUCT_MODEL,
  ADDED_NEW_PRODUCT_DETAIL,
  ADDED_NEW_PRODUCT_IMG_AND_DESC,
  FINISH_NEW_PRODUCT_ADD,
} = PRODUCT_TYPES;

export default (state = {}, action) => {
  switch (action.type) {
    case ADDED_NEW_PRODUCT_MODEL:
      return { ...state, addedModel: action.data };

    case ADDED_NEW_PRODUCT_DETAIL:
      return { ...state, addedDetail: action.data };

    case ADDED_NEW_PRODUCT_IMG_AND_DESC:
      return { ...state, addedImgAndDesc: action.data };

    case FINISH_NEW_PRODUCT_ADD:
      state = {};
      return { ...state };

    default:
      return state;
  }
};
