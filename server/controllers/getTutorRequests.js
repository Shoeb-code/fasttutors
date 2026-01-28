import Request from "../models/Request.js";
import TuitionUnlock from "../models/TuitionUnlock.js";

export const getTutorRequests = async (req, res) => {
  try {
    const tutorId = req.user._id;

    // get all active tuitions
    const tuitions = await Request.find({})
      .sort({ createdAt: -1 })
      .lean();

    // get tuitions this tutor has applied to
    const unlocked = await TuitionUnlock.find({ tutorId });
    const unlockedSet = new Set(
      unlocked.map((u) => u.tuitionId.toString())
    );

    const result = tuitions.map((t) => ({
      ...t,
      hasApplied: unlockedSet.has(t._id.toString()), // ⭐
      appliedCount: t.appliedCount || 0,             // ⭐
      isClosed: t.isClosed || false,                  // ⭐
    }));

    res.json({
      success: true,
      request: result,
    });
  } catch (err) {
    console.error("Tutor request fetch error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
