// import express from "express";
//import Patient from "../../models/Patient";
// import Purchase from "../../models/Purchase";
import express, { Request, Response } from "express";

const router = express.Router();

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const patient = new Patient(req.body);
//     await patient.save();
//     res.status(201).json({ message: "Patient added successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding patient", error });
//   }
// });

// // router.post("/", async (req, res) => {
// //   try {
// //     const { firstName, middleName, lastName, birthday, address, medicines } =
// //       req.body;

// //     const patient = new Patient(req.body);
// //     await patient.save();
// //     res.status(201).json({ message: "Patient added successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: "Server error", error });
// //   }
// // });

// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const patients = await Patient.find().sort({ firstName: -1 });
//     res.json(patients);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch patients", error });
//   }
// });

// // search patient
// // router.get("/search", async (req, res) => {
// //   const name = req.query.name || "";
// //   try {
// //     const patients = await Patient.find({
// //       $or: [
// //         { firstName: new RegExp(name as string, "i") },
// //         { middleName: new RegExp(name as string, "i") },
// //         { lastName: new RegExp(name as string, "i") },
// //       ],
// //     });
// //     // const patients = await Patient.find({ firstname: "test" });
// //     res.json(patients);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error searching patients", error });
// //   }
// // });

// // router.get("/search", async (req, res) => {
// //   const name = req.query.name || "";
// //   try {
// //     const name = (req.query.name as string) || "";
// //     const regex = new RegExp(name, "i");
// //     const query = name
// //       ? {
// //           $or: [
// //             { firstName: regex },
// //             { middleName: regex },
// //             { lastName: regex },
// //           ],
// //         }
// //       : {}; // fetch all if no search term
// //     const patients = await Patient.find(query);
// //     res.json(patients);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error searching patients", error });
// //   }
// // });

// // routes/patientRoutes.ts
// // patientRoutes.ts
// router.get("/search", async (req: Request, res: Response) => {
//   const name = (req.query.name as string) || "";

//   try {
//     const query = name
//       ? {
//           $or: [
//             { firstName: new RegExp(name, "i") },
//             { middleName: new RegExp(name, "i") },
//             { lastName: new RegExp(name, "i") },
//           ],
//         }
//       : {}; // empty name = fetch all
//     // const patients = await Patient.find(query);
//     const patients = await Patient.find(query).sort({ firstName: 1 }).limit(25);
//     res.json(patients);
//   } catch (error) {
//     console.error("Search error:", error);
//     res.status(500).json({ message: "Search failed", error });
//   }
// });

// //dynamic routes at the end
// router.get("/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const patient = await Patient.findById(id);
//     if (!patient) return res.status(404).json({ message: "Patient not found" });
//     res.json(patient);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching patient", error });
//   }
// });

// // Update a patient
// router.put("/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.json(updatedPatient);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating patient", error });
//   }
// });

export default router;
