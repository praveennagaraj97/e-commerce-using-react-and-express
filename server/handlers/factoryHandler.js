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

export const readAllDocument = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const response = await ModelName.find();
    if (!response || response.length === 0)
      return next(new AppError("No Document Found", 204));

    res.status(200).json({
      message: responseMessage.message,
      details: response,
    });
  });
