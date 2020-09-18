import { AppError } from "../utils/AppError";
import catchAsyncError from "../utils/catchAsyncError";

export const preFillCartIdasParams = (req, res, next) => {
  if (!req.body.cartItems || req.body.cartItems.length === 0)
    return next(new AppError("Provide Cart List of Product Ids", 422));

  req.query.listOfRecords = req.body.cartItems;
  next();
};

export const preFillProductdetailedDescription = (req, res, next) => {
  if (!req.body.featuresList)
    return next(new AppError("Provide List Of Features as array!!!", 422));

  if (!req.body.productId)
    return next(
      new AppError("Provide at least 1 or group of productIds!!!", 422)
    );

  if (!req.body.manufacturerId)
    return next(new AppError("Provide a manufacturerId", 422));

  const inputValues = { ...req.body };
  const technicalDetails = inputValues;

  req.body.productId = technicalDetails.productId.split(",");
  req.body.featuresList = JSON.parse(technicalDetails.featuresList);
  req.body.manufacturerId = technicalDetails.manufacturerId;
  delete technicalDetails.productId;
  delete technicalDetails.featuresList;
  delete technicalDetails.manufacturerId;
  req.body.productDetails = technicalDetails;

  next();
};

export const preFillProductBoards = (req, res, next) => {
  req.body.productId = req.body.productId.split(",");
  next();
};

export const preFillUserId = (req, res, next) => {
  req.body.userId = req.user._id;
  next();
};

export const preFillReviewFoundHelpFul = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (req.params.bool === "true") {
      req.body.helpul = req.params.bool;
      next();
    } else {
      // find the doc and remove it!
      await ModelName.findOneAndDelete({ userId: req.user._id });
      res.status(200).json({
        message: responseMessage.message,
      });
    }
  });
