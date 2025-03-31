import express from "express";
import { loginController, signUpController } from "../Controllers/authController";

const router = express.Router();

router.post("/sign-up", signUpController);

router.post("/login", loginController);

export default router;
