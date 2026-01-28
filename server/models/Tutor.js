import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
    firstName: String,
    lastName:String,
    whatShap:Number,
    profilePhoto:String,
    mobile:Number,
    email: String,
    password: String,
    reEnterPassWord:String,
    dob:String,
    city:String,
    gender:String,
    pinCode:Number,
    highestQualification:String,
    experience:Number,
    address:String,
    aboutTutor:String,
    subject:String,
    role:String,
    tutorLocation:String,
    modeOfTeaching:String,
    profileCompleted:Boolean,
    coins: {
        type: Number,
        default: 0,
      },

    refreshToken:String,
    
});

export default mongoose.model("Tutor", tutorSchema);
