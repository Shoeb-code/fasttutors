import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */

    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 hidden by default
    },

    role: {
      type: String,
      default: "tutor",
    },

    /* ================= CONTACT ================= */

    mobile: {
      type: String, // ⚠️ NEVER Number
      trim: true,
      index: true,
    },

    whatShap: {
      type: String,
      trim: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    /* ================= PERSONAL ================= */

    dob: String,

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    city: String,
    address: String,
    pinCode: String,

    /* ================= EDUCATION ================= */

    highestQualification: String,

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    subject: {
      type: String,
      index: true,
    },

    modeOfTeaching: {
      type: String,
      enum: ["Online", "Offline", "Both"],
    },

    tutorLocation: String,

    studentYouTeach: {
      type: Number,
      default: 0,
    },

    aboutTutor: {
      type: String,
      maxlength: 1000,
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    /* ================= PLATFORM ================= */

    coins: {
      type: Number,
      default: 0,
      min: 0,
    },

    refreshToken: String,
  },
  {
    timestamps: true, // createdAt + updatedAt
  }
);

/* ================= INDEXES ================= */

tutorSchema.index({ email: 1 });
tutorSchema.index({ subject: 1 });
tutorSchema.index({ city: 1 });

export default mongoose.model("Tutor", tutorSchema);
