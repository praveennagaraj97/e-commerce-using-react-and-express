import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userAuthLoadReducer from "./userAuthReducer/userAuthLoadReducer";
import userAuthLoginReducer from "./userAuthReducer/userAuthLoginReducer";
import userAuthErrorReducer from "./userAuthReducer/userAuthErrorReducer";
import userAuthLoggedSuccessReducer from "./userAuthReducer/userAuthLoggedSuccessReducer";

import loadSignUpReducer from "./userAuthReducer/userAuthSignupLoadReducer";
import loadSignUpSuccessReducer from "./userAuthReducer/userAuthSignUpSuccessReducer";
import loadSignupErrorReducer from "./userAuthReducer/userAuthSignupErrorReducer";

import userAccreditedReducer from "./userAuthReducer/userAuthAccreditedReducer";

export default combineReducers({
  form: formReducer,
  loadLogin: userAuthLoadReducer,
  loginSuccess: userAuthLoginReducer,
  loginFailure: userAuthErrorReducer,
  loggedIn: userAuthLoggedSuccessReducer,

  loadSignUp: loadSignUpReducer,
  signupSuccess: loadSignUpSuccessReducer,
  signupFailure: loadSignupErrorReducer,

  userAuthorized: userAccreditedReducer,
});
