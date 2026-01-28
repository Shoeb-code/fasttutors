import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Tutor from "../models/Tutor.js";
import Parent from "../models/Parent.js";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    let user;

    // ✅ ROLE FIX
    if (decoded.role === "tutor") {
      user = await Tutor.findById(decoded.userId);
    } else if (decoded.role === "student") {
      user = await Parent.findById(decoded.userId);
    } else {
      return res.status(403).json({ message: "Invalid role" });
    }

    if (!user || !user.refreshToken) {
      return res.status(403).json({ message: "Session expired" });
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );

    if (!isValid) {
      return res.status(403).json({ message: "Refresh token mismatch" });
    }

    // 🔁 ROTATE REFRESH TOKEN
    const newRefreshToken = jwt.sign(
      { userId: user._id, role: decoded.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
    await user.save();

    // 🔐 NEW ACCESS TOKEN
    const newAccessToken = jwt.sign(
      { userId: user._id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // ✅ COOKIE FIX
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // 🔥 IMPORTANT
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};
