import { GLOBAL_ERROR, GLOBAL_SUCCESS } from "../constants";

const globalStateReducer = (state = { success: null, error: null }, action) => {
  switch (action.type) {
    case GLOBAL_ERROR:
      return { ...state, error: action.error };
    case GLOBAL_SUCCESS:
      return { ...state, success: action.success };
    default:
      return state;
  }
};

export default globalStateReducer;
