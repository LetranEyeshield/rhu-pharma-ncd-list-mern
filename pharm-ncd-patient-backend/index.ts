// 📍 pharm-ncd-patient-backend/server.ts
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import patientRoutes from "./routes/patient";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/patients", patientRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
