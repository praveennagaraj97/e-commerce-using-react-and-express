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

export const globalSuccesMessenger = (error) => ({
  type: GLOBAL_SUCCESS,
  error,
});

export const globalSuccesMessengerWithImg = (error, image) => ({
  type: GLOBAL_SUCCESS_WITH_IMG,
  errorData: { error, image },
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
} from "./productsAction";
