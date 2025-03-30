import express from "express";
import {
  checkUserExists,
  registerUser,
} from "../Controllers/userController.js"; // Import controller

const router = express.Router();

router.post("/register", registerUser);

router.post("/exists", checkUserExists);

export default router;
