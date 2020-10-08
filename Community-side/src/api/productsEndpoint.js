import { API_BASE_ENDPOINT } from ".";
import { getSessionItem } from "../utils";
import { COOKIE_NAME } from "../constants";

const { AUTH_TOKEN } = COOKIE_NAME;

export const getAllCategories = async () =>
  await API_BASE_ENDPOINT.get("/category/getAllCategories");

export const addNewCategory = async (data) =>
  await API_BASE_ENDPOINT.post("/category/dev/addNewCategory", data, {
    headers: {
      authorization: `Bearer ${getSessionItem(AUTH_TOKEN)}`,
    },
  });

export const editCategory = async (id, data) =>
  await API_BASE_ENDPOINT.patch(`/category/dev/${id}/updateCategory`, data, {
    headers: {
      authorization: `Bearer ${getSessionItem(AUTH_TOKEN)}`,
    },
  });

export const deleteCategory = async (id) =>
  await API_BASE_ENDPOINT.delete(`/category/dev/${id}/deleteCategory`, {
    headers: {
      authorization: `Bearer ${getSessionItem(AUTH_TOKEN)}`,
    },
  });

export const addProductModel = async (data) =>
  await API_BASE_ENDPOINT.post(`/product/dev/addNewProduct`, data, {
    headers: {
      authorization: `Bearer ${getSessionItem(AUTH_TOKEN)}`,
    },
  });

export const addproductDetail = async (data) =>
  await API_BASE_ENDPOINT.post(`/product_detail/addDetail/detail`, data, {
    headers: {
      authorization: `Bearer ${getSessionItem(AUTH_TOKEN)}`,
    },
  });

export const addProductImgAndDesc = async (data) =>
  await API_BASE_ENDPOINT.post(`/product/dev/addProductDescAndImages`, data, {
    headers: {
      authorization: `Bearer ${getSessionItem(AUTH_TOKEN)}`,
    },
  });

export const addProductBoards = async (data) =>
  await API_BASE_ENDPOINT.post(`/product/dev/addProductBoards`, data, {
    headers: {
      authorization: `Bearer ${getSessionItem(AUTH_TOKEN)}`,
    },
  });

export const getMyOrders = async () =>
  await API_BASE_ENDPOINT.get(`/orders/getManufacturerOrders`, {
    headers: {
      authorization: `Bearer ${getSessionItem(AUTH_TOKEN)}`,
    },
  });

export const updateUserOrder = async (data) =>
  await API_BASE_ENDPOINT.patch(
    `/orders/updateDeliveryStatus/${data._id}`,
    { delivered: data.delivered },
    {
      headers: {
        authorization: `Bearer ${getSessionItem(AUTH_TOKEN)}`,
      },
    }
  );

export const getMyProduct = async (data) =>
  await API_BASE_ENDPOINT.get(
    `/product/getProducts?sort=quantity&manufacturerId=${data}`,
    {
      headers: {
        authorization: `Bearer ${getSessionItem(AUTH_TOKEN)}`,
      },
    }
  );

export const updateProductQuantity = async (id, data) =>
  await API_BASE_ENDPOINT.patch(`/product/dev/updateProduct/${id}`, data, {
    headers: {
      authorization: `Bearer ${getSessionItem(AUTH_TOKEN)}`,
    },
  });
