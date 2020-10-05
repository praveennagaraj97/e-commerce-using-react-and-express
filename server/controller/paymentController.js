import { Stripe } from "stripe";

import { Product } from "../model/productModel";
import catchAsyncError from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";

import dotenvConfig from "../config/dotenvConfig";

export { protectRoute } from "./userController";

dotenvConfig();

const stripe = new Stripe(process.env.SECRET_KEY);

export const paymentSession = catchAsyncError(async (req, res, next) => {
  console.log("reached");
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: req.name,
            images: [req.image],
          },
          unit_amount: 100 * req.price,
        },
        quantity: req.quantity,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000`,
    cancel_url: `http://localhost:3000/cart`,
  });
  res.status(200).json({
    id: session.id,
  });
});

export const buyProducts = catchAsyncError(async (req, res, next) => {
  if (requestedProducts.length < 1)
    return next(new AppError("No Products selected", 422));

  const requestedProducts = req.body.products;
  const products = await Product.find({ _id: req.body.products });

  let unit_amount = 0;
  let name = "";
  let image = "";
  let quantity = 0;

  if (requestedProducts.length === 1) {
    unit_amount = products[0].productPrice;
    name = `${products[0].productName}`;
    image = products[0].productCoverImage;
    quantity = 1;
  } else {
    for (let i = 0; i < requestedProducts.length; i++) {
      const product = products.find(({ _id }) => _id == requestedProducts[i]);
      unit_amount += product.productPrice;
      name += `
      ${i + 1 + ")" + product.productName},
      `;
    }
    quantity = requestedProducts.length;
    image =
      "https://blog-assets.lightspeedhq.com/img/2019/12/8c48d7df-retail-purchase-orders.jpg";
  }

  req.price = unit_amount;
  req.name = name;
  req.image = image;
  req.quantity = quantity;
  next();
});
