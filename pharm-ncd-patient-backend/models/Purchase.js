"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const purchaseSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true, // ✅ This auto-adds `createdAt` and `updatedAt`
});
exports.default = mongoose_1.default.model("Purchases", purchaseSchema);
