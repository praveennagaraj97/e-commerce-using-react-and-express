import { Router } from "express";
import multer from "multer";

import {
  addDetailForMobile,

  // Middleware
  preFillProductdetailedDescription,

  // Image Processer
  // handleMobileDataImages,
  // processMobileDetailsImages,

  // Video Process,
  handleMobileDetailVideo,
  processMobileDetailVideo,
} from "../controller/productDetailController";

export const productDetailRouter = Router();
const upload = multer();

productDetailRouter
  .use(upload.array("productVideo"))
  .route("/addDetail/detail")
  .post(
    preFillProductdetailedDescription,
    handleMobileDetailVideo,
    processMobileDetailVideo,
    addDetailForMobile
  );
