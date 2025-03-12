import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Class 10", "BTech"
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }], // References subjects
});
const Class = mongoose.model("Class", classSchema);
export default Class;
