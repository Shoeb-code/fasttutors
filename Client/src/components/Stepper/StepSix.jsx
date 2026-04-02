import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "../../axiosConfig.js";

const OTP_LENGTH = 6;
const RESEND_TIME = 120; // seconds

const StepSix = ({ onNext, onPrev, data }) => {
  const [stage, setStage] = useState("review"); // review | otp | success
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  /* ================= SEND OTP ================= */
  const sendOtp = async () => {
    if (!data.email) {
      alert("Email not found");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/auth/send-otp-parent", {
        email: data.email,
      });

      if (res.data.success) {
        setStage("otp");
        setTimeLeft(RESEND_TIME);
        setOtp(Array(OTP_LENGTH).fill(""));
        inputsRef.current[0]?.focus();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== OTP_LENGTH) {
      alert("Enter complete OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/auth/verify-otp", {
        email:data.email,
        otp:enteredOtp,
      });

      if (res.data.success) {
        setStage("success");
        setTimeout(() => {
          onNext(); // final registration
        }, 1200);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= OTP INPUT ================= */
  /* ================= OTP INPUT ================= */
const handleOtpChange = (value, index) => {
  if (!/^\d?$/.test(value)) return;

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  // Auto move forward
  if (value && index < OTP_LENGTH - 1) {
    inputsRef.current[index + 1]?.focus();
  }

  // Auto verify when all boxes are filled
  if (newOtp.join("").length === OTP_LENGTH) {
    verifyOtp();
  }
};

const handleKeyDown = (e, index) => {
  if (e.key === "Backspace") {
    const newOtp = [...otp];

    if (newOtp[index]) {
      newOtp[index] = "";
      setOtp(newOtp);
    } else if (index > 0) {
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  }
};

  return (
    <div className="w-full border border-white/10 rounded-2xl p-6 lg:p-8 bg-white/5 backdrop-blur-sm text-gray-200">

  
      

      {/* ================= REVIEW ================= */}
      {stage === "review" && (
        <>
          <h2 className="text-3xl text-indigo-500 font-bold mb-6">Review Your Details</h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <Info label="Class" value={`Class ${data.studentClass}`} />
            <Info label="Subject" value={data.subject} />
            <Info label="Location" value={data.location} />
            <Info label="Sessions / Week" value={data.classInWeek} />
            <Info label="Tuition Mode" value={data.tuitionPlace} />
            <Info label="Tutor Gender" value={data.gender} />
            <Info label="Monthly Fee" value={data.fee} />
            <Info label="Name" value={data.name} />
            <Info label="Email" value={data.email} />
            <Info label="Mobile" value={data.mobile} />
          </div>

          <div className="flex gap-6">
            <button
              onClick={onPrev}
              className="px-10 py-4 rounded-xl border border-gray-500 text-gray-300 hover:bg-gray-800"
            >
              ← Previous
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={sendOtp}
              disabled={loading}
              className="px-12 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                         text-white font-bold shadow-lg disabled:opacity-40"
            >
              {loading ? "Sending OTP..." : "Send OTP →"}
            </motion.button>
          </div>
        </>
      )}

      {/* ================= OTP ================= */}
      {stage === "otp" && (
        <>
          <h2 className="text-3xl font-bold mb-2">Verify OTP</h2>
          <p className="text-gray-400 mb-6">
            Enter the 6-digit OTP sent to your email
          </p>

          {/* OTP BOXES */}
          <div className="flex gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleOtpChange(e.target.value, index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 text-center text-2xl rounded-xl
                           bg-gray-800 border border-white/10
                           focus:border-blue-600 outline-none"
              />
            ))}
          </div>

          {/* TIMER */}
          <p className="text-gray-400 mb-6">
            {timeLeft > 0
              ? `Resend OTP in ${timeLeft}s`
              : "Didn’t receive OTP?"}
          </p>

          {/* ACTIONS */}
          <div className="flex gap-6">
            <button
              onClick={() => setStage("review")}
              className="px-10 py-4 rounded-xl border border-gray-500 text-gray-300 hover:bg-gray-800"
            >
              ← Back
            </button>

            {timeLeft === 0 && (
              <button
                onClick={sendOtp}
                className="px-10 py-4 rounded-xl border border-blue-600 text-blue-400 hover:bg-blue-600/10"
              >
                Resend OTP
              </button>
            )}

<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  onClick={verifyOtp}
 disabled={loading || otp.join("").length !== OTP_LENGTH}
  className="px-12 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
             text-white font-bold shadow-lg disabled:opacity-40"
>
  Verify & Submit →
</motion.button>
          </div>
        </>
      )}

      {/* ================= SUCCESS ================= */}
      {stage === "success" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <CheckCircle size={72} className="text-green-500 mb-6" />
          <h2 className="text-3xl font-bold mb-2">
            Registration Successful 🎉
          </h2>
          <p className="text-gray-400">
            We will connect you with the best tutor soon.
          </p>
        </motion.div>
      )}
    </div>
  );
};

/* ================= INFO CARD ================= */
const Info = ({ label, value }) => (
  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

export default StepSix;
