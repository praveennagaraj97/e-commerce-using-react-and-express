import { USER_AUTH_TYPES } from "../../constants";

const {
  SIGNUP: { LOAD_SIGNUP },
} = USER_AUTH_TYPES;

const loadSignUpReducer = (state = false, action) => {
  switch (action.type) {
    case LOAD_SIGNUP:
      return true;
    default:
      return state;
  }
};

export default loadSignUpReducer;
