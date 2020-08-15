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
      token,
    });
  });

export const signInHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await ModelName.findOne({ email }).select("+password");

    // Check If User Exists
    if (!user) return next(new AppError(`No user Found With ${email}`, 200));

    // Check Whether Password matches.
    if (!(await user.comparePassword(password, user.password)))
      return next(new AppError("Entered Password is Wrong", 200));

    // If password is correct create New Token And Give Access.
    const token = await generateJWToken({ id: user._id });

    const { message } = responseMessage;

    res.status(202).json({
      message,
      token,
    });
  });
