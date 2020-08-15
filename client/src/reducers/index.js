import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userAuthLoginReducer from "./userAuthReducer/userAuthLoginReducer";
import userAuthErrorReducer from "./userAuthReducer/userAuthErrorReducer";
import userAuthLoadReducer from "./userAuthReducer/userAuthLoadReducer";

export default combineReducers({
  form: formReducer,
  loadLogin: userAuthLoadReducer,
  loginSuccess: userAuthLoginReducer,
  loginFailure: userAuthErrorReducer,
});
