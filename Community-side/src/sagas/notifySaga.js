import { put, delay } from "redux-saga/effects";

import { showErrorMessage, showSuccessMessage } from "../actions";

export function* handleSuccessMessage(message) {
  yield put(showSuccessMessage(message));
  yield delay(3200);
  yield put(showSuccessMessage(null));
}

export function* handleErrorMessage(message) {
  yield put(showErrorMessage(message));
  yield delay(3200);
  yield put(showErrorMessage(null));
}
