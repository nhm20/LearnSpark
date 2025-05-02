import express from "express";
import { createIntentController, getPaymentStatus,  } from "../Controllers/paymentController.js";

const router = express.Router();

router.post("/create-intent", createIntentController);
router.get("/status/:orderId", getPaymentStatus); // Add this line to handle payment status
export default router;
