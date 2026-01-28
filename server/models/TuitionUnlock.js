import mongoose from "mongoose";

const tuitionUnlockSchema = new mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    tuitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request", // 🔥 MUST MATCH MODEL NAME
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TuitionUnlock", tuitionUnlockSchema);
