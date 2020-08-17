import { Router } from "express";

import {
  signUp,
  signIn,
  protectForReact,
  accreditReact,
} from "../controller/userController";

export const userRouter = Router();

userRouter.route("/signup").post(signUp);

userRouter.route("/signin").post(signIn);

// Don't Modify This Route
// Modifing will cause react app to shut Down.
userRouter.route("/accredit").post(protectForReact, accreditReact);
