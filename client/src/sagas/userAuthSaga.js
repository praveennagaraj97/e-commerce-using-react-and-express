import { takeEvery, select, put, call, delay } from "redux-saga/effects";

import { USER_AUTH_TYPES } from "../constants";
import {
  // Login
  loginUser,
  loginUserFailed,
  loginSuccess,

  // SignUp
  signUpUser,
  signUpUserFailed,

  // Accredit
  userAccredited,
} from "../actions";

import { UserLogger, UserSigner, AuthAccredit } from "../api";

import { useCookies } from "../utils/useCookies";

const { setCookie, getCookie } = useCookies;

const {
  LOGIN: { LOAD_LOGIN },
  SIGNUP: { LOAD_SIGNUP },
  AUTH: { LOAD_ACCREDIT },
} = USER_AUTH_TYPES;

const getFormValues = ({ form }) => form;

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
      yield put(loginUserFailed("Please Enter Email"));
      yield delay(3700);
      yield put(loginUserFailed(null));
      return;
    }
    // If Password is Not Filled Create A Error And Sent to store.
    if (!values.hasOwnProperty("password")) {
      yield put(loginUserFailed("Please Enter Password"));
      yield delay(3700);
      yield put(loginUserFailed(null));
      return;
    }
    // If Email field is entered with invalid char!!
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      yield put(loginUserFailed("Please Enter Valid Email"));
      yield delay(3700);
      yield put(loginUserFailed(null));
      return;
    }

    // If Both Email and Password Are not filled Inform User to Fill.
  } else {
    yield put(loginUserFailed("Please Enter Email and password"));
    yield delay(3700);
    yield put(loginUserFailed(null));
    return;
  }

  // Above Checks are Called To Avoid Over Fetching Our API.
  // Since API Handles Above Errors But here we are avoiding API over fetching.
  // If Everything is Sorted Make A Api Call!
  try {
    const response = yield call(UserLogger, values.email, values.password);
    yield put(loginUser(response));

    yield setCookie("auth_token", response.token, "infinite");

    yield put(loginSuccess("Successfully Logged In"));
    yield put(userAccredited(true));
    yield delay(3700);
    yield put(loginSuccess(null));
  } catch (err) {
    try {
      yield put(loginUserFailed(err.response.data.message));
      yield delay(3700);
      yield put(loginUserFailed(null));
    } catch (err) {
      yield put(
        loginUserFailed("Something Went Wrong Please Try again Later!!")
      );
      yield delay(3700);
      yield put(loginUserFailed(null));
    }
  }
}

// watcher Saga
export function* userAuthLoginWatcher() {
  yield takeEvery(LOAD_LOGIN, userAuthLoginWorker);
}

const getSignUpValues = ({ form }) => form;

function* userAuthSignUpWorker() {
  const signUpFields = yield select(getSignUpValues);
  const {
    SignUpOrLogin: { values },
  } = signUpFields;

  if (values) {
    if (!values.hasOwnProperty("name")) {
      yield put(signUpUserFailed("Please Enter Name"));
      yield delay(3700);
      yield put(signUpUserFailed(null));
      return;
    } else if (!values.hasOwnProperty("signUpemail")) {
      yield put(signUpUserFailed("Please Enter Email"));
      yield delay(3700);
      yield put(signUpUserFailed(null));
      return;
    } else if (!/\S+@\S+\.\S+/.test(values.signUpemail)) {
      yield put(signUpUserFailed("Please Enter Valid Email"));
      yield delay(3700);
      yield put(signUpUserFailed(null));
      return;
    } else if (!values.hasOwnProperty("phoneNumber")) {
      yield put(signUpUserFailed("Please Enter Phone Number"));
      yield delay(3700);
      yield put(signUpUserFailed(null));
      return;
    } else if (
      String(values.phoneNumber).length !== 10 ||
      !String(values.phoneNumber).charAt(0) > 6
    ) {
      yield put(signUpUserFailed("Please Enter Valid Phone Number"));
      yield delay(3700);
      yield put(signUpUserFailed(null));
      return;
    } else if (!values.hasOwnProperty("signUppassword")) {
      yield put(signUpUserFailed("Please Enter Password"));
      yield delay(3700);
      yield put(signUpUserFailed(null));
      return;
    } else if (!values.hasOwnProperty("confirmPassword")) {
      yield put(signUpUserFailed("Please Confirm Your Password"));
      yield delay(3700);
      yield put(signUpUserFailed(null));
      return;
    } else if (values.signUppassword !== values.confirmPassword) {
      yield put(signUpUserFailed("Password Didn't Match"));
      yield delay(3700);
      yield put(signUpUserFailed(null));
      return;
    }
  } else {
    yield put(signUpUserFailed("Please Fill The Form"));
    yield delay(3700);
    yield put(signUpUserFailed(null));
    return;
  }

  try {
    const {
      name,
      signUpemail,
      signUppassword,
      confirmPassword,
      phoneNumber,
    } = values;

    const response = yield call(
      UserSigner,
      name,
      signUpemail,
      signUppassword,
      confirmPassword,
      phoneNumber
    );
    yield put(signUpUser(response));

    yield setCookie("auth_token", response.token, "infinite");

    yield put(loginSuccess("Successfully SignedUp and Logged In."));
    yield put(userAccredited(true));
    yield delay(3700);
    yield put(loginSuccess(null));
  } catch (err) {
    try {
      yield put(loginUserFailed(err.response.data.message));
      yield delay(3700);
      yield put(loginUserFailed(null));
    } catch (err) {
      yield put(
        loginUserFailed("Something Went Wrong Please Try again Later!!")
      );
      yield delay(3700);
      yield put(loginUserFailed(null));
    }
  }
}

export function* userSignUpWatcher() {
  yield takeEvery(LOAD_SIGNUP, userAuthSignUpWorker);
}

function* handleUserAccreditWorker() {
  const auth_token = yield getCookie("auth_token");
  try {
    const response = yield call(AuthAccredit, auth_token);
    if (response.message === "User is Authorized")
      yield put(userAccredited(true));
  } catch (err) {}
}

export function* userAccreditWatcher() {
  yield takeEvery(LOAD_ACCREDIT, handleUserAccreditWorker);
}
