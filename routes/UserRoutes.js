import multer from "multer";
import crypto from "crypto";
import { Router } from "express";
import {
  index,
  show,
  add,
  edit,
  create,
  update,
  remove,
} from "../controllers/UserController.js";

// Create an instance of the Express Router
const router = Router();

// Configure Multer for file uploads
const tempStorageLocation = "temp";

// Create a storage engine for Multer that defines how and where files should be stored
const storage = multer.diskStorage({
  // Destination function specifies where to store uploaded files
  destination: (_, __, callback) => {
    // In this case, files will be stored in a "temp" directory
    callback(null, tempStorageLocation);
  },

  // Filename function defines how uploaded files should be named
  filename: (_, file, callback) => {
    // Generate a unique filename for each uploaded file to prevent conflicts
    // Here, we combine a random hexadecimal key with the original filename
    const filename = `${generateRandomHexKey()}-${file.originalname}`;
    callback(null, filename);
  },
});

// Create a Multer instance with the defined storage engine
const upload = multer({ storage });

// Middleware to handle HTTP method issues
const requestCheck = (req, _, next) => {
  if (req.method === "post") {
    if (req.body._method && req.body._method === "put") {
      // Correct the HTTP method for PUT requests, as they may come as POST with a "_method" field
      req.method === "put";
    }
  }
  next();
};

// Define routes and associate them with controller actions
// Routes for the API
router.get("/", index);
router.get("/new", add);
router.get("/:id", show);
router.get("/:id/edit", edit);
router.post("/", upload.single("avatar"), create); // Upload avatar file for new user
router.post("/:id", (req, _, next) => {
  req.method = "put";
  next();
});
router.put("/:id", upload.single("avatar"), update); // Upload avatar file for updating user
router.delete("/:id", remove);
// These routes are used for user management and access control

// Handle issue with multipart forms not having detectable fields unless they've gone through multer
router.post("/:id", (req, res, next) => {
  req.method = "put"; // Correct the HTTP method for PUT requests
  next();
});

// Function to generate a random hexadecimal key
function generateRandomHexKey() {
  return crypto.randomBytes(8 / 2).toString("hex");
}

export default router;
