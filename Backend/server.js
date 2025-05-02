import dotenv from "dotenv";
import express from "express";
import connectDB from "./Config/database.js";
import unitRoutes from "./Routes/unitRoutes.js";
import tutorRoutes from "./Routes/tutorRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import webhookRoutes from "./Routes/webhookRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
   "https://learn-spark-9mzc.vercel.app"
];
const vercelPreviewRegex = /^https:\/\/learn-spark.*\.vercel\.app$/;


// CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        vercelPreviewRegex.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for origin: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Stripe Webhook route must come before express.json
app.use("/webhook", express.raw({ type: "application/json" }), webhookRoutes);

// JSON body parser (after raw for webhook)
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// Base route
app.get("/", (req, res) => {
  res.json({
    message: `Welcome to the backend API — running on PORT ${process.env.PORT || 8000}`,
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
