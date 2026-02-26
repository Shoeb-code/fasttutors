import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";

export default async function protectAdmin(req, res, next) {
  try {

    /* ========================================
       🔥 READ ACCESS TOKEN FROM HEADER
    ======================================== */
   
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Admin not authorized",
      });
    }

    /* ========================================
       VERIFY ACCESS TOKEN
    ======================================== */

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    req.admin = admin;

    next();

  } catch (err) {
    console.error("Admin protect error:", err);

    res.status(401).json({
      success: false,
      message: "Invalid admin token",
    });
  }
}
