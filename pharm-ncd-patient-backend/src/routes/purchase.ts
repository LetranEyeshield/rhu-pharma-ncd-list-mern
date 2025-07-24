import express from "express";
import Purchase from "../../models/Purchase";

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

export default router;
