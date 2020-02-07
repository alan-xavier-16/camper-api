const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for developer
  console.log(err);

  // Mongoose Invalid ObjectId - CastError
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose Duplicate Key - unique keyword in Models
  if (err.code && err.code === 11000) {
    const message = Object.keys(err.keyValue).map(
      field => `Duplicate field value entered at ${field}`
    );
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Validation Errors - ValidationError
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
