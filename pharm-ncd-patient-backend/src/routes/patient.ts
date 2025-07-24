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

router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patients", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
});

// Update a patient
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error });
  }
});

export default router;
