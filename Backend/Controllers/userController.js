import User from "../Models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, standard, uid, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, standard, uid, email });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const  checkUserExists = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    return res.json({ exists: !!existingUser });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
