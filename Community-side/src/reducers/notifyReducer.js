import { NOTIFIER } from "../constants";

const { ERROR_MESSAGE, SUCCESS_MESSAGE } = NOTIFIER;

export default (state = { success: null, error: null }, action) => {
  switch (action.type) {
    case ERROR_MESSAGE:
      return { ...state, error: action.message };
    case SUCCESS_MESSAGE:
      return { ...state, success: action.message };
    default:
      return state;
  }
};
