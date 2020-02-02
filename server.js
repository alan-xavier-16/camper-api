const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

/* Load Environment Variables */ dotenv.config({ path: "./config/config.env" });
/* Connect to database */ connectDB();

/* Routes files */ const bootcamps = require("./routes/bootcamps");
const app = express();

// Development Logging Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`);
  // Close Server and Exit Process
  server.close(() => process.exit(1));
});
