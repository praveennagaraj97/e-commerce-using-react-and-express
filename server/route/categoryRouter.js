import { Router } from "express";
import {
  createNewCategory,
  getCatgoryImageProcessed,
  categoryImageLink,
} from "../controller/categoriesController";
import { multerSetup } from "../utils/multerSetup";

export const categoryRouter = Router();

// Developers Only..

categoryRouter
  .use(multerSetup().array("categoryImage"))
  .route("/dev/addNewCategory")
  .post(getCatgoryImageProcessed, categoryImageLink, createNewCategory);
