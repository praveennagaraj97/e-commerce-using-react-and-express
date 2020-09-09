import catchAsyncError from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";
import { generateJWToken, verifyJWToken } from "../utils/jsonWebToken";
import { Email } from "../utils/mailer";

export const signUpHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const user = await ModelName.create(req.body);

    const token = await generateJWToken({ id: user._id }, req.body.expiresIn);

    const mailOptions = {
      email: user.email,
      username: user.name,
    };

    let url;
    process.env.NODE_ENV === "production"
      ? (url = `${process.env.DEPLOY_LINK}`)
      : (url = `${process.env.LOCAL_DEPLOY_LINK}`);

    await new Email(mailOptions, url).sendWelcome();

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

export const protectRoute = (ModelName) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.headers.authorization)
      return next(new AppError("Please Login First", 401));
    if (req.headers.authorization) {
      if (!req.headers.authorization.startsWith("Bearer")) {
        return next(new AppError("You are not logged In", 401));
      }
    }
    console.log(req.headers.authorization);

    const auth_token = req.headers.authorization.split("Bearer ")[1];

    const tokenDetails = await verifyJWToken(auth_token);

    const user = await ModelName.findById(tokenDetails.id);
    // if user account is deleted
    if (!user) return next(new AppError("No User Found", 401));

    req.user = user;
    next();
  });

export const updateUserDetails = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const user = await ModelName.findByIdAndUpdate(req.user._id, req.body, {
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      context: "query",
      new: true,
    });

    if (!user) return next(new AppError("No User Found with given Id", 404));

    res.status(200).json({
      responseMessage,
      newDetails: user,
    });
  });

export const forgotPasswordHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const user = await ModelName.findOne({ email: req.body.email });
    if (!user)
      return next(new AppError(`No User Found with ${req.body.email}`, 404));

    const resetToken = await user.createUserResetPasswordToken(user._id);

    let url;
    process.env.NODE_ENV === "production"
      ? (url = `${process.env.DEPLOY_PASSWORD_RESET_LINK}/${resetToken}`)
      : (url = `${process.env.LOCAL_DEPLOY_PASSWORD_RESET_LINK}/${resetToken}`);

    const mailOptions = {
      email: user.email,
      username: user.name,
    };

    await new Email(mailOptions, url).sendResetPassword();

    if (process.env.NODE_ENV === "development") {
      responseMessage.resetToken = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/user/resetPassword/${resetToken}`;
    }

    res.send(responseMessage);
  });

export const resetPasswordHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.body.password || !req.body.confirmPassword)
      return next(new AppError("Provide Password and Confirm Password!!", 422));

    if (req.body.password !== req.body.confirmPassword)
      return next(new AppError("Password didn't match !!", 422));
    const user = await ModelName.findOne({
      "resetToken.token": req.params.token,
    }).select("+password +resetToken");

    if (!user) return next(new AppError("User Token Invalid", 403));

    if (user.resetToken.timeStamp < Date.now())
      return next(new AppError("Reset Token Expired"));

    if (await user.comparePassword(req.body.password, user.password))
      return next(
        new AppError("password is same as Previous password!!!", 418)
      );

    user.password = req.body.password;
    user.resetToken = undefined;

    await user.save({ validateBeforeSave: true });
    const token = await generateJWToken({ id: user._id }, req.body.expiresIn);

    responseMessage.token = token;
    res.status(202).json(responseMessage);
  });

// Seller
export const createSellerAccount = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    req.body.warehouseLocation = req.body.warehouseLocation
      .split(",")
      .map((each) => Number(each));
    const sellerData = { ...req.body };

    sellerData.userId = req.user._id;

    delete sellerData.warehouseLocation;

    sellerData.warehouseLocation = {
      type: "Point",
      coordinates: req.body.warehouseLocation,
    };

    const seller = await ModelName.create(sellerData);
    res.send(seller);
  });
