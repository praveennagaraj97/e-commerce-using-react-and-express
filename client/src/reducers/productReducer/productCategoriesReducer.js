import { PRODUCT_TYPES, LOADERS } from "../../constants";

const { GET_ALL_CATEGORIES } = PRODUCT_TYPES;
const { CATEGORY_LOADING } = LOADERS;

export const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_LOADING:
      return { ...state, categoryLoading: action.boolean };
    case GET_ALL_CATEGORIES:
      return { ...state, categories: action.response };
    default:
      return state;
  }
};
