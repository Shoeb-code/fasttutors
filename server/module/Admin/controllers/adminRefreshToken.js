import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";

export const refreshAdminToken = async (req, res) => {
  try {

    const refreshToken = req.cookies?.adminRefreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No admin session",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    /* 🔥 CREATE NEW ACCESS TOKEN */
    const accessToken = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({
      success: true,
      accessToken,
      admin,
    });

  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid admin refresh token",
    });
  }
};
