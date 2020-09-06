import { Router } from "express";
import multer from "multer";

import {
  addDetailForProduct,
  updateProductDetailVideo,

  // Middleware
  preFillProductdetailedDescription,
  preCheckifProductUpdateDetailVideoHasFileAttached,
  checkIfVideoExistsAndDeleteBeforeUpdatingNewVideo,

  // Image Processer
  // handleMobileDataImages,
  // processMobileDetailsImages,

  // Video Process,
  handleProductDetailVideo,
  processProductDetailVideo,
} from "../controller/productDetailController";

export const productDetailRouter = Router();
const upload = multer();

productDetailRouter
  .use(upload.array("productVideo"))
  .route("/addDetail/detail")
  .post(
    preFillProductdetailedDescription,
    handleProductDetailVideo,
    processProductDetailVideo,
    addDetailForProduct
  );

productDetailRouter
  .route("/updateProductDetailVideo")
  .patch(
    preCheckifProductUpdateDetailVideoHasFileAttached,
    checkIfVideoExistsAndDeleteBeforeUpdatingNewVideo,
    handleProductDetailVideo,
    processProductDetailVideo,
    updateProductDetailVideo
  );
