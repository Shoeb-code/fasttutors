import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";

const StepOne = ({ onNext, data, setData }) => {
  const subjects = {
    "1": ["All Subjects", "Maths", "English", "EVS"],
    "2": ["All Subjects", "Maths", "English", "EVS"],
    "3": ["All Subjects", "Maths", "English", "EVS"],
    "4": ["All Subjects", "Maths", "English", "EVS"],
    "5": ["All Subjects", "Maths", "English", "EVS"],
    "6": ["All Subjects", "Maths and Science", "Maths", "Science", "English", "Hindi"],
    "7": ["All Subjects", "Maths and Science", "Maths", "Science", "English", "Hindi"],
    "8": ["All Subjects", "Maths and Science", "Maths", "Science", "English", "Hindi"],
    "9": ["All Subjects", "Maths And Science", "Maths, Science And Social Studies"],
    "10": ["All Subjects", "Maths And Science", "Maths, Science And Social Studies"],
    "11": ["Physics", "Chemistry", "Maths", "Biology"],
    "12": ["Physics", "Chemistry", "Maths", "Biology"],
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-7xl rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.15)] grid grid-cols-1 md:grid-cols-2 overflow-hidden"
      >
        {/* LEFT PANEL */}
        <div className="p-14 lg:p-16 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-red-500 tracking-wide">
              fast<span className="text-white">tutors</span>
            </h1>

            <div className="mt-10 space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Learn Better. Score Higher.
              </h2>
              <p className="text-gray-300 max-w-md leading-relaxed">
                Connect with verified tutors near you for personalized,
                one-to-one learning — online or offline.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-white/10">
            <p className="text-blue-400 text-lg italic">
              “The right tutor can change everything.” ✨
            </p>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="p-14 lg:p-16 bg-black/40">
          {/* Progress */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Step 1 of 3</p>
            <div className="h-2 bg-gray-800 rounded-full">
              <div className="h-2 w-1/3 bg-blue-600 rounded-full" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-blue-500 mb-1 flex items-center gap-2">
            <GraduationCap /> Find a Tutor
          </h2>
          <p className="text-gray-400 mb-8">
            Tell us your class & location
          </p>

          <div className="space-y-5">
            {/* Class */}
            <select
              className="input"
              value={data.studentClass}
              onChange={(e) =>
                setData({ ...data, studentClass: e.target.value, subject: "" })
              }
            >
              <option value="">Select Class</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Class {i + 1}
                </option>
              ))}
            </select>

            {/* Subject */}
            <select
              className="input"
              disabled={!data.studentClass}
              value={data.subject}
              onChange={(e) =>
                setData({ ...data, subject: e.target.value })
              }
            >
              <option value="">Select Subject</option>
              {(subjects[data.studentClass] || []).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Your Area / City"
                className="input pl-11"
                value={data.location}
                onChange={(e) =>
                  setData({ ...data, location: e.target.value })
                }
              />
            </div>

            {/* Landmark */}
            <input
              type="text"
              placeholder="Nearby Landmark (optional)"
              className="input"
              value={data.landmark}
              onChange={(e) =>
                setData({ ...data, landmark: e.target.value })
              }
            />

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              disabled={!data.studentClass || !data.subject || !data.location}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-40"
            >
              Continue →
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Input styles */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(31, 41, 55, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e5e7eb;
          outline: none;
        }
        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

export default StepOne;
