import dotenvConfig from "./config/dotenvConfig";
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

import {
  pageNotFoundError,
  unCaughtExceptionErrorHandler,
  globalErrorHandler,
} from "./handlers/errorHandler";

import { userRouter } from "./route/userRouter";
import { categoryRouter } from "./route/categoryRouter";
import { productRouter } from "./route/productRouter";

dotenvConfig();
process.on("uncaughtException", unCaughtExceptionErrorHandler);

const app = express();

// Logger
app.use(morgon("dev"));

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
app.use(cors());

// Sanitize Against No-Sql Injection EX :email : { "gt" : '' }
// This will remove $ signs
app.use(mongoSanitize());

// Data Sanitize for html injection
app.use(xss());

// 130 Requests Per Hour Rate-Limiter
const limiter = rateLimit({
  max: 30,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request Please Try Again After 1 hr",
});

app.use(express.static(resolve(__dirname, "public")));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.send(`<h1>Lexa Ecommerce Api Build By</h1>
  <h3>Praveen Nagaraj</h3>`);
});

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

app.use("/api/v1/user", limiter);
app.use("/api/v1/user", userRouter);

app.use("*", pageNotFoundError);

app.use(globalErrorHandler);

export default app;
