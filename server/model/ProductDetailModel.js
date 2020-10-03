import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const productDetailSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  manufacturerId: {
    type: Schema.Types.ObjectId,
    required: [true, "please Enter Manufacture Id"],
  },
  featuresList: {
    type: [String],
    required: [true, "Enter List Of Feature for this Mobile"],
  },
  productVideo: {
    type: String,
  },
  productDetails: {
    type: Object,
  },
});

productDetailSchema.plugin(mongooseUniqueValidator);

productDetailSchema.pre(/^find/, function (next) {
  this.populate({
    path: "manufacturerId",
    model: "User",
  });
  next();
});

export const ProductDetailModel = model("ProductDetail", productDetailSchema);
