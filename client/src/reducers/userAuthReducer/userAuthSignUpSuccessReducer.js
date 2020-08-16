import { USER_AUTH_TYPES } from "../../constants";

const {
  SIGNUP: { LOAD_SIGNUP_SUCCESS },
} = USER_AUTH_TYPES;

const loadSignUpSuccessReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SIGNUP_SUCCESS:
      return { ...state, ...action.response };

    default:
      return state;
  }
};

export default loadSignUpSuccessReducer;
