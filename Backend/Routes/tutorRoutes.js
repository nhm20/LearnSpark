import express from "express";
import { registerTutor,LoginTutor, checkEmailExists } from "../Controllers/tutorController.js";

const router = express.Router();

router.post("/register", registerTutor);

router.post("/login", LoginTutor);

router.post("/exists", checkEmailExists);

export default router;
