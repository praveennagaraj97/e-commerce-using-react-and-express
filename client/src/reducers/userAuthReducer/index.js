import { USER_AUTH_TYPES } from "../../constants";

const {
  LOGIN: { LOAD_LOGIN, LOAD_LOGGGED_USER },
  MESSAGE: { LOAD_AUTH_SUCCESS_MESSAGE, LOAD_AUTH_FAILURE_MESSAGE },
  SIGNUP: { LOAD_SIGNUP, LOAD_SIGNED_UP_USER },
  USER_STATUS: { IS_LOGGED_IN },
} = USER_AUTH_TYPES;

const userAuthLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_LOGIN:
      return { ...state, loadLogin: true };

    case LOAD_LOGGGED_USER:
      return {
        ...state,
        userDetails: action.response,
      };
    case LOAD_AUTH_SUCCESS_MESSAGE:
      return { ...state, authSuccessMessage: action.message };

    case LOAD_AUTH_FAILURE_MESSAGE:
      return { ...state, authFailueMessage: action.message };

    case LOAD_SIGNUP:
      return { ...state, loadSignUp: true };

    case LOAD_SIGNED_UP_USER:
      return {
        ...state,
        userDetails: action.response,
      };

    default:
      return state;
  }
};

export const userAccredited = (state = false, action) => {
  switch (action.type) {
    case IS_LOGGED_IN:
      return action.isSigned;
    default:
      return state;
  }
};

export { userAuthLoginReducer as default };