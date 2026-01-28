import Otp from "../models/Otp.js";
import bcrypt from "bcryptjs";

const MAX_ATTEMPTS = 5;

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    // ⏰ Expiry check
    if (Date.now() > otpRecord.expiresAt) {
      await Otp.deleteOne({ email });
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // 🚫 Attempt limit
    if (otpRecord.attempts >= MAX_ATTEMPTS) {
      await Otp.deleteOne({ email });
      return res.status(403).json({
        success: false,
        message: "Too many wrong attempts. Please request new OTP.",
      });
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otp);

    if (!isMatch) {
      otpRecord.attempts += 1;
      await otpRecord.save();

      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${MAX_ATTEMPTS - otpRecord.attempts} attempts left`,
      });
    }

    // ✅ Success
    await Otp.deleteOne({ email });

    res.json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default verifyOtp;
