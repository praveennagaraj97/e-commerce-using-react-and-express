import Category from "../model/categoryModel";
import {
  createNewDocumnet,
  readAllDocument,
  updateDocumentByID,
} from "../handlers/factoryHandler";
import {
  handleImageUpload,
  processSingleImage,
} from "../middleware/imageProcessMiddleware";

export { preCheckCategoryInputs } from "../middleware/preChecks";
export const getCatgoryImageProcessed = handleImageUpload(
  1,
  "lexa-product-categories"
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
