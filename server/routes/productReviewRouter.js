import { Router } from "express";
import multer from "multer";

import {
  addProductMobileReview,
  protectRoute,
  preFillUserId,

  //   Image Process
  handleProductReviewImage,
  processProductReviewImage,
} from "../controller/productReviewController";

export const productReviewRouter = Router();

productReviewRouter
  .use(multer().array("productReviewImage"))
  .route("/addMobileReview/image")
  .post(
    protectRoute,
    preFillUserId,
    handleProductReviewImage,
    processProductReviewImage,
    addProductMobileReview
  );

productReviewRouter
  .route("/addMobileReview")
  .post(protectRoute, preFillUserId, addProductMobileReview);
