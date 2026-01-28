import mongoose from "mongoose";

const questionLogSchema = new mongoose.Schema({
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
  subject: String,
  count: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.model("QuestionLog", questionLogSchema);
