import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";

export const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    

    /* ================= EMAIL WHITELIST ================= */

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    /* ================= PASSWORD CHECK ================= */

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    /* ================= CREATE TOKENS ================= */

    // 🔥 SHORT ACCESS TOKEN
    const accessToken = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // 🔥 LONG REFRESH TOKEN
    const refreshToken = jwt.sign(
      { id: admin._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    /* ================= STORE REFRESH TOKEN COOKIE ================= */

    res.cookie("adminRefreshToken", refreshToken, {
      httpOnly: true,
      secure: false,   // ⚠️ TRUE IN PRODUCTION (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    /* ================= RESPONSE ================= */

    res.json({
      success: true,
      accessToken,
      admin,
    });

  } catch (err) {
    console.error("Admin login error:", err);

    res.status(500).json({
      success: false,
      message: "Admin login failed",
    });
  }
};
