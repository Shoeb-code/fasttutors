import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../module/Admin/models/Admin.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {

    const email = process.env.ADMIN_EMAIL;
    const password = "YourStrongPassword123"; // 🔥 change this

    const existing = await Admin.findOne({ email });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      name:"FastTutors Owner",
      email,
      password: hashedPassword,
    });

    console.log("✅ Admin created successfully");
    console.log("Login Email:", email);
    console.log("Login Password:", password);

    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
