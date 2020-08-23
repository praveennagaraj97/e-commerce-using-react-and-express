import { Router } from "express";

import { testController } from "../controller/productController";

export const productRouter = Router();

productRouter.get("/test", testController);
