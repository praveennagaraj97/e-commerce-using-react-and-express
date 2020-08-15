import { USER_AUTH_TYPES } from "../constants";

const {
  LOGIN: { LOAD_LOGIN, LOAD_LOGIN_SUCCESS, LOAD_LOGIN_FAILURE },
} = USER_AUTH_TYPES;

export const loadLogin = () => ({
  type: LOAD_LOGIN,
});

export const loginUser = (response) => ({
  type: LOAD_LOGIN_SUCCESS,
  response,
});

export const loginUserFailed = (error) => ({
  type: LOAD_LOGIN_FAILURE,
  error,
});
