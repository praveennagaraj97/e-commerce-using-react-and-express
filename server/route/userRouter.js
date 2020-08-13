import { Router } from "express";

import { signUp } from "../controller/userController";

export const userRouter = Router();

userRouter.route("/signup").post(signUp);
