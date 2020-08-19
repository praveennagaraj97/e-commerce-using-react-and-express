import { USER_AUTH_TYPES } from "../constants";

const {
  LOGIN: { LOAD_LOGIN, LOAD_LOGGGED_USER },
  MESSAGE: { LOAD_AUTH_SUCCESS_MESSAGE, LOAD_AUTH_FAILURE_MESSAGE },
  SIGNUP: { LOAD_SIGNUP, LOAD_SIGNED_UP_USER },
} = USER_AUTH_TYPES;

export const loadLogin = () => ({
  type: LOAD_LOGIN,
});

export const loginUser = (response) => ({
  type: LOAD_LOGGGED_USER,
  response,
});

export const loadSignUp = () => ({ type: LOAD_SIGNUP });

export const signUpUser = (response) => ({
  type: LOAD_SIGNED_UP_USER,
  response,
});

// Global Success message for user auth activity!
export const authSuccessMessage = (message) => ({
  type: LOAD_AUTH_SUCCESS_MESSAGE,
  message,
});

export const authFailueMessage = (message) => ({
  type: LOAD_AUTH_FAILURE_MESSAGE,
  message,
});
