import express from "express";
import { getLanguages } from "../controllers/tmdbConfigController.js";

const router = express.Router();

router.get("/languages", getLanguages);

export default router;
