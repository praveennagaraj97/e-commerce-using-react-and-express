import {
  Product,
  ProductManufacturer,
  ProductDescriptionAndImages,
} from "../model/productModel";

import {
  createNewDocumnet,
  readAllDocument,
  readDocumentById,
} from "../handlers/factoryHandler";
import {
  processSingleImage,
  handleImageUpload,
  processMultipleImages,
} from "../middleware/imageProcessMiddleware";

export {
  preFillCartIdasParams,
  preFillProductDescAndImages,
} from "../middleware/preFillers";

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

// Manufacturer
export const addProductManufacturer = createNewDocumnet(ProductManufacturer, {
  message: "Manufactured Details Added",
});

// Product Description
export const handleProductImages = handleImageUpload(
  5,
  "product-mobile-details-images"
);
export const processProductImages = processMultipleImages("productImages");

export const addProductDescriptionAndImages = createNewDocumnet(
  ProductDescriptionAndImages,
  {
    message: "Product Description and Images added",
  }
);

export const getProduct = readDocumentById(Product, {
  message: "Requested Product",
});
