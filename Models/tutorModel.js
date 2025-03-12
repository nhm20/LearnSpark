import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firebaseUID: { type: String, required: true, unique: true }, // Authentication
  skills: [
    {
      classLevel: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // e.g., Class 12
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, // e.g., Physics
      topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }], // Topics they teach
    },
  ],
  availability: {
    days: [String], // e.g., ["Monday", "Wednesday"]
    timeSlots: [String], // e.g., ["10:00 AM - 12:00 PM"]
  },
  hourlyRate: { type: Number, default: 20 }, // Per unit session price
  role: { type: String, enum: ["tutor", "admin"], default: "tutor" },
},
{ timestamps: true });

const Tutor = mongoose.model("Tutor", tutorSchema);
export default Tutor;
