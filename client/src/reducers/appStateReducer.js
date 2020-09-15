/*
 */

import { IS_LOADING } from "../constants";

export default (state = { isLoading: false }, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.boolean };

    default:
      return state;
  }
};
