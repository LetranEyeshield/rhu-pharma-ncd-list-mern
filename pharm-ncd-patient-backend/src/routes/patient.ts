import express from "express";
import Patient from "../../models/Patient";
// import Purchase from "../../models/Purchase";

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

router.get("/search", async (req, res) => {
  const name = (req.query.name as string) || "";

  try {
    const results = await Patient.find({
      $or: [
        { firstName: new RegExp(name, "i") },
        { middleName: new RegExp(name, "i") },
        { lastName: new RegExp(name, "i") },
      ],
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err });
  }
});

// //Purchase
// router.post("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Make sure we include the patient ID in the purchase document
//     const purchase = new Purchase({ ...req.body, id });

//     await purchase.save();
//     res.status(201).json({ message: "Purchase added successfully!" });
//   } catch (error) {
//     console.error("Purchase error:", error);
//     res.status(500).json({ message: "Error adding purchase", error });
//   }
// });

// router.get("/search", async (req, res) => {
//   const query = req.query.query?.toString() || "";
//   const regex = new RegExp(query, "i");

//   const results = await Patient.find({
//     $or: [{ firstName: regex }, { middleName: regex }, { lastName: regex }],
//   });

//   res.json(results);
// });

export default router;
