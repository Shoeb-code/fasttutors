
import mongoose from "mongoose";

const studentSchema= new mongoose.Schema({
       name:String,
       email:String,
       mobile:Number,
       password:String,
       studentClass:String,
       subject:String,
       pincode:Number,
       location:String,
       landmark:String,
       gender:String, 
       tuitionPlace:String,
       classInWeek:Number,
       fee:String,
       bio:String,
       role:String,

       refreshToken:String,
})

export default mongoose.model("Parent",studentSchema)

