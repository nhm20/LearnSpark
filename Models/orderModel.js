import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Student who purchased the course
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true }, // Assigned tutor
  classLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  }, // e.g., Class 10
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  }, // e.g., Mathematics
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }], // Topics covered in the course
  paymentStatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  }, // Payment tracking
  progress: { type: Number, default: 0 }, // Course progress in percentage
  sessionDetails: {
    zoomLink: String, // Stores Zoom session link
    schedule: { type: Date }, // Date & time of the class
  },
  createdAt: { type: Date, default: Date.now }, // Order creation timestamp
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
