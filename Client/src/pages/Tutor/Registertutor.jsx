import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContextTutor";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import axios from "../../axiosConfig.js";
import { motion, AnimatePresence } from "framer-motion";

const pageMotion = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stepMotion = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.4 },
};

const RegisterTutor = () => {
  const { registerTutor } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "tutor",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ===== SEND OTP ===== */
  const sendOtp = async () => {
    if (!formData.email) return alert("Enter email first");

    try {
      const { data } = await axios.post("/auth/send-otp", {
        email: formData.email,
      });

      if (data.success) {
        setStep(2);
        setTimeLeft(120);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerTutor(formData, otp);
    if (result.success) navigate("/");
    else alert(result.message);
  };

  /* ===== TIMER ===== */
  useEffect(() => {
    if (step !== 2 || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <motion.div
      {...pageMotion}
      className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900
                 flex items-center justify-center px-6"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl grid md:grid-cols-2
                   bg-white/5 backdrop-blur-xl border border-white/10
                   rounded-3xl shadow-2xl overflow-hidden"
      >

        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex flex-col items-center justify-center
                     p-12 bg-gradient-to-br from-indigo-600/10 to-blue-600/10"
        >
          <motion.img
            src={assets.logo}
            alt="FastTutors"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-40 mb-10 drop-shadow-2xl"
          />

          <h3 className="text-4xl font-bold text-white mb-4 text-center">
            Teach. Inspire. Transform.
          </h3>

          <p className="text-slate-300 text-center leading-relaxed max-w-sm">
            “A good teacher can inspire hope, ignite the imagination,
            and instill a love for learning.”
          </p>

          <p className="mt-6 text-indigo-300 italic text-lg">
            Your tutoring journey starts here 🚀
          </p>
        </motion.div>

        {/* RIGHT FORM */}
        <div className="p-8 md:p-14">
          <h2 className="text-4xl font-extrabold text-indigo-400 text-center mb-2">
            Tutor Registration
          </h2>
          <p className="text-slate-400 text-center mb-10">
            Create your free FastTutors account
          </p>

          {/* STEPPER */}
          <div className="flex items-center justify-center mb-10 gap-6">
            <StepCircle active={step >= 1} label="Details" />
            <div className={`h-1 w-16 rounded ${step === 2 ? "bg-indigo-500" : "bg-slate-700"}`} />
            <StepCircle active={step === 2} label="Verify" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">

              {/* STEP 1 */}
              {step === 1 && (
                <motion.div key="step1" {...stepMotion} className="space-y-5">
                  <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                  <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                  <Input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} />
                  <Input type="password" name="password" placeholder="Create password" value={formData.password} onChange={handleChange} />

                  <PrimaryButton type="button" onClick={sendOtp}>
                    Send OTP →
                  </PrimaryButton>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div key="step2" {...stepMotion} className="space-y-5">
                  <Input
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-center tracking-widest text-lg"
                  />

                  <p className="text-center text-amber-400 font-medium">
                    OTP expires in {formatTime(timeLeft)}
                  </p>

                  {timeLeft === 0 && (
                    <SecondaryButton type="button" onClick={sendOtp}>
                      Resend OTP
                    </SecondaryButton>
                  )}

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-slate-400 underline"
                  >
                    ← Edit details
                  </button>

                  <PrimaryButton type="submit" disabled={otp.length !== 6}>
                    Verify & Register
                  </PrimaryButton>
                </motion.div>
              )}

            </AnimatePresence>
          </form>

          <p className="text-slate-400 text-center mt-8">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterTutor;

/* ---------- UI Helpers ---------- */

const StepCircle = ({ active, label }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full font-bold
      ${active ? "bg-indigo-500 text-white" : "bg-slate-700 text-slate-400"}`}
    >
      {label === "Details" ? "1" : "2"}
    </div>
    <span className="text-slate-300 text-sm">{label}</span>
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    required
    className={`w-full p-4 rounded-xl bg-slate-800 border border-slate-700
                text-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition ${className}`}
  />
);

const PrimaryButton = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    {...props}
    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600
               text-white font-semibold disabled:opacity-50"
  >
    {children}
  </motion.button>
);

const SecondaryButton = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    {...props}
    className="w-full py-3 rounded-xl bg-slate-700 text-white"
  >
    {children}
  </motion.button>
);
