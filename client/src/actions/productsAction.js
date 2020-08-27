import { PRODUCT_TYPES } from "../constants";

const {
  GET_ALL_CATEGORIES,
  LOAD_GET_PRODUCTS_BASED_ON_QUERY,
  GET_PRODUCTS_BASED_ON_QUERY,
  HOLD_PREVIOUS_REQUESTED_QUERY,
  SET_NUMBER_OF_RESULTS_PERPAGE,
  SET_PAGE_NUMBER,
  NO_MORE_RESULTS_FOUND,
} = PRODUCT_TYPES;

export const getAllCategories = (response) => ({
  type: GET_ALL_CATEGORIES,
  response,
});

export const loadGetProductsOnQuery = (query) => ({
  type: LOAD_GET_PRODUCTS_BASED_ON_QUERY,
  query,
});

export const holdPreviousProductQuery = (prevQuery) => ({
  type: HOLD_PREVIOUS_REQUESTED_QUERY,
  prevQuery,
});

export const getProductsOnQuery = (response) => ({
  type: GET_PRODUCTS_BASED_ON_QUERY,
  response,
});

export const setPageNumber = (pageNumber) => ({
  type: SET_PAGE_NUMBER,
  pageNumber,
});

export const setLimitsPerPage = (noOfResults) => ({
  type: SET_NUMBER_OF_RESULTS_PERPAGE,
  noOfResults,
});

export const noMoreResultsFound = (isAvailable) => ({
  type: NO_MORE_RESULTS_FOUND,
  isAvailable,
});
