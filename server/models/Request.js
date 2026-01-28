
import mongoose from "mongoose";

const requestSchema= new mongoose.Schema({
  parentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Parent",
    required:true
  },
  name:String,
  studentClass:String,
  classInWeek:Number,
  fee:String,
  gender:String,
  subject:String,
  pincode:Number,
  location:String,
  landmark:String,
  bio:String,
  mobile:Number,
     // ✅ CORRECT COIN FIELD
     coinCost: {
      type: Number,
      default: 100, // 🔥 fixed coin value
    },
  
  status: {
    type: String,
    default: "active", // active 
  },

  appliedCount: {
    type: Number,
    default: 0,
  },
  
  isClosed: {
    type: Boolean,
    default: false,
  },

},{timestamps:true});

const Request = mongoose.model("Request",requestSchema);

export default Request;