import { model, Schema } from "mongoose";
import { isEmail } from "validator";
import { hash, compare } from "bcrypt";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide Name !"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email !"],
      validate: {
        validator: function (val) {
          return isEmail(val);
        },
        message: "Please Enter a valid Email Address",
      },
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please Enter Phone Number"],
      validate: {
        validator: function (val) {
          return String(val).length === 10 && String(val).charAt(0) > 6;
        },
        message: "Enter Valid Number",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      select: false,
    },

    confirmPassword: {
      type: String,
      required: [true, "Please Confirm Your Password"],
      select: false,
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: "Password Didn't match!",
      },
    },
    accountActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
    timestamps: true,
  }
);

// Plugin to show Dupl
userSchema.plugin(mongooseUniqueValidator);

userSchema.pre(/save/, async function (next) {
  this.accountActive = true;

  this.password = await hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.pre("find", function (next) {
  this.find({ accountActive: { $ne: false } });
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  this.find({ accountActive: { $ne: true } });

  next();
});

// Decrypt Password
userSchema.methods.comparePassword = async function (
  inputPassword,
  dbStoredPassword
) {
  return await compare(inputPassword, dbStoredPassword);
};

export const User = model("User", userSchema);
