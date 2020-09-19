import { apiBaseEndpoint } from "./index";

export const getAllCategoriesEndpoint = async () => {
  return await apiBaseEndpoint.get(`/category/getAllCategories`);
};

export const getProductsBasedOnQuery = async (query) => {
  return await apiBaseEndpoint.get(
    `/product/getProducts${query}&sort=-createdAt`
  );
};

export const getProductsDetailsInCartEndPoint = async (data) => {
  return await apiBaseEndpoint.post(`/product/getProductsDetailsInCart`, data);
};

export const getProductDetailEndPoint = async (id) => {
  return await apiBaseEndpoint.get(`/product/getProduct`, {
    params: { id },
  });
};

export const getListOfProductReviewsEndPoint = async (id) => {
  return await apiBaseEndpoint.get(
    `/product_review/getReviews?productId=${id}&sort=-createdAt&page=1&limit=4`
  );
};
