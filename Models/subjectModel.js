import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Mathematics"
  classLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  }, // Links to class
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }], // References topics
},
{ timestamps: true });

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
