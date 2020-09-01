import catchAsyncError from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";
import { uploadImageToGoogle } from "../utils/GCloudStorageService";

export const handleImageUpload = (imageCount, bucketName) =>
  catchAsyncError(async (req, res, next) => {
    if (req.files.length > imageCount)
      return next(
        new AppError(`This request takes maximum of ${imageCount} images!.`)
      );
    if (req.files.length < imageCount)
      return next(
        new AppError(`This request takes minimum of ${imageCount} images!.`)
      );

    const imageUrls = [];
    const files = [];
    for (let i = 0; i < imageCount; i++) {
      const validImage = /\.(gif|jpe?g|png)$/i.test(req.files[i].originalname);

      if (!validImage) {
        return next(
          new AppError("Cannot Process File of non Image Format", 422)
        );
      }
      files.push(req.files[i]);
    }

    for (let i = 0; i < imageCount; i++) {
      const url = await uploadImageToGoogle(files[i], bucketName);
      imageUrls.push(url);
    }

    req.imageUrls = imageUrls;
    next();
  });

export const handleVideoUpload = (videoCount, bucketName) =>
  catchAsyncError(async (req, res, next) => {
    if (req.files.length > videoCount)
      return next(
        new AppError(`This request takes maximum of ${videoCount} Videos!.`)
      );
    if (req.files.length < videoCount)
      return next(
        new AppError(`This request takes minimum of ${videoCount} Videos!.`)
      );

    const videoUrls = [];
    const files = [];
    for (let i = 0; i < videoCount; i++) {
      const validImage = /\.(mp4|mkv|wmv|mov)$/i.test(
        req.files[i].originalname
      );

      if (!validImage) {
        return next(
          new AppError(
            "Cannot Process File of non Video Format- Available Formats : mp4|mkv|wmv|mov ",
            422
          )
        );
      }
      files.push(req.files[i]);
    }

    for (let i = 0; i < videoCount; i++) {
      const url = await uploadImageToGoogle(files[i], bucketName);
      videoUrls.push(url);
    }

    req.videoUrls = videoUrls;
    next();
  });

export const processSingleImage = (imageFieldName) =>
  catchAsyncError(async (req, res, next) => {
    req.body[imageFieldName] = req.imageUrls[0];
    next();
  });

export const processSingleVideo = (videoFieldName) =>
  catchAsyncError(async (req, res, next) => {
    req.body[videoFieldName] = req.videoUrls[0];
    next();
  });

export const processMultipleImages = (imagesFieldName) =>
  catchAsyncError(async (req, res, next) => {
    req.body[imagesFieldName] = req.imageUrls;
    next();
  });
