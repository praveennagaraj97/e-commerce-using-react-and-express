import { USER_AUTH_TYPES } from "../constants";

const {
  LOGIN: {
    LOAD_LOGIN,
    LOAD_LOGIN_SUCCESS,
    LOAD_LOGIN_FAILURE,
    LOAD_LOGGED_SUCCESS,
  },
  SIGNUP: { LOAD_SIGNUP, LOAD_SIGNUP_SUCCESS, LOAD_SIGNUP_FAILURE },
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

export const loginSuccess = (message) => ({
  type: LOAD_LOGGED_SUCCESS,
  message,
});

export const loadSignup = () => ({
  type: LOAD_SIGNUP,
});

export const signUpUser = (response) => ({
  type: LOAD_SIGNUP_SUCCESS,
  response,
});

export const signUpUserFailed = (error) => ({
  type: LOAD_SIGNUP_FAILURE,
  error,
});
