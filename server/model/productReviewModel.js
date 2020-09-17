import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

// Only review can be given by user for one product!

const baseProductReviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, "Provide Provide Id on which you are reviewing"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "Provide User Id"],
      validate: {
        validator: async function (val) {
          const review = await BaseProductReviewModel.findOne({
            userId: val,
            productId: this.productId,
          });
          if (review) {
            return String(review.productId) !== String(this.productId);
          } else return true;
        },
        message: "You can only review once",
      },
    },
    title: {
      type: String,
      validate: {
        validator: function (val) {
          return String(val).length > 3;
        },
        message: "Enter Valid Title",
      },
    },
    description: {
      type: String,
      validate: {
        validator: function (val) {
          return String(val).length > 10;
        },
        message: "Description should be atleast 10 letters",
      },
    },

    productReviewImages: {
      type: [String],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

baseProductReviewSchema.plugin(mongooseUniqueValidator);

baseProductReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    model: "User",
    select: ["name"],
  });

  next();
});

export const BaseProductReviewModel = model(
  "ProductReview",
  baseProductReviewSchema
);

const mobileReviewSchema = new Schema({
  faceRecognition: {
    type: Number,
    max: 5,
    min: 1,
    required: [true, "Mobile Must contain Face Recognition review"],
    select: false,
  },
  cameraQuality: {
    type: Number,
    max: 5,
    min: 1,
    select: false,
    required: [true, "Mobile Must contain Camera Quality review"],
  },
  pictureQuality: {
    type: Number,
    max: 5,
    min: 1,
    select: false,
    required: [true, "Mobile Must contain Picture Quality review"],
  },
  screenQuality: {
    type: Number,
    max: 5,
    min: 1,
    select: false,
    required: [true, "Mobile Must contain Screen Quality review"],
  },
  soundQuality: {
    type: Number,
    max: 5,
    min: 1,
    select: false,
    required: [true, "Mobile Must contain Sound Quality review"],
  },
  batteryLife: {
    type: Number,
    max: 5,
    min: 1,
    select: false,
    required: [true, "Mobile Must contain Battery Life  review"],
  },
  valueForMoney: {
    type: Number,
    max: 5,
    min: 1,
    select: false,
    required: [true, "Mobile Must contain Value For Money review"],
  },
  averageReview: {
    type: Number,
  },
});

mobileReviewSchema.pre("save", function (next) {
  this.averageReview =
    (this.faceRecognition +
      this.batteryLife +
      this.valueForMoney +
      this.screenQuality +
      this.soundQuality +
      this.pictureQuality +
      this.cameraQuality) /
    7;
  next();
});

export const MobileReviewModel = BaseProductReviewModel.discriminator(
  "MobileReview",
  mobileReviewSchema
);
