import { ProductDetailModel } from "../model/ProductDetailModel";

import {
  createNewDocumnet,
  updateDocumentByID,
  updateDocumentByField,
} from "../handlers/factoryHandler";
import {
  // Video Processor
  handleVideoUpload,
  processSingleVideo,
} from "../middleware/imageProcessMiddleware";

import { preCheckIfPreviousVideoExistsAndDelete } from "../middleware/preChecks";

// This Controller doesn't have ay get Endpoints
// as this gets called along with get Products endpoint as a virtual Prop

export const handleProductDetailVideo = handleVideoUpload(
  1,
  "product-details-videos"
);
export const processProductDetailVideo = processSingleVideo("productVideo");
export { preFillProductdetailedDescription } from "../middleware/preFillers";
export const addDetailForProduct = createNewDocumnet(ProductDetailModel, {
  message: "Product Detail Added",
});

// Edit Option are limited to certain fields !! to restrict product details being spammed!!!
export { preCheckifProductUpdateDetailVideoHasFileAttached } from "../middleware/preChecks";
export const checkIfVideoExistsAndDeleteBeforeUpdatingNewVideo = preCheckIfPreviousVideoExistsAndDelete(
  ProductDetailModel,
  "product-details-videos",
  "productVideo"
);
export const updateProductDetailVideo = updateDocumentByField(
  ProductDetailModel,
  {
    message: "Product Detail Video Updated",
  }
);
