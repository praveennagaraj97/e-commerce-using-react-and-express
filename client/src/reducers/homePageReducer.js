import { RECENT_VIEWED, LOADERS } from "../constants";

const { TOP_LEVEL_AD_LOADING } = LOADERS;

export const homePageReducer = (state = {}, action) => {
  switch (action.type) {
    case RECENT_VIEWED:
      return { ...state, viewedItems: action.data };

    case TOP_LEVEL_AD_LOADING:
      return { ...state, topAdLoading: action.boolean };

    default:
      return state;
  }
};
