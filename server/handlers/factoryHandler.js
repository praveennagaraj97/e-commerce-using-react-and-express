import { AppError } from "../utils/AppError";
import catchAsyncError from "../utils/catchAsyncError";

export const createNewDocumnet = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const response = await ModelName.create(req.body);
    if (!response) return next(new AppError("request failed", 422));

    res.status(201).json({
      message: responseMessage.message,
      details: response,
    });
  });
