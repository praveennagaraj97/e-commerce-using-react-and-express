import { delay, put } from "redux-saga/effects";

import { globalFailureMessenger, globalSuccesMessenger } from "../../actions";
import { ALERT_DURATION } from "../../constants";

export function* globalErrorMessageHandler(errorMesssage) {
  yield put(globalFailureMessenger(errorMesssage));
  yield delay(ALERT_DURATION);
  yield put(globalFailureMessenger(null));
}

export function* globalSuccessMessageHandler(successMessage) {
  yield put(globalSuccesMessenger(successMessage));
  yield delay(ALERT_DURATION);
  yield put(globalSuccesMessenger(null));
}
