import express from "express";
import {
  getAllClasses,
  getClassById,
  addClass,
  updateClass,
  deleteClass,
} from "../Controllers/classController.js";
import { isAdmin, isAuthenticated } from "../Middlewares/authMiddlewares.js";

const router = express.Router();
router.get("/", getAllClasses);
router.get("/:id", getClassById);
router.post("/", isAuthenticated, isAdmin, addClass);
router.put("/:id", isAuthenticated, isAdmin, updateClass);
router.delete("/:id", isAuthenticated, isAdmin, deleteClass);

export default router;
