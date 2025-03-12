import express from "express";
import { registerUser, checkUser } from "../Controllers/authController.js"; 

const router = express.Router();

router.post("/register", registerUser);

router.post("/check-user", checkUser);

export default router;

