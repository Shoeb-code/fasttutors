import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
  studentName: String,
  lastMessage: String,
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
