// // 📍 pharm-ncd-patient-backend/server.ts
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import patientRoutes from "./src/routes/patient";
// import purchaseRoutes from "./src/routes/purchase";

// require("dotenv").config();
// const bodyParser = require("body-parser");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI!)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB error:", err));

// app.use("/api/patients", patientRoutes);
// app.use("/api/patients/search", patientRoutes);
// app.use("/api/purchase", purchaseRoutes);

// app.listen(5000, () => console.log("Server running on http://localhost:5000"));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

import dotenv from "dotenv";
import patientRoutes from "./src/routes/patient";
import purchaseRoutes from "./src/routes/purchase";

require("dotenv").config();

dotenv.config();

const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const Employee = require("./models/Employee");

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err: string) => console.error("MongoDB error:", err));

// app.get(
//   "/api/patient/search",
//   async (
//     req: { query: { name: string } },
//     res: {
//       json: (arg0: any) => void;
//       status: (arg0: number) => {
//         (): any;
//         new (): any;
//         json: { (arg0: { message: string }): void; new (): any };
//       };
//     }
//   ) => {
//     const name = req.query.name || "";
//     try {
//       const employees = await Employee.find({
//         $or: [
//           { firstName: new RegExp(name, "i") },
//           { middleName: new RegExp(name, "i") },
//           { lastName: new RegExp(name, "i") },
//         ],
//       });
//       res.json(employees);
//     } catch (error) {
//       console.error("Search error:", error);
//       res.status(500).json({ message: "Search failed" });
//     }
//   }
// );

app.use("/api/patients", patientRoutes);
app.use("/api/patients/search", patientRoutes);
app.use("/api/purchase", purchaseRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
