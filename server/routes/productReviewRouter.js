import { Router } from "express";
import multer from "multer";

import {
  addProductMobileReview,
  getProductReviewBasedOnProductId,
  reviewHelpfulPost,
  averageReviewOfProducts,

  // Middlewares
  protectRoute,
  preFillUserId,
  preFillReviewHelpulForLikeOrUndo,

  //   Image Process
  handleProductReviewImage,
  processProductReviewImage,
} from "../controller/productReviewController";

export const productReviewRouter = Router();

productReviewRouter
  .use(multer().array("productReviewImage"))
  .route("/addMobileReview")
  .post(
    // (req, res, next) => {
    //   res.send(req.body);
    // },
    protectRoute,
    preFillUserId,
    handleProductReviewImage,
    processProductReviewImage,
    addProductMobileReview
  );

productReviewRouter.route("/getReviews").get(getProductReviewBasedOnProductId);

productReviewRouter
  .route("/foundHelpful/:bool")
  .post(
    protectRoute,
    preFillUserId,
    preFillReviewHelpulForLikeOrUndo,
    reviewHelpfulPost
  );

productReviewRouter.route("/test").get(averageReviewOfProducts);
