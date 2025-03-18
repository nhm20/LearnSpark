import dotenv from 'dotenv';
import express from 'express';
import connectDB from './Config/database.js'
import unitRoutes from './Routes/unitRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import tutorRoutes from './Routes/tutorRoutes.js';
import cors from 'cors';
dotenv.config();

//database connection
connectDB();

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tutor", tutorRoutes);
app.use('/api/units', unitRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
 console.log(`Server Listening on ${PORT} on ${process.env.DEV_MODE} mode`)
})