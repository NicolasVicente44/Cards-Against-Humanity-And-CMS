import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export default () => {
  //connection to mongo using mongoose
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASS}@${process.env.MONGO_DATABASE}.u2pa692.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.info("MongoDB connected"))
    .catch((error) => console.log(error));
};
