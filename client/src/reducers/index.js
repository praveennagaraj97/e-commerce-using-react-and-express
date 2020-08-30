import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import globalMessageReducer from "./globalMessageReducer";
import userAuthLoginReducer, { userAccredited } from "./userAuthReducer";
import categoriesReducer, {
  getProductsReducer,
  productCartReducer,
} from "./productReducer";

export default combineReducers({
  userAccredited,
  userAuthorization: userAuthLoginReducer,
  form: formReducer,
  productCategories: categoriesReducer,
  productsList: getProductsReducer,
  globalErrorOrSuccessMessage: globalMessageReducer,
  productCart: productCartReducer,
});
