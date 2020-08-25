import { AppError } from "../utils/AppError";

export const preCheckCategoryInputs = (req, res, next) => {
  if (!req.body.categoryName)
    return next(new AppError("Please Enter Category Name", 422));

  next();
};
