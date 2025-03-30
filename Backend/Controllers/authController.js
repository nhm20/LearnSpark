import Admin from "../Models/adminModel.js";

export const registerAdmin = async (req, res) => {
  const { uid,name } = req.body;
  console.log("Received data:", req.body); // Log the received data
  try {
    let admin = await Admin.findOne({ uid });
    if (!admin) {
      admin = new Admin({ uid, name });
      await admin.save();
      console.log("Admin saved:", admin); // Log the admin after saving
      return res
        .status(201)
        .json({ message: "Admin registered successfully", admin });
    } else {
      return res.status(200).json({ message: "Admin already exists", admin });
    }
  } catch (error) {
    console.error("Error registering admin:", error.message); // Log the error message
    res
      .status(500)
      .json({ message: "Error registering admin", error: error.message });
  }
};


export const checkAdmin = async (req, res) => {
  const { uid } = req.body;
  try {
    const admin = await Admin.findOne({ uid });
    if (admin) {
      return res.status(200).json({ exists: true, admin });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking admin", error: error.message });
  }
};
