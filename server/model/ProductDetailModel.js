import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const mobileDetailSchema = new Schema({
  // Irrespitive of the mobile sub-type the details applies to all model,
  //   For this Ids Same details will be Shown
  productId: {
    type: [Schema.Types.ObjectId],
    required: [
      true,
      "productId needs to be provided in order to Get This details, at time of querying!",
    ],
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
    required: [true, "Provide at lease 1 video detailing about the Mobile"],
  },
  technicalDetails: {
    display: {
      type: String,
      required: [true, "Provide Display Information"],
    },
    capacity: {
      type: String,
      required: [true, "Provide Mobile Capacity"],
    },
    resistant: {
      type: String,
      default: "N/A",
    },
    camAndVideo: {
      type: String,
    },
    frontCamera: {
      type: String,
    },
    powerAndBattery: {
      type: String,
      required: [true, "Provide battery Info"],
    },
    intheBox: {
      type: String,
      required: [true, "Provide The Contents of Mobile Containing in the Box"],
    },
    warranty: {
      type: String,
      required: [true, "Provide warrenty Info"],
    },
    height: {
      type: String,
      required: [true, "Provide Height Info of device"],
    },
    width: {
      type: String,
      required: [true, "Provide Width Info of device"],
    },
    depth: {
      type: String,
      required: [true, "Provide Depth Info of device"],
    },
    weight: {
      type: String,
      required: [true, "Provide Weight Info of device"],
    },
  },
});

mobileDetailSchema.plugin(mongooseUniqueValidator);

mobileDetailSchema.pre(/^find/, function (next) {
  this.populate({
    path: "manufacturerId",
    model: "ProductManufacturer",
  });
  next();
});

export const MobileDetailModel = model("Mobile", mobileDetailSchema);
