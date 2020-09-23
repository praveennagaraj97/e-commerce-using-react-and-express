import { apiBaseEndpoint } from "..";

export const addMobileReview = async (authToken, data) => {
  return await apiBaseEndpoint.post("/product_review/addMobileReview", data, {
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  });
};
