import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
  day: String,
  subject: String,
  studentClass: String,
  time: String,
}, { timestamps: true });

export default mongoose.model("Schedule", scheduleSchema);
