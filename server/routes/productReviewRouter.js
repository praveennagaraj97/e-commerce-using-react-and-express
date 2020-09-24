import { Router } from "express";
import multer from "multer";

import {
  addProductMobileReview,
  addProductComputerReview,

  // like
  getProductReviewBasedOnProductId,
  reviewHelpfulPost,

  // Middlewares
  protectRoute,
  preFillUserId,
  preFillReviewHelpulForLikeOrUndo,

  //   Image Process
  handleProductReviewImage,
  processProductReviewImage,
} from "../controller/productReviewController";

const upload = multer();

export const productReviewRouter = Router();

productReviewRouter.route("/getReviews").get(getProductReviewBasedOnProductId);

productReviewRouter
  .route("/foundHelpful/:bool")
  .post(
    protectRoute,
    preFillUserId,
    preFillReviewHelpulForLikeOrUndo,
    reviewHelpfulPost
  );

productReviewRouter.route("/addMobileReview").post(
  upload.array("productReviewImage"),
  // (req, res, next) => {
  //   console.log(req.files);
  //   res.send(req.files);
  // },
  protectRoute,
  preFillUserId,
  handleProductReviewImage,
  processProductReviewImage,
  addProductMobileReview
);

productReviewRouter.route("/addComputerReview").post(
  upload.array("productReviewImage"),
  // (req, res, next) => {
  //   res.send(req.files);
  // },
  protectRoute,
  preFillUserId,
  handleProductReviewImage,
  processProductReviewImage,
  addProductComputerReview
);
