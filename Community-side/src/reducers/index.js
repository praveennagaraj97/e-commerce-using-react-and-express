import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import loaderReducer from "./loaderReducer";
import notifyReducer from "./notifyReducer";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";

export default combineReducers({
  loaders: loaderReducer,
  form: formReducer,
  notify: notifyReducer,
  user: userReducer,
  product: productsReducer,
});
