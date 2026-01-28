import Tutor from "../models/Tutor.js";
import QuestionLog from "../models/QuestionLog.js";

export const getPublicTutorProfile = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.tutorId).select("-password");

    if (!tutor) {
      return res.status(404).json({ success: false });
    }

    const questions = await QuestionLog.find({ tutorId: tutor._id });

    const totalQuestions = questions.reduce(
      (sum, q) => sum + q.count,
      0
    );

    res.json({
      success: true,
      tutor: {
        ...tutor.toObject(),
        totalQuestions,
        rating: tutor.rating || 4.8,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
