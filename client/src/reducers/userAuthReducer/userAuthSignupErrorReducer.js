import { USER_AUTH_TYPES } from "../../constants";

const {
  SIGNUP: { LOAD_SIGNUP_SUCCESS, LOAD_SIGNUP_FAILURE },
} = USER_AUTH_TYPES;

const loadSignupErrorReducer = (state = null, action) => {
  switch (action.type) {
    case LOAD_SIGNUP_FAILURE:
      return action.error;
    case LOAD_SIGNUP_SUCCESS:
      return null;
    default:
      return state;
  }
};

export default loadSignupErrorReducer;
