import { GLOBAL_ERROR } from "../../constants";

const globalErrorStateReducer = (state = null, action) => {
  switch (action.type) {
    case GLOBAL_ERROR:
      return action.error;
    default:
      return state;
  }
};

export default globalErrorStateReducer;
