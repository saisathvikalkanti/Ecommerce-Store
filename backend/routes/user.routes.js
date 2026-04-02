import express from "express";
import { fetchUserProfile, updateProfile } from "../controllers/user.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile",isAuth, fetchUserProfile);
router.put("/profile",isAuth, updateProfile)

export default router;