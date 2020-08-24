import Category from "../model/categoryModel";
import { createNewDocumnet } from "../handlers/factoryHandler";
import {
  handleImageUpload,
  processSingleImage,
} from "../middleware/imageProcessMiddleware";

export const getCatgoryImageProcessed = handleImageUpload(
  1,
  "lexa-product-categories"
);
export const categoryImageLink = processSingleImage("categoryIcon");
export const createNewCategory = createNewDocumnet(Category, {
  message: "New Category Added Successfully",
});
