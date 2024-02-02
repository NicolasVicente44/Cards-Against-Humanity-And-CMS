import PageRoutes from "../routes/PageRoutes.js";
import CardRoutes from "../routes/CardRoutes.js";

export default (app) => {
  //use router, in this case page router
  app.use("/", PageRoutes);
  app.use("/cards", CardRoutes);
};
