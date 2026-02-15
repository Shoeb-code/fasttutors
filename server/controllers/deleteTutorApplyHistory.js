
import TuitionUnlock from "../models/TuitionUnlock.js";

/* ================= DELETE APPLY HISTORY ================= */
export const deleteTutorApplyHistory = async (req, res) => {
    try {
      const tutorId = req.user._id;
      const { id } = req.params; // unlock document id
  
      // 🔥 Only allow tutor to delete THEIR own history
      const deleted = await TuitionUnlock.findOneAndDelete({
        _id: id,
        tutorId,
      });
  
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "History not found",
        });
      }
  
      res.json({
        success: true,
        message: "History deleted successfully",
      });
  
    } catch (err) {
      console.error("Delete history error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to delete history",
      });
    }
  };
  