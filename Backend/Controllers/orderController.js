import dotenv from "dotenv";
import Stripe from "stripe";
import Tutor from "../Models/tutorModel.js";
import Order from "../Models/orderModel.js";
import { generateZoomMeeting } from "../Helpers/zoomHelper.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const checkOrderStatus = async (req, res) => {
  try {
    const { order_id } = req.params;

    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      status: order.paymentStatus,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking order status",
    });
  }
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
    res.status(500).json({
      success: false,
      error: "Failed to fetch orders",
    });
  }
};
