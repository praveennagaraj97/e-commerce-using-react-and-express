import { Router } from "express";
import multer from "multer";

import {
  // Image Process
  getProductImageProcessed,
  productImageLink,
  handleProductImages,
  processProductImages,

  // Routes
  addNewProduct,
  getAllProducts,
  getProductDetailsInCart,
  getProduct,
  addProductManufacturer,
  addProductDescriptionAndImages,

  // Middlewares
  preFillCartIdasParams,
  preFillProductDescAndImages,

  // Protect
  protectForReact,
  protectRoutes,
} from "../controller/productsController";

export const productRouter = Router();
const upload = multer();

// Public Routes
productRouter.route("/getProducts").get(getAllProducts);
productRouter
  .route("/getProductsDetailsInCart")
  .post(preFillCartIdasParams, getProductDetailsInCart);

productRouter.route("/getProduct/:id").get(getProduct);

// Seller Route

// DevRoute
productRouter
  .route("/dev/addNewProduct")
  .post(
    upload.array("productCoverImage"),
    protectForReact,
    protectRoutes,
    getProductImageProcessed,
    productImageLink,
    addNewProduct
  );

productRouter.route("/dev/addManufacturer").post(addProductManufacturer);

productRouter
  .route("/dev/addProductDescAndImages")
  .post(
    upload.array("productImages"),
    preFillProductDescAndImages,
    handleProductImages,
    processProductImages,
    addProductDescriptionAndImages
  );
