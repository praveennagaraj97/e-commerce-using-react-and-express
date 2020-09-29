import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import globalMessageReducer from "./globalMessageReducer";
import userAuthLoginReducer, {
  userAccredited,
  userDetailsReducer,
  userDetailsUpdateReducer,
} from "./userAuthReducer";
import {
  getProductsReducer,
  productCartReducer,
  viewProductReducer,
  productReviewReducer,
  addNewProductReviewReducer,
  categoriesReducer,
} from "./productReducer";

import requestReducer from "./_requestsReduers";
import { homePageReducer } from "./homePageReducer";

export default combineReducers({
  userAccredited,
  userAuthorization: userAuthLoginReducer,
  userDetails: userDetailsReducer,
  updateUserDetail: userDetailsUpdateReducer,
  form: formReducer,
  productCategories: categoriesReducer,
  productsList: getProductsReducer,
  globalErrorOrSuccessMessage: globalMessageReducer,
  productCart: productCartReducer,
  productDetail: viewProductReducer,
  productReview: productReviewReducer,
  addNewProduct: addNewProductReviewReducer,
  requests: requestReducer,
  homePage: homePageReducer,
});
