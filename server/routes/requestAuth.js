
import express, { request } from 'express'
import { protectStudent } from '../middleware/StudentProtect.js';

import Request from '../models/Request.js';
import protectTutor from '../middleware/TutorProtect.js';

 const requestRouter= express.Router();



// post the new enquery post
requestRouter.post("/parent/add-tuition", protectStudent, async(req,res)=>{
   try {
    const {studentClass,classInWeek,fee,gender,subject,pincode,location,landmark, bio,} =  req.body
    
    if(!studentClass || !classInWeek || !fee || !gender || !subject || !pincode || !location || !landmark || !bio ) {
      return res.status(400).json({success: false, message:  "All fields are required" })
    };

   const myData =req.user;
   const newRequest=  new Request({parentId:myData._id,name:myData.name, mobile:myData.mobile,studentClass,classInWeek, fee, gender,subject,pincode,location,landmark, bio,})

    await newRequest.save();

    return res.status(201).json({success: true, request:newRequest})

      }
    catch (error) {
      console.error("Error fetching my requests:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
})


// fetch and edit the post

requestRouter.put(`/parent/request/:id`, protectStudent,async(req,res)=>{
  try {
         const user= req.params;
         const studentData= await Request.findById(user.id)

         if(!studentData){
               return res.status(401).json({success:false, message:"User Not exist"})
         }
         if(studentData.parentId.toString()!==req.user._id.toString()){
          return res.status(403).json({ success: false, message: "Not authorized" });
         }

         const updated= await Request.findByIdAndUpdate(user.id,req.body,{new:true})

         res.json({ success: true, message: "Enquiry updated", request: updated });

  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
})

// delete the data 
requestRouter.delete(`/parent/request/:id`, protectStudent, async(req,res)=>{
  try {
        const myId=req.params;
        const myData= await Request.findById(myId.id)

        if(!myData){
          return res.status(401).json({success:false, message:"User Not exist"})
        }

        if(myData.parentId.toString()!==req.user._id.toString()){
          return res.status(401).json({success:false, message:"You Are Not Authorize"})
        }

        await myData.deleteOne();
        res.json({ success: true, message: "Enquiry deleted successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
})


// fetch the  student enquiry post
requestRouter.get('/parent/my-post', protectStudent, async (req,res)=>{
  try {
          const myData= await  Request.find({parentId:req.user._id}).sort({createdAt: -1});
         
          res.json({success:true, request:myData})

  } catch (error) {
    console.error("Error fetching my requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
})

// fetch all the  enquery so that tutors can see

 requestRouter.get('/tutor/request',protectTutor, async(req,res)=>{
  try {
        const myRequest= await Request.find().populate("parentId", "name email")
        .sort({ createdAt: -1 });

        res.json({ success: true, request:myRequest });

  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
 })


export default requestRouter



