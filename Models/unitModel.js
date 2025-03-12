import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Trigonometry"
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  }, // Links to subject
}, { timestamps: true });

const Unit = mongoose.model("Unit", unitSchema);
export default Unit;
