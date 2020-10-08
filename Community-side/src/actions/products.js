import { PRODUCT_TYPES } from "../constants";

const {
  ADDED_NEW_PRODUCT_MODEL,
  ADDED_NEW_PRODUCT_DETAIL,
  ADDED_NEW_PRODUCT_IMG_AND_DESC,
  FINISH_NEW_PRODUCT_ADD,
} = PRODUCT_TYPES;

export const newProductModelAdded = (data) => ({
  type: ADDED_NEW_PRODUCT_MODEL,
  data,
});

export const newProductDetailAdded = (data) => ({
  type: ADDED_NEW_PRODUCT_DETAIL,
  data,
});

export const newProductImagesAndDescAdded = (data) => ({
  type: ADDED_NEW_PRODUCT_IMG_AND_DESC,
  data,
});

export const finishProductAdding = () => ({
  type: FINISH_NEW_PRODUCT_ADD,
});
