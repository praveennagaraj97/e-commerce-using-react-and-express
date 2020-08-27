import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Please Enter Category Name"],
      unique: true,
    },
    categoryIcon: {
      type: String,
      required: [true, "Please Enter Category Icon"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    versionKey: false,
  }
);

categorySchema.plugin(mongooseUniqueValidator);

categorySchema.virtual("productsList", {
  ref: `Product`,
  localField: `_id`,
  foreignField: `categoryId`,
});

categorySchema.pre(/^find/, function (next) {
  this.populate("productsList");
  next();
});

const Category = model("Category", categorySchema);

export { Category as default };
