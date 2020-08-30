import { Router } from "express";
import multer from "multer";

import {
  // Image Process
  getProductImageProcessed,
  productImageLink,

  // Routes
  addNewProduct,
  getAllProducts,
  getProductDetailsInCart,

  // Middlewares
  preFillCartIdasParams,

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

// Seller Route

// DevRoute
productRouter
  .use(upload.array("productCoverImage"))
  .route("/dev/addNewProduct")
  .post(
    protectForReact,
    protectRoutes,
    getProductImageProcessed,
    productImageLink,
    addNewProduct
  );
