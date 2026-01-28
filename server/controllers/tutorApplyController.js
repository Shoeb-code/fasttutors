const REQUIRED_COINS = 10;
const MAX_APPLIES = 5;
import Tutor from "../models/Tutor.js";
import Request from "../models/Request.js";
import TuitionUnlock from '../models/TuitionUnlock.js'

export const applyForTuition = async (req, res) => {
  try {
    const tutorId = req.user._id;
    const { tuitionId } = req.body;

    const tutor = await Tutor.findById(tutorId);
    const tuition = await Request.findById(tuitionId);

    if (!tutor || !tuition) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    // 🚫 Tuition closed
    if (tuition.isClosed) {
      return res.json({
        success: false,
        message: "This tuition is already closed",
      });
    }

    // 🔁 Already applied
    const alreadyUnlocked = await TuitionUnlock.findOne({
      tutorId,
      tuitionId,
    });

    if (alreadyUnlocked) {
      return res.json({
        success: true,
        phone: tuition.mobile,
        coinsLeft: tutor.coins,
        alreadyApplied: true,
      });
    }

    // ❌ Coins check
    if (tutor.coins < REQUIRED_COINS) {
      return res.json({
        success: false,
        needCoins: true,
        required: REQUIRED_COINS,
        available: tutor.coins,
      });
    }

    // 🔻 Deduct coins
    tutor.coins -= REQUIRED_COINS;
    await tutor.save();

    // 🔓 Save unlock
    await TuitionUnlock.create({
      tutorId,
      tuitionId,
    });

    // ➕ Increase apply count
    tuition.appliedCount += 1;

    // 🚫 Close after 5 tutors
    if (tuition.appliedCount >= MAX_APPLIES) {
      tuition.isClosed = true;
    }

    await tuition.save();

    return res.json({
      success: true,
      phone: tuition.mobile,
      coinsLeft: tutor.coins,
      appliedCount: tuition.appliedCount,
      isClosed: tuition.isClosed,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
