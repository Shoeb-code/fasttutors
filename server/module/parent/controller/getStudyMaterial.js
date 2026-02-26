
import { StudyMaterialModel } from "../../Admin/models/StudyMaterial.model.js";


export const getStudyMaterialsByStudent= async(req,res)=>{
    try {
           
        const {className,subject}=req.query;

        if(!className || !subject){
            return res.status(400).json({success:false,message:"className and subject required"});
        }

        const filter = {
            className,
            subject
          };

           const materials= await StudyMaterialModel.find(filter)
           .select("title type chapter url createdAt") // ✅ send only needed fields
           .sort({ createdAt:-1 })
           .lean();

           return res.json({
            success:true,
            materials
          });



    } catch (err) {

    console.error("❌ getMaterials error:",err);
    return res.status(500).json({
      success:false,
      message:"Failed to load materials"
    });
        
    }

}