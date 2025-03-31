import admin from "../Config/fireBaseConfig.js";
import { generateJWTtoken } from "../Helpers/authHelper.js";
import User from "../Models/userModel.js";

export const signUpController = async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    let user = await User.findOne({ uid: uid });
    if (user) {
      return res.status(300).json({ error: "User already exists" });
    }
    if (!user) {
      user = new User({
        uid: uid,
        email,
        name: decodedToken.name || email,
        role: "user",
      });
      await user.save();
      const token = generateJWTtoken(user);
      res.status(200).json({ token, user: user });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to Sign up" });
  }
};


export const loginController = async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    let user = await User.findOne({ uid: uid });

    if (!user) {
      return res.status(404).json({ error: "User not found, please sign up." });
    }
    const token = generateJWTtoken(user);
    res.status(200).json({ token, user: user });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
}