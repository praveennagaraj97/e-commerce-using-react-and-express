import { Router } from "express";

import {
  //Protect Routes

  protectRoute,
  accreditReact,

  // User
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  getMe,
  changeUserPassword,
  updateMe,
} from "../controller/userController";

export const userRouter = Router();

userRouter.route("/signup").post(signUp);

userRouter.route("/signin").post(signIn);

userRouter.route("/updateme").patch(protectRoute, updateMe);

userRouter.route("/forgotPassword").post(forgotPassword);

userRouter.route("/resetPassword/:token").post(resetPassword);

userRouter.route("/getMe").get(protectRoute, getMe);

userRouter.route("/changePassword").post(protectRoute, changeUserPassword);

// Don't Modify This Route
// Exclusive for FrontEnd Auth.
userRouter.route("/accredit").get(protectRoute, accreditReact);
