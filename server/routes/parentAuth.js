import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Parent from "../models/Parent.js";
import { getAlltutors } from "../controllers/getAllTutors.js";

const parentRouter = express.Router();

/* ================= REGISTER ================= */
parentRouter.post("/parent-register", async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      studentClass,
      subject,
      pincode,
      location,
      landmark,
      password,
      gender,
      tuitionPlace,
      classInWeek,
      fee,
    } = req.body;

    const check = await Parent.findOne({ email });
    if (check) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newStudent = await Parent.create({
      name,
      email,
      mobile,
      studentClass,
      subject,
      pincode,
      location,
      landmark,
      password: hashPassword,
      gender,
      tuitionPlace,
      classInWeek,
      fee,
      role: "student", // ✅ FIXED
    });

    const { password: _, ...safeUser } = newStudent.toObject();

    res.json({ success: true, user: safeUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ================= LOGIN ================= */
parentRouter.post("/parent-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Parent.findOne({ email });
    if (!student) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: student._id, role: "student" },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    student.refreshToken = await bcrypt.hash(refreshToken, 10);
    await student.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ✅ FIXED
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...safeUser } = student.toObject();

    res.json({
      success: true,
      accessToken,
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ================= SEARCH ================= */
parentRouter.get("/parent/tutor-search", getAlltutors);

export default parentRouter;
