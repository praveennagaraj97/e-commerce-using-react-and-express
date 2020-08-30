import {
  GLOBAL_ERROR,
  GLOBAL_SUCCESS,
  GLOBAL_SUCCESS_WITH_IMG,
} from "../../constants";

const globalMessageReducer = (state = null, action) => {
  switch (action.type) {
    case GLOBAL_ERROR:
      return action.error;
    case GLOBAL_SUCCESS:
      return action.success;
    case GLOBAL_SUCCESS_WITH_IMG:
      return action.successData;
    default:
      return state;
  }
};

export default globalMessageReducer;
