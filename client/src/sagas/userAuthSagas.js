import {
  call,
  select,
  put,
  delay,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";

import { USER_AUTH_TYPES, COOKIE_NAMES } from "../constants";
import history from "../history";
import {
  loginUser,
  authSuccessMessage,
  authFailueMessage,
  signUpUser,
  userAccredited,
} from "../actions";
import { UserLogger, UserSigner, AuthAccreditation } from "../api";
import { useCookies } from "../utils/useCookies";

const { setCookie, getCookie, removeCookie } = useCookies;

const {
  LOGIN: { LOAD_LOGIN },
  SIGNUP: { LOAD_SIGNUP },
  USER_STATUS: { LOAD_ACCREDITATION },
  USER_LOGOUT: { LOAD_LOGOUT },
} = USER_AUTH_TYPES;

const { AUTH_TOKEN } = COOKIE_NAMES;

const getFormValues = ({ form }) => form;

function* handleUserLoginWorker() {
  // Get Form Values for Store
  const {
    SignUpOrLogin: { values },
  } = yield select(getFormValues);
  //   Check If the form is filled with valid details.
  // API has this error handling feature
  // But we are doing this on client side to avoid over fetching.
  if (values) {
    if (!values.hasOwnProperty("email")) {
      yield put(authFailueMessage("Please Enter Email👻"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      return;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      yield put(authFailueMessage("Please Enter Valid Email👻"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      return;
    } else if (!values.hasOwnProperty("password")) {
      yield put(authFailueMessage("Please Enter Password👻"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      return;
    }
  } else {
    yield put(authFailueMessage("Please Enter Email and Password 👻"));
    yield delay(3200);
    yield put(authFailueMessage(null));
    return;
  }

  //   Once Field Check is done call API!
  try {
    const { data } = yield call(
      UserLogger,
      values.email,
      values.password,
      values.signedIn ? "infinite" : "24h"
    );

    yield put(loginUser(data));
    yield put(authSuccessMessage("Logged In Successfully🐱‍🏍"));
    yield call(
      setCookie,
      AUTH_TOKEN,
      data.token,
      values.signedIn ? "infinite" : "24"
    );

    yield history.goBack();
    yield call(handleUserAccreditationWorker);
    yield delay(3200);
    yield put(authSuccessMessage(null));
  } catch (err) {
    try {
      yield put(authFailueMessage(err.response.data.message + "🙃"));
      yield delay(3200);
      yield put(authFailueMessage(null));
    } catch (err) {
      yield put(authFailueMessage("Something went wrong🤯 try again later⌛"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      // Mail if uncaught error occurs
    }
  }
}

export function* userLoginWatcher() {
  yield takeLatest(LOAD_LOGIN, handleUserLoginWorker);
}

function* handleUserSignUpWorker() {
  const {
    SignUpOrLogin: { values },
  } = yield select(getFormValues);
  if (values) {
    if (!values.hasOwnProperty("name")) {
      yield put(authFailueMessage("Please Enter Name👻"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      return;
    } else if (!values.hasOwnProperty("signUpemail")) {
      yield put(authFailueMessage("Please Enter Email"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      return;
    } else if (!/\S+@\S+\.\S+/.test(values.signUpemail)) {
      yield put(authFailueMessage("Please Enter Valid Email👻"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      return;
    } else if (!values.hasOwnProperty("phoneNumber")) {
      yield put(authFailueMessage("Please Enter Phone Number"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      return;
    } else if (
      String(values.phoneNumber).length !== 10 ||
      !String(values.phoneNumber).charAt(0) > 6 ||
      !Number.isInteger(Number(values.phoneNumber))
    ) {
      yield put(authFailueMessage("Please Enter Valid Phone Number"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      return;
    } else if (!values.hasOwnProperty("signUppassword")) {
      yield put(authFailueMessage("Please Enter Password👻"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      return;
    } else if (!values.hasOwnProperty("confirmPassword")) {
      yield put(authFailueMessage("Please Enter Password👻"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      return;
    } else if (values.signUppassword !== values.confirmPassword) {
      yield put(authFailueMessage("Password Didn't match👻"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      return;
    }
  } else {
    yield put(authFailueMessage("Please Fill the Form👻"));
    yield delay(3200);
    yield put(authFailueMessage(null));
    return;
  }

  try {
    const { data } = yield call(
      UserSigner,
      values.name,
      values.signUpemail,
      values.signUppassword,
      values.confirmPassword,
      values.phoneNumber
    );

    yield put(signUpUser(data));
    yield put(authSuccessMessage("Thank You ,keep shopping!🐱‍🏍"));
    yield call(setCookie, AUTH_TOKEN, data.token);
    yield history.goBack();
    yield call(handleUserAccreditationWorker);
    yield delay(3200);
    yield put(authSuccessMessage(null));
  } catch (err) {
    try {
      yield put(authFailueMessage(err.response.data.message + "🙃"));
      yield delay(3200);
      yield put(authFailueMessage(null));
    } catch (err) {
      yield put(authFailueMessage("Something went wrong🤯 try again later⌛"));
      yield delay(3200);
      yield put(authFailueMessage(null));
      // Mail if uncaught error occurs
    }
  }
}

export function* userSignUpWatcher() {
  yield takeLatest(LOAD_SIGNUP, handleUserSignUpWorker);
}

function* handleUserAccreditationWorker() {
  const cookie = yield call(getCookie, AUTH_TOKEN);

  if (!cookie) return yield put(userAccredited(false));

  try {
    const { data } = yield call(AuthAccreditation, cookie);
    yield put(userAccredited(data.message === "User is Authorized"));
  } catch (err) {
    // Email
  }
}

export function* userAccreditationWatcher() {
  yield takeEvery(LOAD_ACCREDITATION, handleUserAccreditationWorker);
}

function* handleUserLogoutWorker() {
  yield call(removeCookie, AUTH_TOKEN);
  yield put(authSuccessMessage("Logged Out Successfully, come back soon!🐱‍"));
  yield call(handleUserAccreditationWorker);
  yield delay(3200);
  yield put(authSuccessMessage(null));
}

export function* userLogoutWatcher() {
  yield takeEvery(LOAD_LOGOUT, handleUserLogoutWorker);
}
