import { ProductDetailModel } from "../model/ProductDetailModel";

import { createNewDocumnet } from "../handlers/factoryHandler";
import {
  // Video Processor
  handleVideoUpload,
  processSingleVideo,
} from "../middleware/imageProcessMiddleware";

export const handleMobileDetailVideo = handleVideoUpload(
  1,
  "product-mobile-details-videos"
);
export const processMobileDetailVideo = processSingleVideo("productVideo");
export { preFillProductdetailedDescription } from "../middleware/preFillers";
export const addDetailForMobile = createNewDocumnet(ProductDetailModel, {
  message: "Product Detail Added",
});
