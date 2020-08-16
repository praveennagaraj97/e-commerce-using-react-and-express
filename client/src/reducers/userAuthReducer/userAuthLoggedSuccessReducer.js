import { USER_AUTH_TYPES } from "../../constants";

const {
  LOGIN: { LOAD_LOGGED_SUCCESS },
} = USER_AUTH_TYPES;

const userAuthLoggedSuccessReducer = (state = null, action) => {
  switch (action.type) {
    case LOAD_LOGGED_SUCCESS:
      return action.message;
    default:
      return state;
  }
};

export default userAuthLoggedSuccessReducer;
