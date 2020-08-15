import { takeEvery, select, put, call } from "redux-saga/effects";

import { USER_AUTH_TYPES } from "../constants";
import { loginUser, loginUserFailed } from "../actions";

import { userSigner } from "../api";

const {
  LOGIN: { LOAD_LOGIN },
} = USER_AUTH_TYPES;

const getFormValues = ({ form }) => {
  return form;
};

function* userAuthLoginWorker() {
  // Get Form Values from redux store!!!
  const {
    SignUpOrLogin: { values },
  } = yield select(getFormValues);

  // Check If Values Property Exists!
  if (values) {
    // If Exists Check whether Email/Password are left filled.

    // If Email is Not Filled Create A Error And Sent to store.
    if (!values.hasOwnProperty("email")) {
      return yield put(loginUserFailed("Please Enter Email"));
    }
    // If Password is Not Filled Create A Error And Sent to store.
    if (!values.hasOwnProperty("password")) {
      return yield put(loginUserFailed("Please Enter Password"));
    }
    // If Both Email and Password Are not filled Inform User to Fill.
  } else {
    return yield put(loginUserFailed("Please Enter Email and password"));
  }

  // Above Checks are Called To Avoid Over Fetching Our API.
  // If Everything is Sorted Make A Api Call!
  try {
    const response = yield call(userSigner, values.email, values.password);
    yield put(loginUser(response));
  } catch (err) {
    yield put(loginUserFailed("Invalid Credentials Provided!"));
  }
}

// watcher Saga
export function* userAuthLoginWatcher() {
  yield takeEvery(LOAD_LOGIN, userAuthLoginWorker);
}
