import Category from "../model/categoryModel";
import { GCS_BUCKET_NAME } from "../constants";

import {
  createNewDocumnet,
  readAllDocument,
  updateDocumentByID,
  deleteDocumentById,
} from "../handlers/factoryHandler";
import {
  handleImageUpload,
  processSingleImage,
} from "../middleware/imageProcessMiddleware";

const { LEXA_PRODUCT_CATEGORIES } = GCS_BUCKET_NAME;

export { preCheckCategoryInputs } from "../middleware/preChecks";
export const getCatgoryImageProcessed = handleImageUpload(
  1,
  LEXA_PRODUCT_CATEGORIES
);
export const categoryImageLink = processSingleImage("categoryIcon");
export const createNewCategory = createNewDocumnet(Category, {
  message: "New Category Added Successfully",
});

export const getAllCategories = readAllDocument(Category, {
  message: "List Of Categories",
});

export const updateCategory = updateDocumentByID(Category, {
  message: "Category Update Successfully",
});

export const deleteCategory = deleteDocumentById(Category, {
  message: "Category Deleted",
});
