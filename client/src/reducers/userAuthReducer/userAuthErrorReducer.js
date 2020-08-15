import { USER_AUTH_TYPES } from "../../constants";

const {
  LOGIN: { LOAD_LOGIN_FAILURE },
} = USER_AUTH_TYPES;

const userAuthErrorReducer = (state = null, action) => {
  switch (action.type) {
    case LOAD_LOGIN_FAILURE:
      return action.error;
    default:
      return state;
  }
};

export default userAuthErrorReducer;
