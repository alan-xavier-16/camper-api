const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

/* Load Environment Variables */ dotenv.config({ path: "./config/config.env" });
/* Connect to database */ connectDB();

/* Routes files */
const bootcamps = require("./routes/bootcamps.route");
const courses = require("./routes/courses.route");
const auth = require("./routes/auth.route");
const users = require("./routes/users.route");

const app = express();
/* Body Parser */ app.use(express.json());
/* Cookie Parser */ app.use(cookieParser());

// Development Logging Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File Upload Middleware
app.use(fileupload());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);

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
