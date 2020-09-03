import { AppError } from "../utils/AppError";
import catchAsyncError from "../utils/catchAsyncError";

export const preFillCartIdasParams = (req, res, next) => {
  if (!req.body.cartItems || req.body.cartItems.length === 0)
    return next(new AppError("Provide Cart List of Product Ids", 422));

  req.query.listOfRecords = req.body.cartItems;
  next();
};

export const preFilldetailedMobileDescription = (req, res, next) => {
  const technicalDetails = {
    display: req.body.display,
    capacity: req.body.capacity,
    resistant: req.body.resistant,
    camAndVideo: req.body.camAndVideo,
    frontCamera: req.body.frontCamera,
    powerAndBattery: req.body.powerAndBattery,
    intheBox: req.body.intheBox,
    warranty: req.body.warranty,
    height: req.body.height,
    width: req.body.width,
    depth: req.body.depth,
    weight: req.body.weight,
  };
  req.body.productId = req.body.productId.split(",");

  req.body.featuresList = JSON.parse(req.body.featuresList);
  req.body.technicalDetails = technicalDetails;

  next();
};
