import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    pid: { type: String, required: true },
    // pid: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    // pid: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    age: { type: Number }, // This will be computed before saving
    address: { type: String, required: true },
    medicines: [{ type: String }], // Will store array of selected medicines
  },
  {
    timestamps: true, // ✅ This auto-adds `createdAt` and `updatedAt`
  }
);

export default mongoose.model("Purchases", purchaseSchema);
