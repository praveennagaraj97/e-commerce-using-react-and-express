import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userAuthLoginReducer, { userAccredited } from "./userAuthReducer";

export default combineReducers({
  form: formReducer,
  userAuthorization: userAuthLoginReducer,
  userAccredited,
});
