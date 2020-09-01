import { MobileDetailModel } from "../model/ProductDetailModel";

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
export { preFilldetailedMobileDescription } from "../middleware/preFillers";
export const addDetailForMobile = createNewDocumnet(MobileDetailModel, {
  message: "Mobile Detail Added",
});
