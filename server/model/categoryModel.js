import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: [true, "Please Enter Category Name"],
    unique: true,
  },
  categoryIcon: {
    type: String,
    required: [true, "Please Enter Category Icon"],
  },
});

categorySchema.plugin(mongooseUniqueValidator);

const Category = model("Category", categorySchema);

export { Category as default };
