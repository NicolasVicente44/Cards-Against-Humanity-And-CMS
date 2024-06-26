import PageRoutes from "../routes/PageRoutes.js";
import CardRoutes from "../routes/CardRoutes.js";
import UserRoutes from "../routes/UserRoutes.js";
import AuthenticationRoutes from "../routes/AuthenticationRoutes.js";

export default (app) => {
    // Registering our PageRoutes as middleware
    app.use("/", PageRoutes);

    // Authentication routes
    app.use("/", AuthenticationRoutes);
    
    // Card routes
    app.use("/cards", CardRoutes);

    // User routes
    app.use("/users", UserRoutes);
};