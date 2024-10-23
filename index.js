const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/dbconnection");

// Routes
const ApiError = require("./utils/apiError");
const glabalError = require("./middlewares/errorMiddleware");
const authRoute = require("./routes/authRoute");
const favoritesRoute = require("./routes/favoritesRoute");
const userRoute = require("./routes/userRoute");

//connect with db
dbConnection();

// express app
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) for all routes
// enable other domains to access your application
app.use(
  cors({
    origin: "*", // Allows all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  })
);

// For pre-flight requests (OPTIONS method)
app.options("*", cors());

// compress all responses
app.use(compression());

// Middleware to parse JSON bodies
app.use(express.json());

// To remove data using these defaults:
app.use(mongoSanitize());
app.use(xss());

// Routes
// mountRoutes(app);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/favorites", favoritesRoute);
app.use("/api/v1/users", userRoute);

app.all("*", (req, res, next) => {
  // create error and send it to error handling middleware
  // const err = new Error(`Can't find this route: ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Error handling middleware
app.use(glabalError);

const PORT = process.env.PORT || 8000;

const server = app.listen(8000, () => {
  console.log(`App running on port ${PORT}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error:${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`shutting down...`);
    process.exit(1);
  });
});
