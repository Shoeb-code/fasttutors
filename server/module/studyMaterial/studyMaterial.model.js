import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    classLevel: String,   // Class 6, Class 10, Class 12
    subject: String,      // Math, Science
    chapter: String,

    type: {
      type: String,
      enum: ["pdf", "video", "notes", "link"],
    },

    fileUrl: String,
    thumbnail: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
    },
  },
  { timestamps: true }
);

export default mongoose.model("StudyMaterial", studyMaterialSchema);
