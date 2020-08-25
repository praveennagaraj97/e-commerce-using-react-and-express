import { all, fork } from "redux-saga/effects";

import { addNewcategoryWatcher } from "./categorySagas";
import { crudFailWatcher } from "./crudFailedSaga";

function* rootSaga() {
  all([yield fork(addNewcategoryWatcher), yield fork(crudFailWatcher)]);
}

export default rootSaga;
