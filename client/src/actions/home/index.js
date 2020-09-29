import { RECENT_VIEWED, LOADERS } from "../../constants";

const { TOP_LEVEL_AD_LOADING } = LOADERS;

export const loadTopAdvertiseLoading = (boolean) => ({
  type: TOP_LEVEL_AD_LOADING,
  boolean,
});

export const recentlyViewedItems = (data) => ({
  type: RECENT_VIEWED,
  data,
});
