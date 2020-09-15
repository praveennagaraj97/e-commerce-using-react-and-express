import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import globalMessageReducer from "./globalMessageReducer";
import userAuthLoginReducer, {
  userAccredited,
  userDetailsReducer,
  userDetailsUpdateReducer,
} from "./userAuthReducer";
import {
  categoriesReducer,
  getProductsReducer,
  productCartReducer,
  viewProductReducer,
} from "./productReducer";

import appStateReducer from "./appStateReducer";

export default combineReducers({
  userAccredited,
  userAuthorization: userAuthLoginReducer,
  userDetails: userDetailsReducer,
  updateUserDetail: userDetailsUpdateReducer,
  appState: appStateReducer,
  form: formReducer,
  productCategories: categoriesReducer,
  productsList: getProductsReducer,
  globalErrorOrSuccessMessage: globalMessageReducer,
  productCart: productCartReducer,
  productDetail: viewProductReducer,
});
