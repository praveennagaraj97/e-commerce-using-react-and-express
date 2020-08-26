import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userAuthLoginReducer, { userAccredited } from "./userAuthReducer";
import categoriesReducer from "./productReducer";

export default combineReducers({
  form: formReducer,
  userAuthorization: userAuthLoginReducer,
  userAccredited,
  productCategories: categoriesReducer,
});
