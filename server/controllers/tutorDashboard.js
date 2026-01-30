import Earnings from "../models/Earnings.js";
import Schedule from "../models/Schedule.js";
import QuestionLog from "../models/QuestionLog.js";
import Chat from "../models/Chat.js";

/* ===== DASHBOARD SUMMARY ===== */
export const getTutorDashboard = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Tutor not authorized",
      });
    }

    const tutorId = req.user._id;

    const earnings = await Earnings.find({ tutorId });
    const schedule = await Schedule.find({ tutorId });
    const questions = await QuestionLog.find({ tutorId });
    const chats = await Chat.find({ tutorId }).limit(5);

    res.json({
      success: true,
      tutor:req.user,
      earnings,
      schedule,
      questions,
      chats,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===== UPDATE DEMO VIDEO ===== */
export const updateDemoVideo = async (req, res) => {
  try {
    req.user.demoVideo = req.body.demoVideo;
    await req.user.save();

    res.json({
      success: true,
      demoVideo: req.user.demoVideo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
