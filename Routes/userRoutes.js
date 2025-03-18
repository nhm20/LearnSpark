import express from "express";
import {
  checkUser,
  getSubjects,
  registerUser,
  searchResults,
} from "../Controllers/userController.js"; // Import controller

const router = express.Router();

router.post("/register", registerUser);

router.post("/exists", checkUser);

// Define route for fetching subjects
router.get("/subjects", getSubjects);

router.get("/search", searchResults);
export default router;
