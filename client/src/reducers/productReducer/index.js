import { PRODUCT_TYPES } from "../../constants";

const { GET_ALL_CATEGORIES } = PRODUCT_TYPES;

const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return { ...state, categories: action.response };
    default:
      return state;
  }
};

export default categoriesReducer;
