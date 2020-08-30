import { Router } from "express";
import multer from "multer";

import {
  // create
  preCheckCategoryInputs,
  getCatgoryImageProcessed,
  categoryImageLink,
  createNewCategory,

  // Fetch all categories
  getAllCategories,
  updateCategory,
} from "../controller/categoriesController";

export const categoryRouter = Router();

const upload = multer();

// Public Routes
categoryRouter.route("/getAllCategories").get(getAllCategories);

// Developers Only Routes..
categoryRouter
  .use(upload.array("categoryImage"))
  .route("/dev/addNewCategory")
  .post(
    preCheckCategoryInputs,
    getCatgoryImageProcessed,
    categoryImageLink,
    createNewCategory
  );

categoryRouter.route("/dev/:id/updateCategory").patch(updateCategory);
