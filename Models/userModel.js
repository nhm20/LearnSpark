import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firebaseUID: { type: String, required: true, unique: true }, // Authentication
  enrolledCourses: [
    {
      classLevel: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // e.g., Class 10
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, // e.g., Mathematics
      topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }], // Topics within the subject
      tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" }, // Assigned tutor
      progress: { type: Number, default: 0 }, // Progress tracking in %
    },
  ],
  role: { type: String, enum: ["student", "admin"], default: "student" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
