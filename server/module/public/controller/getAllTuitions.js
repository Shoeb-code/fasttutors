import Request from "../../../models/Request.js"

const  getTuitions= async (req,res)=>{
    try {
          const requestTuitions= await Request.find().populate("parentId", "name email").sort({ createdAt: -1 });

          res.json({success:true,requestTuitions});

    } catch (error) {
          console.log("public tuitions:",error)
          res.json({success: false, message: "Server error" })
    }
}
export default getTuitions;