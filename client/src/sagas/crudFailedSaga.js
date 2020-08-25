import { takeEvery, put, select, delay } from "redux-saga/effects";

import { FAILED_CRUD } from "../constants";

import { loadCrud, globalError } from "../actions";

const getErrorFromStore = ({ crudStatus }) => crudStatus;

function* handleCrudFailWorker() {
  yield put(loadCrud(false));

  const { error } = yield select(getErrorFromStore);
  yield put(globalError(error));
  yield delay(5000);
  yield put(globalError(null));
}

export function* crudFailWatcher() {
  yield takeEvery(FAILED_CRUD, handleCrudFailWorker);
}
