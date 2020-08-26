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

export const updateDocumentByID = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (!Object.keys(req.body).length)
      return next(new AppError("Document Not Changed As No Values Given", 304));

    console.log(req.params);
    console.log(req.body);

    const docx = await ModelName.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      context: "query",
      new: true,
    });

    if (!docx)
      return next(
        new AppError(`Document with ${req.params.id} is not Found`, 500)
      );

    responseMessage.document = docx;
    responseMessage.updatedValue = req.body;
    res.status(202).json(responseMessage);
  });
