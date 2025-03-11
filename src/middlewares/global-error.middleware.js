import config from "../../config/config.js";

const sendErrorToDevelopment = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    errors: err.errors || undefined,
    isOperational: err.isOperational,
    stack: err.stack, // Show stack only in dev mode
  });
};

const sendErrorToProduction = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || undefined,
    });
  }

  // Programming or other unknown error: don't leak error details
  console.error(`ERROR : ${err.name} - ${err.message}`);
  return res.status(500).json({
    message: "Something went wrong",
    status: "error",
    statusCode: 500,
  });
};

const globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (config.NODE_ENV === "production") {
    sendErrorToProduction(err, res);
  } else {
    sendErrorToDevelopment(err, res);
  }
};

export { globalErrorHandler };
