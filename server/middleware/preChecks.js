import { AppError } from "../utils/AppError";
import catchAsyncError from "../utils/catchAsyncError";

export const preCheckCategoryInputs = (req, res, next) => {
  if (!req.body.categoryName)
    return next(new AppError("Please Enter Category Name", 422));

  next();
};

export const preCheckIfUserIsSeller = (ModeName) =>
  catchAsyncError(async (req, res, next) => {});
