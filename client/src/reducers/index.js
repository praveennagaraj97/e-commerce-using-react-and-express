import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

import categoryReducer from "./categoryReducer";
import crudReducer from "./crudReducer";
import globalStateReducer from "./globalStateReducer";

export default combineReducers({
  form: reduxFormReducer,
  category: categoryReducer,
  crudStatus: crudReducer,
  globalState: globalStateReducer,
});
