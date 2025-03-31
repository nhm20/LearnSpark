import admin from "../Config/fireBaseConfig.js";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token is required" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check if user is an admin
export const isAdmin = async (req, res, next) => {
  if (!req.user || !req.user.email) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const user = await User.findOne({ uid: req.user.uid });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export default verifyToken;