import { PRODUCT_TYPES } from "../constants";

const {
  GET_ALL_CATEGORIES,
  LOAD_GET_PRODUCTS_BASED_ON_QUERY,
  GET_PRODUCTS_BASED_ON_QUERY,
  HOLD_PREVIOUS_REQUESTED_QUERY,
  SET_NUMBER_OF_RESULTS_PERPAGE,
  SET_PAGE_NUMBER,
  NO_MORE_RESULTS_FOUND,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
} = PRODUCT_TYPES;

// Loads on website load.
export const getAllCategories = (response) => ({
  type: GET_ALL_CATEGORIES,
  response,
});

// loads when a query is requested to server for products
export const loadGetProductsOnQuery = (query) => ({
  type: LOAD_GET_PRODUCTS_BASED_ON_QUERY,
  query,
});
// Holds the previous query to avoid refetch!
export const holdPreviousProductQuery = (prevQuery) => ({
  type: HOLD_PREVIOUS_REQUESTED_QUERY,
  prevQuery,
});
// takes products as array and stores them in redux-store
export const getProductsOnQuery = (response) => ({
  type: GET_PRODUCTS_BASED_ON_QUERY,
  response,
});

// Scrolling effect or next page
export const setPageNumber = (pageNumber) => ({
  type: SET_PAGE_NUMBER,
  pageNumber,
});
// limit the each request response results count !!!
export const setLimitsPerPage = (noOfResults) => ({
  type: SET_NUMBER_OF_RESULTS_PERPAGE,
  noOfResults,
});
// If server responds with no documents/nodata sets this to false
export const noMoreResultsFound = (isAvailable) => ({
  type: NO_MORE_RESULTS_FOUND,
  isAvailable,
});

// Cart Actions
export const addItemToCart = (item) => ({
  type: ADD_PRODUCT_TO_CART,
  item,
});

export const removeItemFromCart = (item) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  item,
});
