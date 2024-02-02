import { Router } from "express";
import { about, home } from "../controllers/PagesController.js";

const router = Router();

router.get("/", home);
router.get("/about", about);

export default router;
