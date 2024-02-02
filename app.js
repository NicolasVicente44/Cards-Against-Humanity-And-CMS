import express from "express";
import dotenv from "dotenv";
import MongooseSetup from "./lib/MongooseSetup.js";
import RoutesSetup from "./lib/RoutesSetup.js";
import PassportSetup from "./lib/PassportSetup.js";

dotenv.config();

MongooseSetup();

const app = express();

//call passport setup method for project auth
PassportSetup(app);

//set ejs, view engine and other configurations
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use middleware, in this case ...
app.use((req, _, next) => {
  if (req.body && typeof req.body === "object" && "_method" in req.body) {
    const method = req.body._method;

    delete req.body._method;

    req.method = method;
  }

  next();
});

RoutesSetup(app);

// Error handler middleware
app.use((error, _, res, __) => {
  if (typeof error === "string") {
    error = new Error(error);
  }

  if (!error.status) error.status = 404;

  console.error(error);

  res.status(error.status).send(error.message);
});

export default app;
