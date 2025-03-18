import Tutor from "../Models/tutorModel.js";
import Unit from "../Models/unitModel.js";
import User from "../Models/userModel.js";

export const registerUser = async (req, res) => {
  const { uid, standard, name } = req.body;
  console.log("Received data:", req.body);
  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, name, standard });
      await user.save();
      console.log("user saved:", user); // Log the user after saving
      return res
        .status(201)
        .json({ message: "user registered successfully", user });
    } else {
      return res.status(200).json({ message: "user already exists", user });
    }
  } catch (error) {
    console.error("Error registering user:", error.message); // Log the error message
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const checkUser = async (req, res) => {
  const { uid } = req.body;
  try {
    const user = await User.findOne({ uid });
    if (user) {
      return res.status(200).json({ exists: true, user });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking user", error: error.message });
  }
};

// Controller to get unique subjects
export const getSubjects = async (req, res) => {
  try {
    // Fetch distinct subjects from the database
    const subjects = await Unit.distinct("subject");
    // Send the subjects as a response
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch subjects" });
  }
};

export const searchResults = async (req, res) => {
  const { query } = req.query; // Get the search query from the request

  try {
    // Search for units
    const units = await Unit.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive search
        { classLevel: { $regex: query, $options: "i" } },
        { subject: { $regex: query, $options: "i" } },
      ],
    });

    // Search for tutors
    const tutors = await Tutor.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { skills: { $regex: query, $options: "i" } },
        { college: { $regex: query, $options: "i" } },
        { degree: { $regex: query, $options: "i" } },
      ],
    });

    // Return combined results
    res.status(200).json({ units, tutors });
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
