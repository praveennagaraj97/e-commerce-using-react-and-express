import catchAsyncError from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";
import {
  generateJWToken,
  verifyJWToken,
  isJWTokenValid,
} from "../utils/jsonWebToken";

export const signUpHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const user = await ModelName.create(req.body);

    const token = await generateJWToken({ id: user._id }, req.body.expiresIn);
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
    if (!user) return next(new AppError(`No user Found With ${email}`, 401));

    // Check Whether Password matches.
    if (!(await user.comparePassword(password, user.password)))
      return next(new AppError("Entered Password is Wrong", 401));

    // If password is correct create New Token And Give Access.
    const token = await generateJWToken({ id: user._id }, req.body.expiresIn);

    const { message } = responseMessage;

    res.status(202).json({
      message,
      token,
    });
  });

// This is Actually an Middleware
export const protectForReact = catchAsyncError(async (req, res, next) => {
  const { auth_token } = req.body;
  // As it is a Promise if token is expired server will respond with error
  // and our async error catcher will catch that.
  await verifyJWToken(auth_token);
  // This is to Tell Our API protect Routes That Token Exists
  // So we can Skip Writing one more middleware.
  // req.bearerfromReact
  req.bearerfromReact = auth_token;
  next();
});
