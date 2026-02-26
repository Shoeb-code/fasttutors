import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type:String,
      required: true,
    },

    email:{
      type:String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "admin",
    },

    isSuperAdmin: {
      type: Boolean,
      default: true, // only you
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
