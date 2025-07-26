import express from "express";
import Purchase from "../models/Purchase";

const router = express.Router();

//Purchase
// router.post("/purchase", async (req, res) => {
//   try {
//     const purchase = new Purchase(req.body);
//     await purchase.save();
//     res.status(201).json({ message: "Purchase added successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding purchase", error });
//   }
// });

router.post("/purchase", async (req, res) => {
  console.log("Incoming Purchase data:", req.body); // ✅ Add this

  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).json({ message: "Purchase added successfully!" });
  } catch (error) {
    console.error("Error saving purchase:", error); // ✅ Add this too
    res.status(500).json({ message: "Error adding purchase", error });
  }
});

router.get("/search", async (req, res) => {
  const name = (req.query.name as string) || "";

  try {
    const query = name
      ? {
          $or: [
            { firstName: new RegExp(name, "i") },
            { middleName: new RegExp(name, "i") },
            { lastName: new RegExp(name, "i") },
          ],
        }
      : {}; // empty name = fetch all
    // const patients = await Patient.find(query);
    const purchase = await Purchase.find(query)
      .sort({ createdAt: -1 })
      .limit(25);
    res.json(purchase);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed", error });
  }
});

export default router;
