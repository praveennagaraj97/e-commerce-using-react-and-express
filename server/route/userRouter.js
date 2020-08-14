import { Router } from "express";

import { signUp, signIn } from "../controller/userController";

export const userRouter = Router();

userRouter.route("/signup").post(signUp);

userRouter.route("/signin").post(signIn);
