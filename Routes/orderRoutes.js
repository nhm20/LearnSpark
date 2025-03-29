import express from "express";
import {createOrder, capturePayment} from "../Controllers/orderController.js";
import { isAuthenticated, isAdmin } from "../Middlewares/authMiddlewares.js";

const router = express.Router();
// router.get("/", isAuthenticated, isAdmin, getAllOrders);
// router.get("/:id", isAuthenticated, getOrderById);
// router.post("/", isAuthenticated, createOrder);
// router.put("/:id", isAuthenticated, isAdmin, updateOrderStatus);
// router.delete("/:id", isAuthenticated, isAdmin, deleteOrder);

router.post("/createorder", createOrder);

router.get("/capturepayment/:paymentId", capturePayment);
export default router;
