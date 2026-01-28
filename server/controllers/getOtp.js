
import Otp from "../models/Otp.js";
import bcrypt from 'bcryptjs'
import sendEmail from "../utils/sendEmail.js";
import Tutor from "../models/Tutor.js";


const getOtpRequest=async(req,res)=>{

    try {
           const {email}=req.body;
            
        //    if(!email){
        //        return res.status(400).json({success:false,message:"Email Required"})
        //    }

           const checkUser= await Tutor.findOne({email})

          

           if(checkUser ){
            return res.json({success:false, message:"User already Exist "})
           }


           const generateOTP= Math.floor(Math.random()*900000+100000).toString()
        

           const hasedOtp =await bcrypt.hash(generateOTP,10)
           
           // remove all old  OTP
           await Otp.deleteMany({email})

                                                      // expires in 2 minute
           await Otp.create({email, otp:hasedOtp, expiresAt: Date.now()+ 2*60*1000})

            await sendEmail(email , generateOTP)
           res.json({ success: true, message: "OTP sent successfully" });

    } catch (error) {
        console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
    }
}

export default getOtpRequest