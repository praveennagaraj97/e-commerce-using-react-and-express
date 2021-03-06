import dotenvConfig from "./config/dotenvConfig";
import http from "http";
import { resolve } from "path";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import morgon from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";

// apollo-graphql-server

import apolloServer from "./graphql";

import {
  pageNotFoundError,
  unCaughtExceptionErrorHandler,
  globalErrorHandler,
} from "./handlers/errorHandler";

import { userRouter } from "./routes/userRouter";
import { categoryRouter } from "./routes/categoryRouter";
import { productRouter } from "./routes/productRouter";
import { productDetailRouter } from "./routes/productDetailsRouter";
import { productReviewRouter } from "./routes/productReviewRouter";
import { productAdvertisementRouter } from "./routes/productAdvertisementRouter";
import { paymentRouter } from "./routes/paymentRouter";
import { ordersRouter } from "./routes/ordersRouter";

dotenvConfig();
process.on("uncaughtException", unCaughtExceptionErrorHandler);

const app = express();

apolloServer.applyMiddleware({ app });

// Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgon("dev"));
}

// Compression -GZip
// Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app.
app.use(compression());

// Secured Http Headers
app.use(helmet());

// Parameter Pollution (avoiding repeated query)
// WhiteList Can Be Added To Ignore Some query
app.use(
  hpp({
    whitelist: [],
  })
);

// Cross Origin request Service
app.use(
  cors()

  //   {
  //   origin: ["http://localhost:3000","https://testlexa.netlify.app/" ],
  //   optionsSuccessStatus: 200,
  // }
);

// Sanitize Against No-Sql Injection EX :email : { "gt" : '' }
// This will remove $ signs
app.use(mongoSanitize());

// Data Sanitize for html injection
app.use(xss());

// Header x-powered-by Express
app.disable("x-powered-by");

// 130 Requests Per Hour Rate-Limiter
const limiter = rateLimit({
  max: 30,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request Please Try Again After 1 hr",
});

app.use(express.static(resolve(__dirname, "public")));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", resolve(__dirname, "views"));

// Cookie Parser
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.render("apiIntro");
});

app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/product_detail", productDetailRouter);
app.use("/api/v1/product_review", productReviewRouter);
app.use("/api/v1/advertise", productAdvertisementRouter);
app.use("/api/v1/orders", ordersRouter);

if (process.env.NODE_ENV === "production") {
  app.use("/api/v1/user", limiter);
}

app.use("/api/v1/user", userRouter);

app.use("*", pageNotFoundError);

app.use(globalErrorHandler);

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

export { httpServer as app };
