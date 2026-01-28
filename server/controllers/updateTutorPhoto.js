
import Tutor from "../models/Tutor.js";



export const updateTutorPhoto = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }
  
      // Cloudinary image URL
      const imageUrl = req.file.path;
  
      const tutor = await Tutor.findByIdAndUpdate(
        req.user.id,
        { profilePhoto: imageUrl },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        profilePhoto: tutor.profilePhoto,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }
  };