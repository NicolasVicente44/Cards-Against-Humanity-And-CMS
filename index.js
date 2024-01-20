import app from "./app.js";

const port = process.env.PORT || 1111;
const server = app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);

export default server;
