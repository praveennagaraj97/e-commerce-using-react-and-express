import { USER_AUTH_TYPES } from "../../constants";

const {
  LOGIN: { LOAD_LOGIN_SUCCESS },
} = USER_AUTH_TYPES;

const userAuthLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.response,
      };
    default:
      return state;
  }
};

export default userAuthLoginReducer;
