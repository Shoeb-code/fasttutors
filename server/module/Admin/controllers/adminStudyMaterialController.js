import {StudyMaterialModel} from "../models/StudyMaterial.model.js";
import cloudinary from "../../../config/cloudinary.js";

/* ===================================================
   🔥 CREATE / UPLOAD MATERIAL
=================================================== */

export const createOrUpdateMaterial = async (req, res) => {
  try {
    const {
      className,
      subject,
      chapter,
      title,
      description,
      type,
    } = req.body;

    

    /* ================= VALIDATION ================= */

    if (!className?.trim()) {
      return res.status(400).json({
        success:false,
        message:"Class required"
      });
    }

    if (!subject?.trim()) {
      return res.status(400).json({
        success:false,
        message:"Subject required"
      });
    }

    if (!title?.trim()) {
      return res.status(400).json({
        success:false,
        message:"Title required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success:false,
        message:"File required"
      });
    }

    /* ================= CLOUDINARY ================= */

    const uploaded = await new Promise((resolve,reject)=>{
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type:"raw",
          folder:"FastTutorsStudyMaterials",
        },
        (error,result)=>{
          if(error) return reject(error);
          resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    /* ================= SAVE ================= */
    console.log(uploaded.secure_url);

    const material = await StudyMaterialModel.create({
      className,
      subject,
      chapter,
      title,
      description,
      type,
      url: uploaded.secure_url,
    });

    return res.status(201).json({
      success:true,
      material,
    });

  } catch (err) {
    console.error("❌ Upload Error:",err);
    return res.status(500).json({
      success:false,
      message:"Upload failed"
    });
  }
};

/* ===================================================
   🔥 GET MATERIALS
=================================================== */

export const getAdminMaterials = async (req,res)=>{
  try{

    const {className,subject } = req.query;

    const filter = {};

    if(className) filter.className = className;
    if(subject) filter.subject = subject;

    const materials = await StudyMaterialModel.find(filter)
      .sort({createdAt:-1});

    return res.json({
      success:true,
      materials
    });

  }catch(err){
    console.error(err);
    res.status(500).json({
      success:false,
      message:"Failed to load materials"
    });
  }
};

/* ===================================================
   🔥 DELETE
=================================================== */

export const deleteMaterial = async(req,res)=>{
  try{

    const {id}=req.params;

    await StudyMaterialModel.findByIdAndDelete(id);

    res.json({
      success:true,
      message:"Deleted"
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:"Delete failed"
    });
  }
};

/* ===================================================
   🔥 UPDATE
=================================================== */

export const updateMaterial = async(req,res)=>{
  try{

    const {id}=req.params;

    const updated = await StudyMaterialModel.findByIdAndUpdate(
      id,
      req.body,
      {new:true}
    );

    res.json({
      success:true,
      material:updated
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message:"Update failed"
    });
  }
};
