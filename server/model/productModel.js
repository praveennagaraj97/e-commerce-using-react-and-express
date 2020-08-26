// import { model, Schema } from "mongoose";
// import mangooseUniqueValidatorPlugin from "mongoose-unique-validator";

// const productSchema = new Schema(
//   {
//     productName: {
//       type: String,
//       required: [true, "Please Enter Product Name"],
//     },
//     productCoverImage: {
//       type: String,
//       required: [true, "Please Upload Product Cover Image"],
//     },
//     categoryId: {
//       type: Schema.Types.ObjectId,
//       required: [true, "Please Enter CategoryId"],
//     },
//     sellerId: {
//       type: Schema.Types.ObjectId,
//       required: [true, "Please Enter sellerId"],
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//     toJSON: {
//       virtuals: true,
//     },
//     toObject: {
//       virtuals: true,
//     },
//   }
// );

// productSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "categoryId",
//     model: "Category",
//   }).populate({
//     path: "sellerId",
//     model: "Seller",
//   });
// });

// productSchema.plugin(mangooseUniqueValidatorPlugin);
