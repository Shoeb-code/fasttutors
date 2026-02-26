import mongoose from "mongoose";

const StudyMaterialSchema = new mongoose.Schema(
  {
      className: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    chapter: {
      type: String,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    type: {
      type: String,                 
      enum: ["video", "pdf", "notes", "pyq"],
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

 export const  StudyMaterialModel =mongoose.model("StudyMaterialModel",StudyMaterialSchema);


