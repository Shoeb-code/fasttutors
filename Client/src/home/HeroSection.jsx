import React, { memo, useContext } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContextTutor";
import { AuthContextParent } from "../context/AuthParent";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function HeroSection() {

  const {user} =useContext(AuthContext)
  const {parentUser} =useContext(AuthContextParent);

  return (
    <section
      className="
      relative overflow-hidden
      bg-gradient-to-br
      from-[#0a0a0a]
      via-[#0f1115]
      to-[#111827]
      rounded-3xl
      m-6 px-6 md:px-10 py-16
      text-white
      border border-white/5
      shadow-[0_0_60px_rgba(0,0,0,0.5)]
    "
    >
      {/* subtle glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center"
      >
        {/* LEFT CONTENT */}
        <div>
          <motion.span
            variants={itemVariants}
            className="
            inline-block mb-5 px-4 py-1 rounded-full
            bg-amber-500/10 text-amber-400
            text-sm font-medium tracking-wide
            border border-amber-500/20
          "
          >
            Why Choose FastTutors?
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="
            text-4xl md:text-5xl
            font-extrabold leading-tight mb-6
            bg-gradient-to-r from-white to-gray-300
            bg-clip-text text-transparent
          "
          >
            Learn Smarter with{" "}
            <span className="text-amber-500">
              Trusted Tutors
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl"
          >
            FastTutors helps students find reliable one-on-one home tuition
            or online tutors anywhere in India. Learn at your own pace
            with personalized guidance — or earn extra income as a tutor.
          </motion.p>

          {/* FEATURES */}
          <motion.ul
            variants={containerVariants}
            className="space-y-3 mb-10"
          >
            {[
              "Low & transparent charges",
              "Fast and reliable tutor matching",
              "Best customer support",
              "Earn extra income as a tutor"
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-center gap-3 text-emerald-400"
              >
                <span className="text-lg">✔</span>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA BUTTONS */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
           {!user && !parentUser && (<Link to="/parent-register">
              <button
                className="
                px-8 py-4 rounded-xl
                bg-gradient-to-r from-amber-500 to-orange-600
                text-black font-bold text-lg
                shadow-lg
                transition-all duration-300
                hover:scale-[1.04]
                hover:shadow-amber-500/20
              "
              >
                Get Started →
              </button>
            </Link>)} 
            
 {!user && !parentUser && (<Link to="/tutor-register">
              <button
                className="
                px-8 py-4 rounded-xl
                border border-white/10
                text-white
                backdrop-blur-md
                transition-all duration-300
                hover:bg-white/5
              "
              >
                Become a Tutor
              </button>
            </Link>)}
            
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.img
            loading="lazy"
            src={assets.ch1}
            alt="Online tutoring"
            className="
            w-full max-w-md rounded-3xl
            border border-white/10
            shadow-2xl
            hover:scale-[1.02]
            transition duration-500
          "
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(HeroSection);
