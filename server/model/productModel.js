import { model, Schema } from "mongoose";
import mangooseUniqueValidatorPlugin from "mongoose-unique-validator";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Please Enter Product Name"],
      index: true,
    },
    productCoverImage: {
      type: String,
      required: [true, "Please Upload Product Cover Image"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, "Please Enter CategoryId"],
    },
    productPrice: {
      type: Number,
      required: [true, "Please Enter Product Price"],
    },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

productSchema.plugin(mangooseUniqueValidatorPlugin);

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "categoryId",
    model: "Category",
  });

  next();
});

if (process.env.NODE_ENV === "development") {
  productSchema.pre("find", function () {
    this._startTime = Date.now();
  });

  productSchema.post("find", function () {
    if (this._startTime != null) {
      console.log("Query Took : ", Date.now() - this._startTime);
    }
  });
}

export const Product = model("Product", productSchema);
