import { PRODUCT_TYPES } from "../../constants";

const {
  GET_ALL_CATEGORIES,
  LOAD_GET_PRODUCTS_BASED_ON_QUERY,
  GET_PRODUCTS_BASED_ON_QUERY,
  HOLD_PREVIOUS_REQUESTED_QUERY,
} = PRODUCT_TYPES;

const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return { ...state, categories: action.response };
    default:
      return state;
  }
};

const getProductsrelatedToQuery = {
  products: [],
  query: {},
};

export const getProductsReducer = (
  state = getProductsrelatedToQuery,
  action
) => {
  switch (action.type) {
    case LOAD_GET_PRODUCTS_BASED_ON_QUERY: {
      const current = "current";
      state.query[current] = action.query;
      return { ...state };
    }
    case HOLD_PREVIOUS_REQUESTED_QUERY: {
      const prev = "prev";
      state.query[prev] = action.prevQuery;
      return { ...state };
    }
    case GET_PRODUCTS_BASED_ON_QUERY:
      return { ...state, products: action.response };

    default:
      return state;
  }
};

export default categoriesReducer;
