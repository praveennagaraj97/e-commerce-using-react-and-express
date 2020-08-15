import { USER_AUTH_TYPES } from "../../constants";

const {
  LOGIN: { LOAD_LOGIN, LOAD_LOGIN_FAILURE },
} = USER_AUTH_TYPES;

const userAuthLoadReducer = (state = false, action) => {
  switch (action.type) {
    case LOAD_LOGIN:
      return true;
    case LOAD_LOGIN_FAILURE:
      return false;
    default:
      return state;
  }
};

export default userAuthLoadReducer;
