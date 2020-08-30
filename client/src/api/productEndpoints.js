import Axios from "axios";
import { API_BASE_URL_LIVE, API_BASE_URL_LOCAL } from "./index";

export const getAllCategoriesEndpoint = async () => {
  return await Axios.get(
    `${
      process.env.NODE_ENV === "production"
        ? API_BASE_URL_LIVE
        : API_BASE_URL_LOCAL
    }/api/v1/category/getAllCategories`
  );
};

export const getProductsBasedOnQuery = async (query) => {
  return await Axios.get(
    `${
      process.env.NODE_ENV === "production"
        ? API_BASE_URL_LIVE
        : API_BASE_URL_LOCAL
    }/api/v1/product/getProducts${query}`
  );
};
