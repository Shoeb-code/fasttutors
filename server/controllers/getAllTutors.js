import Tutor from "../models/Tutor.js";

 export const getAlltutors=async(req,res)=>{
    try {
          const{subject,city,mode}= req.query;
           
           let filter={profileCompleted:true};
            
           if(subject){
            filter.subject= { $regex: subject, $options: "i" };
           } 
           if(city){
            filter.city= { $regex: city, $options: "i" };
           }
           if(mode){
            filter.modeOfTeaching={ $regex: mode, $options: "i" };
           } 

           const tutors =await Tutor.find(filter).select(
            "firstName lastName subject city experience modeOfTeaching aboutTutor profilePhoto"
          );
          

          res.status(200).json({ success:true, users:tutors });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });  
    }
}