import { averageReviewOfProducts } from "../../controller/productReviewController";
import { AppError } from "../../utils/AppError";
import catchAsyncError from "../../utils/catchAsyncError";

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

export const getAllProductsWithAverageReviewAttached = catchAsyncError(
  async (req, res, next) => {
    /**
     * @desc - as limit of each request is set to max-10 items
     *         performace doesn't get affected as aggregation pipeline is used!
     * @requires - this middleware needs to be changed on model fields chanege or virtual fields added
     */
    const ids = [];
    for (let i = 0; i < req.details.length; i++) {
      ids.push(req.details[i]._id);
    }
    const averageReview = await averageReviewOfProducts(ids);

    const details = [];

    for (let j = 0; j < req.details.length; j++) {
      const response = req.details[j];
      details.push({
        _id: response._id,
        productName: response.productName,
        categoryId: {
          _id: response.categoryId._id,
          categoryName: response.categoryId.categoryName,
          categoryIcon: response.categoryId.categoryIcon,
          id: response.categoryId.id,
        },
        productPrice: response.productPrice,
        productCoverImage: response.productCoverImage,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
        id: response.id,
        averageReview: averageReview.filter(
          (each) => String(each._id) === String(response._id)
        ),
      });
    }

    res.status(200).json({
      foundResults: req.details.length,
      message: req.message,
      details,
    });
  }
);
