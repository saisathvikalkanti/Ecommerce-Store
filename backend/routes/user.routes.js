import express from "express";
import { fetchUserProfile, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", fetchUserProfile);
router.put("/profile", updateProfile)

export default router;