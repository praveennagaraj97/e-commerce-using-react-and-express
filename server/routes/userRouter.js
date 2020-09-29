import { Router } from "express";

import {
  //Protect Routes

  protectRoute,
  accreditReact,
  restrictTo,
  preFillManufacturerWareHouseLocation,
  // User
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  getMe,
  changeUserPassword,
  updateMe,
  addNewManufacturer,

  // Dev Team
  employeeSignIn,
  addDevTeamUser,
} from "../controller/userController";

export const userRouter = Router();

userRouter.route("/signup").post((req, res, next) => {
  req.body.userRole = "user";
  next();
}, signUp);

userRouter.route("/signin").post(signIn);

userRouter.route("/updateme").patch(protectRoute, restrictTo("user"), updateMe);

userRouter.route("/forgotPassword").post(forgotPassword);

userRouter.route("/resetPassword/:token").post(resetPassword);

userRouter.route("/getMe").get(protectRoute, restrictTo("user"), getMe);

userRouter
  .route("/changePassword")
  .post(protectRoute, restrictTo("user", "dev"), changeUserPassword);

// Don't Modify This Route
// Exclusive for FrontEnd Auth.
userRouter.route("/accredit").get(protectRoute, accreditReact);

// Dev team
userRouter.route("/dev/addEmployer").post(
  protectRoute,
  (req, res, next) => {
    req.body.userRole = "dev";
    next();
  },
  addDevTeamUser
);

userRouter.route("/dev/signIn").post(employeeSignIn);

// manufacturer / Seller
userRouter.route("/signUpasManufacturer").post(
  (req, res, next) => {
    req.body.userRole = "manufacturer";
    next();
  },
  preFillManufacturerWareHouseLocation,
  addNewManufacturer
);
