import Request from "../../../models/Request.js"

  const getAllTuitions = async (req, res) => {
      try {
        const posts = await Request.find({})
          .select("-mobile -password")
          .sort({ createdAt: -1 });
    
        res.json({
          success: true,
          posts,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to fetch tuition posts",
        });
      }
    };

    export default getAllTuitions