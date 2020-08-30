import { Product } from "../model/productModel";

import { createNewDocumnet, readAllDocument } from "../handlers/factoryHandler";
import {
  processSingleImage,
  handleImageUpload,
} from "../middleware/imageProcessMiddleware";

// Protect Middlewares
export { protectForReact, protectRoutes } from "./userController";

export const getProductImageProcessed = handleImageUpload(
  1,
  "lexa-product-covers"
);
export const productImageLink = processSingleImage("productCoverImage");
export const addNewProduct = createNewDocumnet(Product, {
  message: "New Product Added Successfully",
});

export const getAllProducts = readAllDocument(Product, {
  message: "List Of Products",
});

// Cart
export const getProductDetailsInCart = readAllDocument(Product, {
  message: "Details Of Products in Cart",
});
