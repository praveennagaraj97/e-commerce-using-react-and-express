import catchAsyncError from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";
import { generateJWToken } from "../utils/jsonWebToken";

export const signUpHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const user = await ModelName.create(req.body);
    const token = await generateJWToken({ id: user._id });
    const { message } = responseMessage;
    res.status(201).json({
      message,
      user,
      token,
    });
  });
