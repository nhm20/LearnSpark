import express from "express";
import {
  createUnit,
  getAllUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
  getClassNames,
  getSubjects,
  getSimilarUnits,
} from "../Controllers/unitController.js";

const router = express.Router();

// CRUD Routes
router.post("/", createUnit); // Create a new unit
router.get("/", getAllUnits); // Get all units
router.get("/class-names", getClassNames); // Fetch unique class names
router.get("/subjects", getSubjects); // Fetch unique subjects based on class level
router.get("/:id", getUnitById); // Get a unit by ID
router.put("/:id", updateUnit); // Update a unit by ID
router.delete("/:id", deleteUnit); // Delete a unit by ID

router.get("/:id/similar", getSimilarUnits);

export default router;
