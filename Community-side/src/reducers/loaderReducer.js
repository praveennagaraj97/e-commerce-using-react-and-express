import { LOADERS } from "../constants";

const { LOGIN_LOADING } = LOADERS;

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, loginLoading: action.state };
    default:
      return state;
  }
};
