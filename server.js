import dotenv from 'dotenv';
import express from 'express';
import connectDB from './Config/database.js'
import authRoutes from './Routes/authRoutes.js';

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

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
 console.log(`Server Listening on ${PORT} on ${process.env.DEV_MODE} mode`)
})