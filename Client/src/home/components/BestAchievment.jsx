import React, { memo } from "react";
import { assets } from "../../assets/assets";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { TbDeviceIpadSearch } from "react-icons/tb";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

function BestAchievment() {
  const stats = [
    {
      icon: <FaChalkboardTeacher className="text-amber-400 text-4xl" />,
      value: "48000+",
      label: "Expert Tutors"
    },
    {
      icon: <GoTrophy className="text-emerald-400 text-4xl" />,
      value: "21000+",
      label: "Total Students"
    },
    {
      icon: <TbDeviceIpadSearch className="text-sky-400 text-4xl" />,
      value: "28000+",
      label: "Enquiry Served"
    }
  ];

  return (
    <section
      className="
      relative overflow-hidden
      bg-gradient-to-br from-[#0a0a0a] via-[#0f1115] to-[#111827]
      rounded-3xl
      m-6 p-6 md:p-10
      text-white
      shadow-[0_0_60px_rgba(0,0,0,0.5)]
    "
    >
      {/* soft glow background */}
      <div className="absolute -right-32 -top-32 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* TOP CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <motion.div variants={item} className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              Our Best Achievements
            </h1>

            <ul className="space-y-4 text-[16px] p-6 bg-white/5 backdrop-blur-xl rounded-2xl text-gray-300">
              <li>
                1. Growing User base: Demonstrates the faith of students and
                teachers in our credible services.
              </li>
              <li>
                2. Successful Tutor-Student Matches: Shows our ability to bridge
                student and tutor needs.
              </li>
              <li>
                3. Positive Feedback and Testimonials: Reflects tutoring quality
                and builds trust.
              </li>
              <li>
                4. Improved Academic Performance: Showcases real success stories
                with tangible results.
              </li>
            </ul>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            variants={item}
            className="flex justify-center"
          >
            <img
              loading="lazy"
              src={assets.boy}
              alt="student learning"
              className="
              h-[320px] md:h-[360px]
              rounded-3xl
              shadow-2xl
              border border-white/10
              hover:scale-[1.02]
              transition duration-500
            "
            />
          </motion.div>
        </div>

        {/* STATS SECTION */}
        <motion.div
          variants={container}
          className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
          gap-6
        "
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={item}
              className="
              bg-white/5 backdrop-blur-xl
              p-6 rounded-2xl
              flex items-center gap-5
              hover:bg-white/10
              transition-all duration-300
            "
            >
              {s.icon}
              <div>
                <h1 className="font-bold text-2xl text-white">
                  {s.value}
                </h1>
                <h2 className="text-gray-300 text-lg">
                  {s.label}
                </h2>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(BestAchievment);
