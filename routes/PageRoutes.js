import { Router } from "express";
import { about, contact, home } from "../controllers/PagesController.js";

const router = Router();

router.get("/", home);
router.get("/about", about);
router.get("/contact", contact);

export default router;
