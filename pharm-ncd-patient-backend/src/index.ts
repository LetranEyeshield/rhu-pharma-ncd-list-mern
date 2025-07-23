import dotenv from "dotenv";
dotenv.config();
console.log("MONGO_URI from env:", process.env.MONGO_URI);

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
