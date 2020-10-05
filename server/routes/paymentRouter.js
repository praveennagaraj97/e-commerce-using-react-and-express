import Axios from "axios";
import { Router } from "express";
import RazorPay from "razorpay";

export const paymentRouter = Router();

const keys = {
  key_id: "rzp_test_kiej2SO1habocZ",
  key_secret: "liipX3bLgYv7rmsb9IjBcvjw",
};

const razorInstance = new RazorPay(keys);

paymentRouter.route("/order").post(async (req, res, next) => {
  const options = {
    amount: 10 * 100,
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: 0,
  };

  razorInstance.orders.create(options, async (err, order) => {
    if (err) {
      res.send(err);
      return;
    }

    res.send(order);
  });
});

paymentRouter.route("/capture/:paymentId").post(async (req, res, next) => {
  const paymentOptions = {
    amount: 10 * 100,
    currency: "INR",
  };

  try {
    const response = await Axios.post(
      `https://${keys.key_id}:${keys.key_secret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
      paymentOptions
    );
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});
