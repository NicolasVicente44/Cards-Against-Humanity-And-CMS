// Importing the 'express' framework for building the web application
import express from "express";
// Importing the 'dotenv' library for handling environment variables
import dotenv from "dotenv";
// Importing setup functions for MongoDB, routes, and Passport authentication
import MongooseSetup from "./lib/MongooseSetup.js";
import RoutesSetup from "./lib/RoutesSetup.js";
import PassportSetup from "./lib/PassportSetup.js";
// Importing the 'express-session' middleware for session management
import session from "express-session";

// Loading environment variables from the '.env' file
dotenv.config();

// Setting up MongoDB connection using the imported function
MongooseSetup();

// Creating an instance of the express application
const app = express();

// Configuring session middleware for managing user sessions and adding secret key for user encryption
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    },
  })
);

// Calling Passport setup method to configure authentication
PassportSetup(app);

// Setting EJS as the view engine and configuring other application settings
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using middleware to handle the '_method' property for HTTP method override
app.use((req, _, next) => {
  if (req.body && typeof req.body === "object" && "_method" in req.body) {
    const method = req.body._method;

    delete req.body._method;

    req.method = method;
  }

  next();
});

// Setting up routes using the imported function
RoutesSetup(app);

// Error handler middleware to handle and log errors
app.use((error, _, res, __) => {
  // If the error is a string, convert it to an Error object
  if (typeof error === "string") {
    error = new Error(error);
  }

  // If the error has no status, set it to 404 (Not Found)
  if (!error.status) error.status = 404;

  // Logging the error to the console
  console.error(error);

  // Sending the appropriate HTTP status and error message in the response
  res.status(error.status).send(error.message);
});

// Exporting the configured express application
export default app;
