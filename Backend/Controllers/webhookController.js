import Order from "../Models/orderModel.js";
import { generateZoomMeeting } from "../Helpers/zoomHelper.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhookController = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(`[WEBHOOK] Received event: ${event.type}`);
  } catch (err) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handling payment_intent.succeeded
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.order_id;

    console.log(`[WEBHOOK] Payment succeeded for orderId: ${orderId}`);

    try {
      const order = await Order.findById(orderId)
        .populate("unitId")
        .populate("tutorId");

      if (!order) {
        console.error(`❌ Order ${orderId} not found`);
        return res.status(404).json({ error: `Order ${orderId} not found` });
      }

      if (order.paymentStatus === "completed") {
        console.log(`ℹ️ Order ${orderId} already completed`);
        return res.status(200).json({ status: "already_completed" });
      }

      let zoomLink;
      try {
        zoomLink = await generateZoomMeeting(
          order.tutorId.email,
          order.unitId.name
        );
        console.log(`[ZOOM] Meeting generated: ${zoomLink}`);
      } catch (zoomError) {
        console.error("❌ Zoom meeting creation failed:", zoomError);
        zoomLink = "Error generating Zoom link";
      }

      order.paymentStatus = "completed";
      order.zoomLink = zoomLink;
      order.paymentDetails = {
        paymentIntentId: paymentIntent.id,
        amountPaid: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        paymentMethod: paymentIntent.payment_method_types?.[0] || "card",
        paymentDate: new Date(),
      };

      await order.save();
      console.log(`✅ Order ${orderId} marked as completed`);

      // Emit "orderStatus" for successful payment
      return res.status(200).json({ received: true });
    } catch (error) {
      console.error("❌ Error processing payment succeeded webhook:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Handling payment_intent.payment_failed
  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.order_id;

    console.log(`[WEBHOOK] Payment failed for orderId: ${orderId}`);

    try {
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = "failed";
        await order.save();
        console.log(`❌ Order ${orderId} marked as failed`);

        // Emit "paymentFailed" for failed payment
        return res.status(200).json({ received: true });
      }
    } catch (error) {
      console.error("❌ Error processing failed payment webhook:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // If the event is not handled, respond with status 200
  return res.status(200).json({ received: true });
};
