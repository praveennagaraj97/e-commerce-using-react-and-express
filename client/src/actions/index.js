export {
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
  productCategoryLoading,
  getAllCategories,
  // Load products related to categories clicked
  loadGetProductsOnQuery,
  holdPreviousProductQuery,
  productsLoading,
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
  reOccuringProductDetailRequests,
  // Reviews
  productReviewLoading,
  loadProductReview,
  getProductReviews,
  reviewFoundHelpful,
  // Post reviews
  loadNewProductReview,
} from "./productsAction";

export {
  globalFailureMessenger,
  globalSuccesMessenger,
  globalSuccesMessengerWithImg,
  isLoading,
  websiteLoad,
} from "./addon";

export { recentlyViewedItems, loadTopAdvertiseLoading } from "./home";
