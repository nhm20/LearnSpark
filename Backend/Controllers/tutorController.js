import { comparePassword, hashPassword } from "../Middlewares/tutorMiddlewares.js";
import Tutor from "../Models/tutorModel.js";
export const registerTutor = async (req, res) => {
  try {
    const {
      name,
      email,
      skills,
      image,
      college,
      placeOfEducation,
      address,
      gender,
      age,
      degree,
      bank,
      accNo,
      password,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !skills ||
      !image ||
      !college ||
      !placeOfEducation ||
      !address ||
      !gender ||
      !age ||
      !degree ||
      !bank ||
      !accNo ||
      !password
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if tutor already exists
    const tutorExists = await Tutor.findOne({ email });
    if (tutorExists) {
      return res.status(200).send({
        success: false,
        message: "Tutor already exists. Please login.",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create tutor data
    const tutorData = {
      name,
      email,
      password: hashedPassword,
      skills,
      image,
      college,
      placeOfEducation,
      address,
      gender,
      age,
      degree,
      bank,

      accNo,
      online: true,
    };

    // Save the tutor to the database
    const tutor = await new Tutor(tutorData).save();

    // Send success response
    res.status(201).send({
      success: true,
      message: "Tutor Registered Successfully",
      tutor,
    });
  } catch (error) {
    console.error("Error in tutor registration:", error);
    res.status(500).send({
      success: false,
      message: "Error in Tutor Registration",
      error: error.message,
    });
  }
};


export const LoginTutor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const tutor = await Tutor.findOne({ email });
    if (!tutor) {
      return res.status(404).send({
        success: false,
        message: "Tutor not found. Please register.",
      });
    }

   const match = await comparePassword(password, tutor.password);
   if (!match) {
     return res.status(200).send({
       success: false,
       message: "Invalid password",
     });
   }

    res.status(200).send({
      success: true,
      message: "Tutor Logged In Successfully",
      tutor,
    });
  } catch (error) {
    console.error("Error in tutor login:", error);
    res.status(500).send({
      success: false,
      message: "Error in Tutor Login",
      error: error.message,
    });
  }
}

export const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const tutor = await Tutor.findOne({ email });

    if (tutor) {
      res.status(200).send({ exists: true });
    } else {
      res.status(200).send({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).send({
      success: false,
      message: "Error checking email",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if the email exists in the database
    const tutor = await Tutor.findOne({ email });

    if (!tutor) {
      return res.status(404).send({
        success: false,
        message: "Email not found. Please register first.",
      });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the tutor's password
    tutor.password = hashedPassword;
    await tutor.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send({
      success: false,
      message: "Error resetting password",
      error: error.message,
    });
  }
};