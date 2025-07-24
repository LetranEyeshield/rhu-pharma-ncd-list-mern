import express from "express";
import Patient from "../../models/Patient";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ message: "Patient added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding patient", error });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { firstName, middleName, lastName, birthday, address, medicines } =
//       req.body;

//     const patient = new Patient(req.body);
//     await patient.save();
//     res.status(201).json({ message: "Patient added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

export default router;
