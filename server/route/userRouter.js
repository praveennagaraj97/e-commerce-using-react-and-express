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

  // Seller Account
  becomeSeller,
} from "../controller/userController";

export const userRouter = Router();

userRouter.route("/signup").post(signUp);

userRouter.route("/signin").post(signIn);

userRouter.route("/updateme").patch(protectForReact, protectRoutes, updateMe);

// Seller
userRouter
  .route("/signup/seller")
  .post(protectForReact, protectRoutes, becomeSeller);

// Don't Modify This Route
// Modifing will cause react app to shut Down.
userRouter
  .route("/accredit")
  .post(protectForReact, protectRoutes, accreditReact);
