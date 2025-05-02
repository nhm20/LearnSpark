import Stripe from "stripe";
import Order from "../Models/orderModel.js";
import Tutor from "../Models/tutorModel.js";
import { generateZoomMeeting } from "../Helpers/zoomHelper.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createIntentController = async (req, res) => {
  try {
    const { course, user } = req.body;
    const courseId = course._id;
    const userId = user.user._id;

    // Find an online tutor for the course
    const tutor = await Tutor.findOne({ skill: course.subject, online: true });
    if (!tutor) {
      return res
        .status(400)
        .json({ success: false, message: "No tutor available" });
    }

    // Create a new order for the course
    const order = await Order.create({
      userId,
      unitId: courseId,
      tutorId: tutor._id,
      amount: course.price,
      zoomLink: "",
      paymentStatus: "failed",
    });

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.price * 100, // Amount in cents
      currency: "inr", // Currency
      metadata: { order_id: order._id.toString() }, // Store the order ID in metadata
    });

    // Return the payment intent's client secret and order ID
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id.toString(),
      success: true,
    });
  } catch (error) {
    console.error("❌ Error creating payment intent:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create PaymentIntent" });
  }
};

export const getPaymentStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: `Order ${orderId} not found` });
    }

    // Return the current payment status and zoom link if available
    return res.status(200).json({
      status: order.paymentStatus,
      zoomLink: order.zoomLink,
    });
  } catch (err) {
    console.error("Error fetching order status:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
