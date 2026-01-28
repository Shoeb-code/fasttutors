import TuitionUnlock from "../models/TuitionUnlock.js";

export const getTutorApplyHistory = async (req, res) => {
  try {
    const tutorId = req.user._id;

    const applies = await TuitionUnlock.find({ tutorId })
      .populate({
        path: "tuitionId",
        select: `
          subject
          studentClass
          coinCost
          createdAt
          name
          mobile
          tuitionPlace
        `,
      })
      .sort({ createdAt: -1 });

    // 🔥 SAFELY BUILD RESPONSE
    const history = applies
      .filter(a => a.tuitionId) // avoid deleted tuitions
      .map(a => ({
        subject: a.tuitionId.subject,
        studentClass: a.tuitionId.studentClass,
        coinCost: a.tuitionId.coinCost,
        createdAt: a.createdAt,

        // ⭐ NEW FIELDS
        name: a.tuitionId.name,
        mobile: a.tuitionId.mobile,
        tuitionPlace: a.tuitionId.tuitionPlace,
      }));

    res.json({
      success: true,
      history,
    });

  } catch (err) {
    console.error("Apply history error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to load apply history",
    });
  }
};
