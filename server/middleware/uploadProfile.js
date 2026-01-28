
import multer from "multer";
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "tutor_profiles",        // cloudinary folder
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
      ],
    },
  });
  
  const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  });
  
  export default upload;