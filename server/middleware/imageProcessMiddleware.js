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

export const processSingleImage = (imageFilesName) =>
  catchAsyncError(async (req, res, next) => {
    req.body[imageFilesName] = req.imageUrls[0];
    next();
  });
