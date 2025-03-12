import Order from "../Models/orderModel.js";

export const getAllOrders = async (req, res) => {
  try {
    res
      .status(200)
      .json(
        await Order.find()
          .populate("user", "name email")
          .populate("tutor", "name")
      );
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("tutor", "name");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

export const createOrder = async (req, res) => {
  try {
    res
      .status(201)
      .json(
        await new Order({
          user: req.user._id,
          tutor: req.body.tutor,
          subjects: req.body.subjects,
          amount: req.body.amount,
          status: "pending",
        }).save()
      );
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
