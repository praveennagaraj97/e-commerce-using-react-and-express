import { Router } from "express";

import {
  //Protect Routes
  protectForReact,
  protectRoutes,
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

userRouter.route("/updateme").patch(protectForReact, protectRoutes, updateMe);

userRouter.route("/forgotPassword").post(forgotPassword);

userRouter.route("/resetPassword/:token").post(resetPassword);

// Don't Modify This Route
// Modifing will cause react app to shut Down.
userRouter.route("/accredit").post(protectForReact, accreditReact);
