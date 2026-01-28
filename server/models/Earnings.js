import mongoose from "mongoose";

const earningsSchema = new mongoose.Schema({
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
  month: String,
  amount: Number,
}, { timestamps: true });

export default mongoose.model("Earnings", earningsSchema);
