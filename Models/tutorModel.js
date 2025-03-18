import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    skills: { type: String, required: true },
    image: { type: String, required: true },
    college: { type: String, required: true },
    placeOfEducation: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: String, required: true },
    degree: { type: String, required: true },
    bank: { type: String, required: true },
    accNo: { type: String, required: true },
    password: { type: String, required: true },
    total: { type: Number, default: 0 },
    rating: { type: Float64Array, default: 0 },
    tested: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    passed: { type: Boolean, default: false },
    role: { type: String, default: "tutor" },
  },
  { timestamps: true }
);
const Tutor = mongoose.model("Tutor", tutorSchema);
export default Tutor;
