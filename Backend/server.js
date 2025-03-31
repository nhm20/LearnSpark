import dotenv from 'dotenv';
import express from 'express';
import connectDB from './Config/database.js'
import unitRoutes from './Routes/unitRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import tutorRoutes from './Routes/tutorRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
import cors from 'cors';
dotenv.config();

connectDB();

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL || "*", // Allow frontend URL
  credentials: true,  // Allow cookies (if using sessions)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tutor", tutorRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
 console.log(`Server Listening on ${PORT} on ${process.env.DEV_MODE} mode`)
})
