import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userAuthLoginReducer from "./userAuthReducer";

export default combineReducers({
  form: formReducer,
  userAuthorization: userAuthLoginReducer,
});
