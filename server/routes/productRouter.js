import { Router } from "express";
import multer from "multer";

import {
  // Image Process
  getProductImageProcessed,
  productImageLink,
  handleProductImages,
  processProductImages,
  handleProductBoardImages,
  processProductBoards,

  // Routes
  addNewProduct,
  getAllProducts,
  getProductDetailsInCart,
  getProduct,
  addProductManufacturer,
  addProductDescriptionAndImages,
  addProductBoards,

  // Middlewares
  preFillCartIdasParams,
  preFillProductBoards,
  // Protect
  protectRoute,
} from "../controller/productsController";

export const productRouter = Router();
const upload = multer();

// Public Routes
productRouter.route("/getProducts").get(getAllProducts);
productRouter
  .route("/getProductsDetailsInCart")
  .post(preFillCartIdasParams, getProductDetailsInCart);

productRouter.route("/getProduct").get(getProduct);

// Seller Route

// DevRoute
productRouter.route("/dev/addNewProduct").post(
  upload.array("productCoverImage"),

  protectRoute,
  getProductImageProcessed,
  productImageLink,
  addNewProduct
);

productRouter.route("/dev/addManufacturer").post(addProductManufacturer);

productRouter
  .route("/dev/addProductDescAndImages")
  .post(
    upload.array("productImages"),
    handleProductImages,
    processProductImages,
    addProductDescriptionAndImages
  );

productRouter
  .route("/dev/addProductBoards")
  .post(
    upload.array("productBoards"),
    preFillProductBoards,
    handleProductBoardImages,
    processProductBoards,
    addProductBoards
  );
