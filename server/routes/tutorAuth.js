import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Tutor from "../models/Tutor.js";
import protectTutor from '../middleware/TutorProtect.js'
import Otp from "../models/Otp.js";
import upload from "../middleware/uploadProfile.js";
import { updateTutorPhoto } from "../controllers/updateTutorPhoto.js";
import {applyForTuition} from '../controllers/tutorApplyController.js'



const tutorRouter = express.Router();

// Register
tutorRouter.post("/tutor-register", async (req, res) => {
  try {

    const {firstName,otp,lastName,email,whatShap,mobile,password,subject,role,reEnterPassWord,dob,city,gender,pinCode,highestQualification,experience,address,aboutTutor,tutorLocation,modeOfTeaching} = req.body;


      const record = await Otp.findOne({email})

      if (!record)
        {return res.status(400).json({ success: false, message: "OTP expired" });}

      if (record.expiresAt < Date.now())
        return res.status(400).json({ success: false, message: "OTP expired" });
       const isMatch = await bcrypt.compare(otp, record.otp);

    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

     const existingUser = await Tutor.findOne({email});
    
    if (existingUser) return res.json({ success: false, message: "Tutor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Tutor.create({firstName,lastName,subject,role,email,whatShap,mobile,dob,city,password: hashedPassword,gender,pinCode,highestQualification,experience,address,aboutTutor,tutorLocation,modeOfTeaching,profileCompleted:true});
    
    await Otp.deleteOne({ email });


    // 4️⃣ ISSUE TOKENS (AUTO LOGIN)

    // Access token short-lived 

    const accessToken = jwt.sign({userId: newUser._id,role: newUser.role },process.env.JWT_SECRET,{ expiresIn: "15m" }
    )

    // Access token long-lived 

    const refreshToken = jwt.sign(
      { userId: newUser._id, role: "tutor" },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } // ✅ FIXED
    );

    // store hashed refresh token 

    newUser.refreshToken=await bcrypt.hash(refreshToken,10)
    await newUser.save();

     // Send refresh token as HTTP-only cookie

     res.cookie("refreshToken",refreshToken,{
      httpOnly:true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ✅ FIXED
      maxAge: 7 * 24 * 60 * 60 * 1000
     })



    res.json({ success: true,token:accessToken, user:{
        id: newUser._id,
        firstName: newUser.firstName,
        email: newUser.email,
        role: newUser.role
    }});
    
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login
tutorRouter.post("/tutor-login", async(req, res) => {
  try {
    const { email, password } = req.body;

    const tutor = await Tutor.findOne({email});
    
    if (!tutor) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, tutor.password);

    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

     // Access Token (short-lived)
     const accessToken = jwt.sign(
      { userId: tutor._id, role:"tutor"},
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    
     // refresh  Token (long-lived)

     const refreshToken = jwt.sign(
      { userId: tutor._id, role: "tutor" },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

       // Save hashed refresh token in DB
       tutor.refreshToken = await bcrypt.hash(refreshToken, 10);
       await tutor.save();
      
    // Send refresh token via HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ✅ FIXED
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      accessToken,
      user: tutor,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});






// tutor-logout


tutorRouter.post("/tutor-logout", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const tutor = await Tutor.findOne({});
      if (tutor) {
        tutor.refreshToken = null;
        await tutor.save();
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


 
// update tuttor profile photo

tutorRouter.put("/update-photo",protectTutor,upload.single("profilePhoto"),updateTutorPhoto);

tutorRouter.post("/apply", protectTutor, applyForTuition);


// Update tutor profile
tutorRouter.put("/edit-profile",protectTutor, async (req, res) => {
    try {
      if (req.user.role !== "tutor")

        return res.json({ success: false, message: "Only tutors can update profile" });
  
      const { firstName,lastName,subject,whatShap,mobile,dob,city,gender,pinCode,highestQualification,experience,address,aboutTutor,tutorLocation,modeOfTeaching,studentYouTeach } = req.body;

      
       
      const updatedTutor = await Tutor.findByIdAndUpdate(
        req.user._id,
        {firstName,lastName,whatShap,mobile,dob,subject,city,gender,pinCode,highestQualification,experience,address,aboutTutor,tutorLocation,modeOfTeaching,studentYouTeach},
        { new: true }
      );
  
      res.json({ success: true, user:updatedTutor});

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });
  


  // Get all tutors
tutorRouter.get("/tutors", async (req, res) => {
    try {
      const { experience , tutorLocation ,city,gender,modeOfTeaching,subject} = req.query;
      let query = { role: "tutor" };
  
      if (experience) query.experience = { $regex: experience, $options: "i" };
      if (city) query.city = { $regex: city, $options: "i" };
      if (subject) query.subject = { $regex: subject, $options: "i" };
      if (gender) query.gender = { $regex: gender, $options: "i" };
      if (modeOfTeaching) query.modeOfTeaching = { $regex: modeOfTeaching, $options: "i" };
      if (tutorLocation) query.location = { $regex: tutorLocation, $options: "i" };
  
      const tutors = await Tutor.find(query).select("-password");
      res.json({ success: true, tutors });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

export default tutorRouter;
