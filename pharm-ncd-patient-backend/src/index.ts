import dotenv from "dotenv";
dotenv.config();
console.log("MONGO_URI from env:", process.env.MONGO_URI);

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import patientRoutes from "./routes/patient"; // ✅ Corrected path
import purchaseRoutes from "./routes/purchase"; // ✅ Corrected path

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes); // ✅ Now this works
app.use("/api", purchaseRoutes); // ✅ Now this works
app.use("/api", patientRoutes);

// ✅ Register the route prefix here
app.use("/api/patients", patientRoutes); // This is very important

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
