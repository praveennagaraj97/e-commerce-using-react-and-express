import { USER_TYPES } from "../constants";

const { LOGGED_USER } = USER_TYPES;

export default (state = {}, action) => {
  switch (action.type) {
    case LOGGED_USER:
      return { ...state, loggedUser: action.user };
    default:
      return state;
  }
};
