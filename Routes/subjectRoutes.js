import express from "express";
import {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../Controllers/subjectController.js";
import { isAuthenticated, isAdmin } from "../Middlewares/authMiddlewares.js";

const router = express.Router();
router.get("/", getAllSubjects);
router.get("/:id", getSubjectById);
router.post("/", isAuthenticated, isAdmin, createSubject);
router.put("/:id", isAuthenticated, isAdmin, updateSubject);
router.delete("/:id", isAuthenticated, isAdmin, deleteSubject);

export default router;
