import { PRODUCT_TYPES, RE_OCCURING_REQUESTS, LOADERS } from "../constants";

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
  LOAD_PRODUCT_CART,
  GET_PRODUCTS_IN_CART,

  LOAD_VIEW_PRODUCT_DETAIL,
  PRODUCT_DETAIL,

  LOAD_PRODUCT_REVIEWS,
  GET_PRODUCT_REVIEWS,
  REVIEW_FOUND_HELPFUL,

  LOAD_NEW_PRODUCT_REVIEW,
} = PRODUCT_TYPES;

const { CATEGORY_LOADING, PRODUCTS_LISTS_LOADING, REVIEW_LOADING } = LOADERS;

const { RE_OCCURING_PRODUCT_DETAIL } = RE_OCCURING_REQUESTS;

export const reOccuringProductDetailRequests = (request) => ({
  type: RE_OCCURING_PRODUCT_DETAIL,
  request,
});

// Loads on website load.
export const productCategoryLoading = (boolean) => ({
  type: CATEGORY_LOADING,
  boolean,
});
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
export const productsLoading = (boolean) => ({
  type: PRODUCTS_LISTS_LOADING,
  boolean,
});
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

export const loadProductCart = () => ({ type: LOAD_PRODUCT_CART });

export const getProductsDetailsInCart = (details) => ({
  type: GET_PRODUCTS_IN_CART,
  details,
});

export const loadViewProductDetail = (productDetail) => ({
  type: LOAD_VIEW_PRODUCT_DETAIL,
  productDetail,
});

export const getProductDetail = (data) => ({ type: PRODUCT_DETAIL, data });

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

export const loadNewProductReview = (reviewForProducttype) => ({
  type: LOAD_NEW_PRODUCT_REVIEW,
  reviewForProducttype,
});
