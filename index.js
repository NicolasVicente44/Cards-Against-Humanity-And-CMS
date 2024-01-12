import express from "express";

const app = express();

app.get("/", (request, response, next) => {
  response.send("Hello world");
});

app.get("/insult", async (request, response) => {
  const insultURL = "https://insult.mattbas.org/api/insult";
  const res = await fetch(insultURL);
  const insult = await res.text();

  response.send(insult);
});

app.get("/:id", (request, response, next) => {
  const id = request.params?.id;

  if (isNaN(id)) {
    const error = new Error(
      `Parameter is required to be a number. ${id} is not a number`
    );

    next(error);
  }

  response.send(
    `Your requested ID is ${id} which is ${
      id > 10 ? "" : "not"
    } greater than 10.`
  );
});

app.use((error, request, response, next) => {
  response.status(422).send(error.message);
  console.log(error);
});

const port = process.env.PORT || 1111;

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
