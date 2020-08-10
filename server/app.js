import dotenvConfig from "./config/dotenvConfig";
dotenvConfig();
import { resolve } from "path";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";

import {
  pageNotFoundError,
  unCaughtExceptionErrorHandler,
} from "./handlers/errorHandler";

process.on("uncaughtException", unCaughtExceptionErrorHandler);

const app = express();
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
  max: 130,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request Please Try Again After 1 hr",
});

app.use(express.static(resolve(__dirname, "public")));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send(
    "<h1>Welcome , <br/> This is an API Build for Learning Purpose! <br/> By Praveen Nagaraj </h1>"
  );
});

app.use("*", pageNotFoundError);

export default app;
