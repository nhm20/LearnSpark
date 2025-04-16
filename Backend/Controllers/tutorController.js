import mongoose from "mongoose";
import Tutor from "../Models/tutorModel.js";

export const updateTutorProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid Tutor ID format", success: false });
    }

    const { skill, image, degree, accNo } = req.body;

    if (!skill || !image || !degree || !accNo) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Ensure the tutor exists before updating
    const existingTutor = await Tutor.findById(id);
    if (!existingTutor) {
      return res
        .status(404)
        .json({ message: "Tutor not found", success: false });
    }

    const updatedTutor = await Tutor.findByIdAndUpdate(
      id,
      { skill, image, degree, accNo },
      { new: true }
    );

    if (!updatedTutor) {
      return res
        .status(404)
        .json({ message: "Tutor not found", success: false });
    }

    res.status(200).json({
      message: "Tutor profile updated successfully",
      user: updatedTutor,
      success: true,
    });
  } catch (error) {
    console.error("Error updating tutor profile:", error); // More detailed error log
    res
      .status(500)
      .json({ message: "Error updating tutor profile", success: false });
  }
};

export const updateOnlineStatus = async (req, res) => {
  const { isOnline } = req.body;
  const { id } = req.params; // from Firebase token

  try {
    const updated = await Tutor.findOneAndUpdate(
      { _id: id },
      { online: isOnline },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Tutor not found", success: false });
    }

    res
      .status(200)
      .json({
        message: `Tutor is now ${isOnline ? "online" : "offline"}`,
        success: true,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating status",
        success: false,
        error: error.message,
      });
  }
};
