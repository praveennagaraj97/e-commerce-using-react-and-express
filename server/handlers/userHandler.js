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

// This is Actually an Middleware
// Make sure pass auth_token with req body wherever protected routes are called
export const protectForReact = (ModelName) =>
  catchAsyncError(async (req, res, next) => {
    // If Request is from Express/Postman API
    if (req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer")) return next();
    }

    const { auth_token } = req.body;
    if (!auth_token) {
      return res.status(200).json({
        message: "Auth Token Not Found|Bearer Token Not Found",
      });
    }
    // As it is a Promise if token is expired server will respond with error
    // and our async error catcher will catch that.
    let verified = true;
    let tokenDetails;
    if (auth_token) {
      tokenDetails = await verifyJWToken(auth_token);
    } else {
      verified = false;
    }

    const user = await ModelName.findById(tokenDetails.id);
    // if user account is deleted
    if (!user) return next(new AppError("Token Not Valid", 401));

    // This is to Tell Our API protect Routes That Token Exists
    // So we can Skip Writing one more middleware.
    // req.bearerfromReact
    req.fromReact = true;
    req.user = user;
    req.bearerfromReact = auth_token;
    req.tokenDetails = tokenDetails;
    req.verified = verified;
    next();
  });

export const protectRoute = (ModelName) =>
  catchAsyncError(async (req, res, next) => {
    // If the token is from react app authenticate the use as token is already verified
    if (req.fromReact) {
      return next();
    }

    if (!req.headers.authorization)
      return next(new AppError("Please Login First", 401));
    if (req.headers.authorization) {
      if (!req.headers.authorization.startsWith("Bearer")) {
        return next(new AppError("You are not logged In", 401));
      }
    }

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

export const forgotPassword = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const user = await ModelName.findOne({ email: req.body.email });
    if (!user)
      return next(new AppError(`No User Found with ${req.body.email}`));
  });

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
