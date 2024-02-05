import passport from "passport";
import User from "../models/User.js";

// Exporting a function that takes an 'app' parameter
export default (app) => {
  // Setting up Passport to use the authentication strategy provided by the 'User' model
  passport.use(User.createStrategy());

  // Serializing and deserializing the user for session management
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User);

  // Initializing Passport middleware for authentication
  app.use(passport.initialize());

  // Using Passport middleware for managing user sessions
  app.use(passport.session());

  // Middleware to set local variables for the user roles in the response
  app.use((req, res, next) => {
    // Setting a local variable 'isAdmin' based on the user's role being 'ADMIN'
    res.locals.isAdmin = req.user?.role === "ADMIN";

    // Setting a local variable 'isUser' based on the user's role being 'USER'
    res.locals.isUser = req.user?.role === "USER";

    // Continue to the next middleware or route handler
    next();
  });
};
