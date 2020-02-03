const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

/* Load Environment Variables */ dotenv.config({ path: "./config/config.env" });
/* Connect to database */ connectDB();

/* Routes files */
const bootcamps = require("./routes/bootcamps.route");
const courses = require("./routes/courses.route");

const app = express();
/* Body Parser */ app.use(express.json());

// Development Logging Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  // Close Server and Exit Process
  server.close(() => process.exit(1));
});
