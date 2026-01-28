import Tutor from "../models/Tutor.js";
import { COIN_PACKAGES } from "../config/coinPackages.js";

export const getCoinPackages = (req, res) => {
  res.json({
    success: true,
    packages: COIN_PACKAGES,
  });
};

export const buyCoins = async (req, res) => {
  try {
    const { packageId } = req.body;

    const pack = COIN_PACKAGES.find(p => p.id === packageId);
    if (!pack) {
      return res.status(400).json({ success: false, message: "Invalid package" });
    }

    // 🔐 PAYMENT VERIFICATION (mock for now)
    // Later replace with Razorpay verification

    const tutor = await Tutor.findById(req.user._id);
    tutor.coins += pack.coins;
    await tutor.save();

    res.json({
      success: true,
      coins: tutor.coins,
      message: `${pack.coins} coins added successfully`,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
