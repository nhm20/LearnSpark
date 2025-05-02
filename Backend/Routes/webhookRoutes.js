import express from "express";
import { stripeWebhookController } from "../Controllers/webhookController.js";

const router = express.Router();

// Stripe webhook route - must use raw body parser
router.post(
  "/",
  stripeWebhookController
);

export default router;
