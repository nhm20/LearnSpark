import axios from "axios";
import Unit from "../Models/unitModel.js";
import mongoose from "mongoose";

// Create a new unit
export const createUnit = async (req, res) => {
  try {
    const { name, classLevel, subject, price, timeLimit } = req.body;
    const newUnit = new Unit({ name, classLevel, subject, price, timeLimit });
    await newUnit.save();
    res.status(201).json(newUnit);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating unit", error: error.message });
  }
};

// Get all units with pagination
export const getAllUnits = async (req, res) => {
  try {
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 units per page if not provided

    // Calculate the skip value for MongoDB (how many units to skip)
    const skip = (page - 1) * limit;

    // Get the total number of units
    const totalUnits = await Unit.countDocuments();

    // Get the units with pagination
    const units = await Unit.find().skip(skip).limit(limit);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalUnits / limit);

    // Return the units with pagination metadata
    res.status(200).json({
      units,
      pagination: {
        totalUnits,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching units", error: error.message });
  }
};

export const getUnitById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Unit ID format" });
    }

    const unit = await Unit.findById(id);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }
    res.status(200).json(unit);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching unit", error: error.message });
  }
};

// Update a unit by ID
export const updateUnit = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Unit ID format" });
    }

    const { name, classLevel, subject, price, timeLimit } = req.body;

    // Ensure the unit exists before updating
    const existingUnit = await Unit.findById(id);
    if (!existingUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    const updatedUnit = await Unit.findByIdAndUpdate(
      id,
      { name, classLevel, subject, price, timeLimit },
      { new: true }
    );

    if (!updatedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    res.status(200).json(updatedUnit);
  } catch (error) {
    console.error("Error updating unit:", error); // More detailed error log
    res
      .status(500)
      .json({ message: "Error updating unit", error: error.message });
  }
};

// Delete a unit by ID
export const deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Unit ID format" });
    }

    const deletedUnit = await Unit.findByIdAndDelete(id);
    if (!deletedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }
    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting unit", error: error.message });
  }
};

export const getClassNames = async (req, res) => {
  try {
    console.log("Fetching distinct class names...");
    const classNames = await Unit.distinct("classLevel");

    console.log("Class Names:", classNames);
    if (!classNames || classNames.length === 0) {
      return res.status(404).json({ message: "No class names found" });
    }
    res.status(200).json(classNames);
  } catch (error) {
    console.error("Error fetching class names:", error);
    res
      .status(500)
      .json({ message: "Error fetching class names", error: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Unit.distinct("subject");

    if (!subjects.length) {
      return res.status(404).json({ message: "No subjects found" });
    }

    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getSimilarUnits = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Unit ID format" });
    }

    const unit = await Unit.findById(id);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    const similarUnits = await Unit.find({
      $and: [
        { subject: unit.subject },
        { classLevel: unit.classLevel },
        { _id: { $ne: unit._id } },
      ],
    });

    if (!similarUnits.length) {
      return res.status(404).json({ message: "No similar units found" });
    }

    res.status(200).json(similarUnits);
  } catch (error) {
    console.error("Error fetching similar units:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
