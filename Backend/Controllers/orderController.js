import dotenv from "dotenv";
import Stripe from "stripe";
import Tutor from "../Models/tutorModel.js";
import Order from "../Models/orderModel.js";
import mongoose from "mongoose";
import { generateZoomMeeting } from "../Helpers/zoomHelper.js";

dotenv.config();

export const checkoutSessionController = async (req, res) => {
  try {
    const { course, user } = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const courseId = course._id;
    const userId = user.user._id;

    if (!courseId || !userId) {
      return res.status(400).json({
        message: "Invalid course or user ID",
        success: false,
      });
    }

    const tutor = await Tutor.findOne({ skill: course.subject, online: true });
    if (!tutor) {
      return res.status(400).json({
        message: "No tutor available",
        success: false,
      });
    }

    const lineItems = [
      {
        price_data: {
          currency: "inr",
          product_data: { name: course.name },
          unit_amount: course.price * 100,
        },
        quantity: 1,
      },
    ];

    const order = await Order.create({
      userId: userId,
      unitId: courseId,
      tutorId: tutor._id,
      amount: course.price,
      zoomLink: "",
      paymentStatus: "pending",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      expires_at: Math.floor(Date.now() / 1000) + 1800,
      success_url: `${process.env.CLIENT_URL}/orders`,
      cancel_url: `${process.env.CLIENT_URL}/orders`,
      metadata: {
        order_id: order._id.toString(),
      },
    });

    setTimeout(async () => {
      try {
        const sessionDetails = await stripe.checkout.sessions.retrieve(
          session.id
        );
        if (sessionDetails.status === "open") {
          await stripe.checkout.sessions.expire(session.id);
          await Order.findByIdAndUpdate(order._id, {
            paymentStatus: "failed",
          });
        }
      } catch (error) {
        console.error("Error expiring session:", error);
      }
    }, 120000);

    res.status(200).json({
      sessionId: session.id,
      success: true,
      message: "Checkout session created successfully",
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({
      message: "Failed to create checkout session",
      success: false,
    });
  }
};

export const verifyPaymentController = async (req, res) => {
  try {
    const { session_id, order_id } = req.query;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    if (!session_id || !order_id) {
      return res.status(400).json({
        message: "Missing session or order ID",
        success: false,
      });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    const order = await Order.findById(order_id).populate("unitId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    if (
      session.payment_status === "paid" &&
      order.paymentStatus === "pending"
    ) {
      // Get tutor details
      const tutor = await Tutor.findById(order.tutorId);

      // Create Zoom meeting only if payment is confirmed
      const zoomLink = await generateZoomMeeting(
        tutor.email,
        order.unitId.name
      );

      // Update order with Zoom link and mark as paid
      order.zoomLink = zoomLink;
      order.paymentStatus = "completed";
      await order.save();

      return res.status(200).json({
        success: true,
        order: order,
        message: "Payment verified successfully",
      });
    }

    res.status(200).json({
      success: false,
      message: "Payment not completed yet",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      message: "Error verifying payment",
      success: false,
    });
  }
};

export const stripeWebhookController = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = Stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const order = await Order.findById(session.metadata.order_id);

      if (order && order.paymentStatus === "pending") {
        const tutor = await Tutor.findById(order.tutorId);
        const zoomLink = await generateZoomMeeting(
          tutor.email,
          order.unitId.name
        );

        await Order.findByIdAndUpdate(order._id, {
          zoomLink: zoomLink,
          paymentStatus: "completed",
        });
      }
    } catch (error) {
      console.error("Error processing successful payment:", error);
    }
  }

  if (event.type === "checkout.session.expired") {
    try {
      const order = await Order.findById(session.metadata.order_id);
      if (order && order.paymentStatus === "pending") {
        await Order.findByIdAndUpdate(order._id, {
          paymentStatus: "failed",
        });
        console.log("Order marked as failed due to expired session");
      }
    } catch (err) {
      console.error("Error handling expired session:", err);
    }
  }

  res.json({ received: true });
};
export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId })
      .populate({
        path: "unitId",
        select: "name subject classLevel image price",
      })
      .populate({
        path: "tutorId",
        select: "name",
      })
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((order) => ({
      id: order._id,
      unit: {
        id: order.unitId?._id,
        name: order.unitId?.name,
        subject: order.unitId?.subject,
        classLevel: order.unitId?.classLevel,
        image: order.unitId?.image,
        price: order.unitId?.price,
      },
      tutor: {
        id: order.tutorId?._id,
        name: order.tutorId?.name,
        skill: order.tutorId?.skill,
        degree: order.tutorId?.degree,
      },
      amount: order.amount,
      paymentStatus: order.paymentStatus,
      meetingLink: order.zoomLink,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    res.status(200).json({
      success: true,
      count: formattedOrders.length,
      data: formattedOrders,
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch orders",
    });
  }
};
