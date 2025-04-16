import express from "express";
import { isTutor, requireSignIn } from "../Middlewares/authMiddlewares.js";
import {
  updateOnlineStatus,
  updateTutorProfile,
} from "../Controllers/tutorController.js";
const router = express.Router();

router.get("/tutor-auth", requireSignIn, isTutor, (req, res) => {
  res.status(200).send({ message: "Admin Authenticated" });
});
router.put("/profile/:id", updateTutorProfile);

router.put("/online-status/:id", updateOnlineStatus);

export default router;
