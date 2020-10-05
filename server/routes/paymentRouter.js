import { Router } from "express";

import {
  buyProducts,
  paymentSession,
  protectRoute,
} from "../controller/paymentController";

export const paymentRouter = Router();

paymentRouter
  .route("/buyProducts")
  .post(protectRoute, buyProducts, paymentSession);
