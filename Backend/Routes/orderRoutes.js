import express from "express";
import { checkOrderStatus, getOrdersByUserId } from "../Controllers/orderController.js";
// import { isAuthenticated, isAdmin } from "../Middlewares/authMiddlewares.js";

const router = express.Router();
// router.get("/", isAuthenticated, isAdmin, getAllOrders);
// router.get("/:id", isAuthenticated, getOrderById);
// router.post("/", isAuthenticated, createOrder);
// router.put("/:id", isAuthenticated, isAdmin, updateOrderStatus);
// router.delete("/:id", isAuthenticated, isAdmin, deleteOrder);

router.get("/status/:order_id", checkOrderStatus);


router.get('/:userId',getOrdersByUserId)
export default router;
