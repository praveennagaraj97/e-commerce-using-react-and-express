import {
  GLOBAL_ERROR,
  WEBSITE_LOAD,
  GLOBAL_SUCCESS,
  GLOBAL_SUCCESS_WITH_IMG,
  IS_LOADING,
} from "../constants";

export const websiteLoad = () => ({ type: WEBSITE_LOAD });

export const isLoading = (boolean) => ({ type: IS_LOADING, boolean });

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
  // forgot password
  loadForgotPassword,
  loadResetPassword,
  // User settings
  loadUser,
  getUser,
  userPasswordUpdate,
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
  getProductDetail,
  // Re Occuring request to avoid api over fetch!
  reOccuringRequests,
} from "./productsAction";
