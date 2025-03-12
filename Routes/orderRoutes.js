import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "../Controllers/orderController.js";
import { isAuthenticated, isAdmin } from "../Middlewares/authMiddlewares.js";

const router = express.Router();
router.get("/", isAuthenticated, isAdmin, getAllOrders);
router.get("/:id", isAuthenticated, getOrderById);
router.post("/", isAuthenticated, createOrder);
router.put("/:id", isAuthenticated, isAdmin, updateOrderStatus);
router.delete("/:id", isAuthenticated, isAdmin, deleteOrder);

export default router;
