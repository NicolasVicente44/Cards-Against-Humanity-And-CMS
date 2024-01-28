import express from "express";
import PageRoutes from "./routes/PagesRoutes.js";
// import { loadingMiddleware } from "./middlewares/loadingMiddleware.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import CardRoutes from "./routes/CardRoutes.js";

dotenv.config();

//connection to mongo using mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASS}@${process.env.MONGO_DATABASE}.u2pa692.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.info("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();

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

//use middleware, in this case loading middleware
// app.use(loadingMiddleware);

//use router, in this case page router
app.use("/", PageRoutes);
app.use("/cards", CardRoutes);

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
