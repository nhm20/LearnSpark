import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    standard: { type: Number, required: true },
    enrolledCourses: [
      {
        units: [{ type: mongoose.Schema.Types.ObjectId, ref: "Unit" }],
        tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
      },
    ],
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
