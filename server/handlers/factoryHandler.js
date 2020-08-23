import { AppError } from "../utils/AppError";
import catchAsyncError from "../utils/catchAsyncError";
import { GCloudServices } from "../utils/GCloudService";

const {
  createStorage,
  uploadImage,
  listBuckets,
  storageBucketAssigner,
} = new GCloudServices();

export const uploadSingleImageToGoogle = (bucketName) =>
  catchAsyncError(async (req, res, next) => {
    const bucketsList = await listBuckets();
    if (!bucketsList.includes(bucketName)) {
      await createStorage(bucketName);
    } else {
      console.log(`bucket name : ${bucketName} already exists!!!`);
    }
    const googleStorage = storageBucketAssigner(bucketName);
    const response = await uploadImage(req.files[0], googleStorage);
    res.send(response);
  });
