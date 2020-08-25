import { takeLatest, select, put, delay } from "redux-saga/effects";

import history from "../history";
import { CATEGORY_TYPES } from "../constants";
import { globalSuccess, loadCrud } from "../actions";

const {
  CRUD: { CREATE_CATEGORY },
} = CATEGORY_TYPES;

const getValuesfromStore = ({ category }) => category;

function* handleAddNewCategoryWorker() {
  const storeValue = yield select(getValuesfromStore);
  const {
    addedcategory: { message },
  } = storeValue;
  yield put(loadCrud(false));
  yield put(globalSuccess(message));
  yield delay(200);
  let selection;
  if (window.confirm("Click Ok to Add New Category")) {
    selection = true;
  } else {
    selection = false;
  }
  if (selection) {
    yield window.location.reload();
  } else {
    history.goBack();
  }
  yield delay(3000);
  yield put(globalSuccess(null));
}

export function* addNewcategoryWatcher() {
  yield takeLatest(CREATE_CATEGORY, handleAddNewCategoryWorker);
}
