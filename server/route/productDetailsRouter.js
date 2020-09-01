import { Router } from "express";
import multer from "multer";

import {
  addDetailForMobile,

  // Middleware
  preFilldetailedMobileDescription,

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
  .use(upload.array("productVideos"))
  .route("/addDetail/mobiles")
  .post(
    preFilldetailedMobileDescription,
    handleMobileDetailVideo,
    processMobileDetailVideo,
    addDetailForMobile
  );
