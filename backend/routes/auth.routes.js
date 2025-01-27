import express from "express";
import {LogInUser,LogOutUser,SignInUser} from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/login",LogInUser);

router.post("/Signup",SignInUser);

router.get("/logout",LogOutUser);

export default router;