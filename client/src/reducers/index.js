import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import globalErrorStateReducer from "./globalErrorStateReducer";
import userAuthLoginReducer, { userAccredited } from "./userAuthReducer";
import categoriesReducer, { getProductsReducer } from "./productReducer";

export default combineReducers({
  userAccredited,
  userAuthorization: userAuthLoginReducer,
  form: formReducer,
  productCategories: categoriesReducer,
  productsList: getProductsReducer,
  globalErrorState: globalErrorStateReducer,
});
