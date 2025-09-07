
import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/upload.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";
import { updateProfile } from "../controllers/user.updateProfile.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

// New route to update user profile with image upload support
router.put("/update", protectRoute, upload.single("profile"), updateProfile);

export default router;
