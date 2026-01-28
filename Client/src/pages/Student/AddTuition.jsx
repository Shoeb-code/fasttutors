import axios from "../../axiosConfig.js";
import React, { useContext, useEffect, useState } from "react";
import { AuthContextParent } from "../../context/AuthParent.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { pageMotion, cardMotion, hoverScale } from "../../ui/motion";
import { colors } from "../../ui/colors";

/* ================= SUBJECTS ================= */
const subjects = {
  "1": ["All Subjects", "Maths", "English", "EVS", "Hindi"],
  "2": ["All Subjects", "Maths", "English", "EVS", "Hindi"],
  "3": ["All Subjects", "Maths", "English", "EVS", "Hindi"],
  "4": ["All Subjects", "Maths", "English", "EVS", "Hindi"],
  "5": ["All Subjects", "Maths", "English", "EVS", "Hindi"],
  "6": ["All Subjects", "Maths", "Science", "Maths & Science", "English", "Hindi"],
  "7": ["All Subjects", "Maths", "Science", "Maths & Science", "English", "Hindi"],
  "8": ["All Subjects", "Maths", "Science", "Maths & Science", "English", "Hindi"],
  "9": ["Maths", "Science", "Social Science", "English", "Hindi"],
  "10": ["Maths", "Science", "Social Science", "English", "Hindi"],
  "11": ["Physics", "Chemistry", "Maths", "Biology", "Commerce", "Economics"],
  "12": ["Physics", "Chemistry", "Maths", "Biology", "Commerce", "Economics"],
};

/* ================= FEE LOGIC ================= */
const getSuggestedFee = (cls, mode) => {
  if (!cls) return 3000;

  const base =
    cls <= 5 ? 2000 :
    cls <= 8 ? 3000 :
    cls <= 10 ? 4000 :
    5500;

  const factor =
    mode === "online" ? 0.8 :
    mode === "tutor_home" ? 0.9 :
    1;

  return Math.round(base * factor);
};

export default function AddTuition() {
  const { parentUser } = useContext(AuthContextParent);
  const navigate = useNavigate();

  useEffect(() => {
    if (!parentUser) navigate("/parent-login");
  }, [parentUser]);

  const [formData, setFormData] = useState({
    studentClass: "",
    subject: "",
    location: "",
    landmark: "",
    pincode: "",
    tuitionPlace: "",
    classInWeek: "",
    gender: "any",
    fee: 3000,
    bio: "",
  });

  useEffect(() => {
    if (formData.studentClass && formData.tuitionPlace) {
      setFormData((p) => ({
        ...p,
        fee: getSuggestedFee(Number(p.studentClass), p.tuitionPlace),
      }));
    }
  }, [formData.studentClass, formData.tuitionPlace]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/parent/add-tuition", formData);
      if (data.success) {
        alert("Tuition posted successfully 🎉");
        navigate("/parent/my-post");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post tuition");
    }
  };

  return (
    <motion.div
      {...pageMotion}
      className={`min-h-screen bg-gradient-to-br ${colors.bg} px-4 py-20 text-white`}
    >
      <motion.form
        {...cardMotion}
        onSubmit={handleSubmit}
        className={`max-w-5xl mx-auto ${colors.card}
                    rounded-3xl p-12 space-y-14`}
      >

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-400">
            Post Tuition Requirement
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Share your requirement and get matched with verified tutors near you.
          </p>
        </div>

        <Divider />

        <AnimatedSection index={1} title="Academic Details">
          <Grid>
            <Select
              label="Student Class"
              name="studentClass"
              value={formData.studentClass}
              onChange={handleChange}
              options={Object.keys(subjects)}
            />
            <Select
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={!formData.studentClass}
              options={subjects[formData.studentClass] || []}
            />
          </Grid>
        </AnimatedSection>

        <AnimatedSection index={2} title="Location Details">
          <Grid>
            <Input label="Area / Locality" name="location" value={formData.location} onChange={handleChange} />
            <Input label="Nearby Landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
          </Grid>
          <Grid cols={3}>
            <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
            <Input label="Classes / Week" name="classInWeek" value={formData.classInWeek} onChange={handleChange} />
            <div />
          </Grid>
        </AnimatedSection>

        <AnimatedSection index={3} title="Tuition Mode">
          <Pills
            name="tuitionPlace"
            selected={formData.tuitionPlace}
            onChange={handleChange}
            values={[
              { label: "At Home", value: "home" },
              { label: "Tutor Home", value: "tutor_home" },
              { label: "Online", value: "online" },
            ]}
          />
        </AnimatedSection>

        <AnimatedSection index={4} title="Monthly Budget">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Selected Budget</span>
            <span className="text-2xl font-bold text-amber-400">
              ₹ {formData.fee}
            </span>
          </div>

          <input
            type="range"
            min={1000}
            max={10000}
            step={500}
            value={formData.fee}
            onChange={(e) =>
              setFormData({ ...formData, fee: Number(e.target.value) })
            }
            className="w-full accent-indigo-500"
          />

          <p className="text-xs text-gray-500 mt-2">
            Automatically suggested based on class & tuition mode
          </p>
        </AnimatedSection>

        <AnimatedSection index={5} title="Requirement Description">
          <textarea
            name="bio"
            rows={5}
            value={formData.bio}
            onChange={handleChange}
            placeholder="Mention board, preferred timing, expectations, etc."
            className="w-full rounded-xl bg-gray-950 border border-gray-700
                       px-4 py-4 text-white focus:ring-2
                       focus:ring-indigo-500 outline-none resize-none"
          />
        </AnimatedSection>

        <Divider />

        <motion.button
          {...hoverScale}
          type="submit"
          className={`w-full py-5 rounded-2xl bg-gradient-to-r ${colors.primary}
                      text-white font-extrabold text-lg tracking-wide`}
        >
          🚀 Publish Tuition Request
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

/* ================= UI HELPERS ================= */

const Divider = () => (
  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
);

const AnimatedSection = ({ title, index, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="space-y-6"
  >
    <h2 className="text-xl font-semibold text-indigo-300">
      {index}. {title}
    </h2>
    <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
      {children}
    </div>
  </motion.section>
);

const Grid = ({ children, cols = 2 }) => {
  const gridCols = cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return <div className={`grid grid-cols-1 ${gridCols} gap-6`}>{children}</div>;
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block mb-2 text-sm text-gray-300">{label}</label>
    <input
      {...props}
      className="w-full bg-gray-950 border border-gray-700 rounded-xl
                 px-4 py-3 text-white focus:ring-2
                 focus:ring-indigo-500 outline-none"
    />
  </div>
);

const Select = ({ label, options = [], ...props }) => (
  <div>
    <label className="block mb-2 text-sm text-gray-300">{label}</label>
    <select
      {...props}
      className="w-full bg-gray-950 border border-gray-700 rounded-xl
                 px-4 py-3 text-white focus:ring-2
                 focus:ring-indigo-500 outline-none"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

const Pills = ({ name, values, selected, onChange }) => (
  <div className="flex flex-wrap gap-4">
    {values.map(({ label, value }) => (
      <label
        key={value}
        className={`px-6 py-2 rounded-full cursor-pointer font-semibold
          ${selected === value
            ? "bg-indigo-500 text-white"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={selected === value}
          onChange={onChange}
          className="hidden"
        />
        {label}
      </label>
    ))}
  </div>
);
