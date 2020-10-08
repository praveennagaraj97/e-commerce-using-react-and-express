import { call, put, select, takeLatest } from "redux-saga/effects";

import { USER_TYPES, COOKIE_NAME } from "../constants";
import { employeeLogin, manufacturerLogin } from "../api";
import { handleErrorMessage } from "./notifySaga";
import { loginLoading, loggedUser } from "../actions";
import { setSessionItem } from "../utils";
import history from "../history";

const { LOAD_LOGIN } = USER_TYPES;
const { AUTH_TOKEN } = COOKIE_NAME;

const getFormValuesFromStore = ({
  form: {
    userAuth: { values },
  },
}) => values;

function* handleLoginWorker() {
  yield put(loginLoading(true));
  const formData = yield select(getFormValuesFromStore);
  if (!formData || !formData.userId || !formData.password) {
    yield put(loginLoading(false));
    return yield call(handleErrorMessage, "Enter ID and Password");
  }

  if (!formData.userId.includes("Lexa-MFR")) {
    const modelledEmployeeLoginData = {
      employeeId: formData.userId,
      password: formData.password,
    };

    try {
      const { data } = yield call(employeeLogin, modelledEmployeeLoginData);
      yield put(loggedUser(data.user));
      yield history.push(`/${data.user.techRole}`);
      yield call(setSessionItem, AUTH_TOKEN, data.token);
      yield put(loginLoading(false));
    } catch (error) {
      try {
        console.clear();
        yield put(loginLoading(false));
        yield call(handleErrorMessage, error.response.data.message);
      } catch (e) {
        yield put(loginLoading(false));
        yield call(handleErrorMessage, "Something Went Wrong");
      }
    }
  } else {
    const modelledManufacturerLoginData = {
      manufacturerId: formData.userId,
      password: formData.password,
    };

    try {
      const { data } = yield call(
        manufacturerLogin,
        modelledManufacturerLoginData
      );
      yield put(loggedUser(data.user));
      yield history.push(`/${data.user.userRole}`);
      yield call(setSessionItem, AUTH_TOKEN, data.token);
      yield put(loginLoading(false));
    } catch (error) {
      try {
        console.clear();
        yield put(loginLoading(false));
        yield call(handleErrorMessage, error.response.data.message);
      } catch (e) {
        yield put(loginLoading(false));
        yield call(handleErrorMessage, "Something Went Wrong");
      }
    }
  }
}

export function* loginWatcher() {
  yield takeLatest(LOAD_LOGIN, handleLoginWorker);
}
