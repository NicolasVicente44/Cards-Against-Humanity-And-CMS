import express from "express";
import PageRoutes from "./routes/PagesRoutes.js";

const app = express();

//set ejs
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", PageRoutes); 

//error handler
app.use((error, request, response) => {
  if (typeof error === "string") {
    error = new Error(error);
  }

  if (!error.status) error.status = 404;

  console.log(error);

  response.status(error.status).send(error.message);
});

export default app;
