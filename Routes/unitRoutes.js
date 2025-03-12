import express from "express";
import {
  getAllUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
} from "../Controllers/unitController.js";
import { isAuthenticated, isAdmin } from "../Middlewares/authMiddlewares.js";

const router = express.Router();
router.get("/", getAllUnits);
router.get("/:id", getUnitById);
router.post("/", isAuthenticated, isAdmin, createUnit);
router.put("/:id", isAuthenticated, isAdmin, updateUnit);
router.delete("/:id", isAuthenticated, isAdmin, deleteUnit);

export default router;
