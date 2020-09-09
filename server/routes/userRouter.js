import { Router } from "express";

import {
  //Protect Routes

  protectRoute,
  accreditReact,

  // User
  signUp,
  signIn,
  updateMe,
  forgotPassword,
  resetPassword,
} from "../controller/userController";

export const userRouter = Router();

userRouter.route("/signup").post(signUp);

userRouter.route("/signin").post(signIn);

userRouter.route("/updateme").patch(protectRoute, updateMe);

userRouter.route("/forgotPassword").post(forgotPassword);

userRouter.route("/resetPassword/:token").post(resetPassword);

// Don't Modify This Route
// Exclusive for FrontEnd Auth.
userRouter.route("/accredit").get(protectRoute, accreditReact);
