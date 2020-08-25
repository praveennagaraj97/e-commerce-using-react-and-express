import { PRODUCT_TYPES } from "../constants";

const { GET_ALL_CATEGORIES } = PRODUCT_TYPES;

export const getAllCategories = (response) => ({
  type: GET_ALL_CATEGORIES,
  response,
});
