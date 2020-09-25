import { Router } from "express";

import {
  //Protect Routes

  protectRoute,
  accreditReact,
  restrictTo,

  // User
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  getMe,
  changeUserPassword,
  updateMe,

  // Dev Team
  addDevTeamUser,
  employeeSignIn,
} from "../controller/userController";

export const userRouter = Router();

userRouter.route("/signup").post((req, res, next) => {
  req.body.userRole = undefined;
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
userRouter.route("/dev/addEmployer").post(protectRoute, addDevTeamUser);

userRouter.route("/dev/signIn").post(employeeSignIn);
