import jwt from "jsonwebtoken";
import Tutor from "../models/Tutor.js";

const protectTutor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // ✅ VERIFY token (NOT sign)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Find tutor
    const tutor = await Tutor.findById(decoded.userId).select("-password");

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: "Tutor not found",
      });
    }

    // ✅ Attach tutor
    req.user = tutor;
    next();
  } catch (error) {
    console.error("Tutor auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default protectTutor;
