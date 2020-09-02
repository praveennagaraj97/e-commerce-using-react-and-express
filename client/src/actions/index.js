import {
  GLOBAL_ERROR,
  WEBSITE_LOAD,
  GLOBAL_SUCCESS,
  GLOBAL_SUCCESS_WITH_IMG,
} from "../constants";

export const websiteLoad = () => ({ type: WEBSITE_LOAD });

export const globalFailureMessenger = (error) => ({
  type: GLOBAL_ERROR,
  error,
});

export const globalSuccesMessenger = (success) => ({
  type: GLOBAL_SUCCESS,
  success,
});

export const globalSuccesMessengerWithImg = (success, image) => ({
  type: GLOBAL_SUCCESS_WITH_IMG,
  successData: { success, image },
});

export {
  // Global Auth Messenger
  authSuccessMessage,
  authFailueMessage,
  // Login
  loadLogin,
  loginUser,
  // signUp
  loadSignUp,
  signUpUser,
  // accreditation
  loadAccreditation,
  userAccredited,
  // LogoutUser
  loadLogout,
} from "./userAuthActions";

export {
  // Get all categories on website load
  getAllCategories,
  // Load products related to categories clicked
  loadGetProductsOnQuery,
  holdPreviousProductQuery,
  getProductsOnQuery,
  setLimitsPerPage,
  setPageNumber,
  noMoreResultsFound,
  // cart
  addItemToCart,
  removeItemFromCart,
  loadProductCart,
  getProductsDetailsInCart,
  // View Products
  loadViewProductDetail,
} from "./productsAction";
