import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve("config", "config.env") });

export const pageNotFoundError = (req, res, next) => {
  res.status(404).json({
    message: "Page Not Found",
  });
};

// Unhandled and Uncaught Exceptions
export const serverCloser = (server, mongooseConnection) =>
  server.close(() => {
    mongooseConnection.close();
    console.log("Server Closed");
  });

//   UnCaught Exception Handler
export const unCaughtExceptionErrorHandler = (err) => {
  console.log(err.name, err.message);
  console.log(err);
};

const handleMongoError = (errName) => {
  if (errName === "ValidationError") {
    return {
      errCode: 422,
    };
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message;
  err.stack = err.stack;

  if (err.name === "ValidationError") {
    const error = handleMongoError(err.name);
    err.statusCode = error.errCode;
  }

  if (err.name === "JsonWebTokenError") {
    err.statusCode = 203;
    err.message = "nothing to show";
  }

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      message: err.message,
      occuredAt: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    res.status(err.statusCode).json({
      message: err.message,
    });
  }
};

console.log(process.env.NODE_ENV);
