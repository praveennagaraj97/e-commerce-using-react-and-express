import { MobileReviewModel } from "../model/productReviewModel";
import { createNewDocumnet } from "../handlers/factoryHandler";
import { GCS_BUCKET_NAME } from "../constants";

import {
  handleImageUpload,
  processSingleImage,
} from "../middleware/imageProcessMiddleware";

import { deleteFile } from "../utils/GCloudStorageService";

export { protectRoute } from "./userController";
export { preFillUserId } from "../middleware/preFillers";
// Only SmartPhones!!

const { LEXA_PRODUCT_REVIEWS } = GCS_BUCKET_NAME;

export const handleProductReviewImage = handleImageUpload(
  1,
  LEXA_PRODUCT_REVIEWS
);
export const processProductReviewImage = processSingleImage(
  "productReviewImages"
);

export const addProductMobileReview = createNewDocumnet(MobileReviewModel, {
  message: "Thank You for reviewing",
});

// If the user removes image before sumbitting image has to be deleted
// export const deleteProductReviewImge = deleteFile(LEXA_PRODUCT_REVIEWS);
