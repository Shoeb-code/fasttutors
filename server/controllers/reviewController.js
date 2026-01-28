import Review from "../models/Review.js";

/* ADD REVIEW */
export const addReview = async (req, res) => {
  try {
    const { tutorId, rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required",
      });
    }

    const review = await Review.create({
      tutorId,
      parentId: req.user._id,
      parentName: req.user.name || "Parent",
      rating,
      comment,
    });

    res.json({ success: true, review });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ success: false });
  }
};

/* GET REVIEWS FOR TUTOR */
export const getTutorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      tutorId: req.params.tutorId,
    }).sort({ createdAt: -1 });

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) /
        (reviews.length || 1);

    res.json({
      success: true,
      reviews,
      avgRating: avgRating.toFixed(1),
      totalReviews: reviews.length,
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ success: false });
  }
};


/* ================= EDIT REVIEW ================= */
export const editReview = async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const review = await Review.findById(req.params.reviewId);
  
      if (!review) {
        return res.status(404).json({ success: false, message: "Review not found" });
      }
  
      // 🔐 Only review owner
      if (review.parentId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: "Not allowed" });
      }
  
      review.rating = rating;
      review.comment = comment;
      await review.save();
  
      res.json({ success: true, review });
    } catch (error) {
      console.error("Edit review error:", error);
      res.status(500).json({ success: false });
    }
  };
  
  /* ================= DELETE REVIEW ================= */
  export const deleteReview = async (req, res) => {
    try {
      const review = await Review.findById(req.params.reviewId);
  
      if (!review) {
        return res.status(404).json({ success: false, message: "Review not found" });
      }
  
      // 🔐 Only review owner
      if (review.parentId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: "Not allowed" });
      }
  
      await review.deleteOne();
  
      res.json({ success: true });
    } catch (error) {
      console.error("Delete review error:", error);
      res.status(500).json({ success: false });
    }
  };