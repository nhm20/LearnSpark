import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "admin",
  }
},{ timestamps: true });

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
