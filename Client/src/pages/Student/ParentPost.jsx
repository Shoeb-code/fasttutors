import { useContext, useState } from "react";
import Stepper from "../../components/Stepper/Stepper.jsx";
import StepOne from "../../components/Stepper/StepOne.jsx";
import StepTwo from "../../components/Stepper/StepTwo.jsx";
import StepThree from "../../components/Stepper/StepThree.jsx";
import StepFour from "../../components/Stepper/StepFour.jsx";
import StepFive from "../../components/Stepper/StepFive.jsx";
import StepSix from "../../components/Stepper/Stepsix.jsx";
import { AuthContextParent } from "../../context/AuthParent.jsx";
import {  useNavigate } from "react-router-dom";




const StudentRegister = () => {

  const navigate =useNavigate()
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    studentClass: "",
    subject: "",
    location: "",
    landmark:"",
    pincode:"",
    password:"",
    rePassword:"",
    tuitionPlace:"",
    tutorGender:"",
    classInWeek:"",
    name:"",
    email:"",
    mobile:"",
    bio:"",
    gender:"",
    fee:"",
    role:"student"
  });

    const { studentRegister }=useContext(AuthContextParent)
  
    const handleSubmit = async () => {
      // optional: remove rePassword before sending
      const payload = {...data };
      delete payload.rePassword;
    
      const result = await studentRegister(payload);
    
      if (result.success) {
        alert("Registration successful");
        // navigate to login / dashboard
        navigate('/')
      } else {
        alert(result.message);
      }
    };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-800 flex flex-col items-center pt-14">
      <Stepper currentStep={step} />

      <div className="w-full max-w-5xl rounded-2xl shadow-sm mt-10 p-10">
          {step === 1 && <StepOne onNext={() => setStep(2) }  data={data} setData={setData} />}
          {step==2 && <StepTwo onNext={()=>setStep(3)} onPrev={()=>setStep(1)} data={data} setData={setData} /> }
          {step==3 && <StepThree onNext={()=>setStep(4)} onPrev={()=>setStep(2)} data={data} setData={setData} /> }

          {step==4 && <StepFour onNext={()=>setStep(5)} onPrev={()=>setStep(3)} data={data} setData={setData} /> }
          {step==5 && <StepFive onNext={()=>setStep(6)} onPrev={()=>setStep(4)} data={data} setData={setData}  /> }

          {step==6 && <StepSix onNext={handleSubmit} onPrev={()=>setStep(5)} data={data} setData={setData} /> }

          
      </div>
    </div>
  );
};

export default StudentRegister;
