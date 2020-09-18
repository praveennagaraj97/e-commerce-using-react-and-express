import {
  BaseProductReviewModel,
  MobileReviewModel,
  ReviewHelpful,
} from "../model/productReviewModel";
import { createNewDocumnet, readAllDocument } from "../handlers/factoryHandler";
import { GCS_BUCKET_NAME } from "../constants";

import {
  handleImageUpload,
  processMultipleImages,
} from "../middleware/imageProcessMiddleware";
import { preFillReviewFoundHelpFul } from "../middleware/reviewPreFillers";
import Mongoose from "mongoose";

export { protectRoute } from "./userController";
export { preFillUserId } from "../middleware/preFillers";
// Only SmartPhones!!

const { LEXA_PRODUCT_REVIEWS } = GCS_BUCKET_NAME;

export const handleProductReviewImage = handleImageUpload(
  5,
  LEXA_PRODUCT_REVIEWS,
  true
);
export const processProductReviewImage = processMultipleImages(
  "productReviewImages"
);

export const addProductMobileReview = createNewDocumnet(MobileReviewModel, {
  message: "Thank You for reviewing",
});

export const getProductReviewBasedOnProductId = readAllDocument(
  MobileReviewModel,
  {
    message: "List Of reviews for this Product",
  }
);

export const averageReviewOfProducts = async (productId) => {
  const pipeline = [
    {
      $match: {
        productId: new Mongoose.Types.ObjectId(productId),
      },
    },
    {
      $group: { _id: "$productId", averageReview: { $avg: "$averageReview" } },
    },
  ];

  const averageReviewOfEachProduct = await BaseProductReviewModel.aggregate(
    pipeline
  );

  return averageReviewOfEachProduct;
};

// If the user removes image before sumbitting image has to be deleted
// export const deleteProductReviewImge = deleteFile(LEXA_PRODUCT_REVIEWS);

// Review Helpful Like/Undo

export const preFillReviewHelpulForLikeOrUndo = preFillReviewFoundHelpFul(
  ReviewHelpful,
  {
    message: "Successfully undo",
  }
);
export const reviewHelpfulPost = createNewDocumnet(ReviewHelpful, {
  message: "Success",
});
