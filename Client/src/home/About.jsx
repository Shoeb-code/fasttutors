import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import im1 from "../assets/1.jpg";
import im2 from "../assets/2.jpg";
import im3 from "../assets/3.jpg";

export default function About() {
  return (
    <section
      id="about"
      className="bg-gradient-to-br from-black via-gray-950 to-gray-900
                 px-6 py-20 text-white"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10
                     rounded-3xl p-8 md:p-10"
        >
          <span className="inline-block mb-4 px-4 py-1 rounded-full
                           bg-blue-600/20 text-blue-400 text-sm font-medium">
            About FastTutors
          </span>

          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Learn Smarter with{" "}
            <span className="text-blue-500">FastTutors</span>
          </h2>

          <p className="text-gray-300 mb-8 leading-relaxed">
            FastTutors connects students with trusted educators through
            flexible, high-quality learning experiences — designed for
            today’s fast-moving world.
          </p>

          {/* FEATURES */}
          <div className="grid gap-4 mb-10">
            <Feature
              title="Interactive Online Learning"
              desc="Live Zoom-based classes for K–12 students with real-time interaction."
            />
            <Feature
              title="Personalized Tutoring"
              desc="One-on-one sessions tailored to each student’s learning pace."
            />
            <Feature
              title="Flexible & Transparent"
              desc="Pay per session, choose your tutor, and learn on your schedule."
            />
          </div>

          <Link to="/learn-more">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4
                         rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                         text-white font-semibold text-lg shadow-lg"
            >
              Explore More →
            </motion.button>
          </Link>
        </motion.div>

        {/* RIGHT IMAGE GRID */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-5"
        >
          <div className="col-span-2">
            <img
              src={im1}
              alt="Online learning"
              className="w-full h-60 object-cover rounded-3xl
                         border border-white/10 shadow-lg"
            />
          </div>

          <img
            src={im2}
            alt="Personal tutoring"
            className="w-full h-44  object-cover rounded-2xl
                       border border-white/10 shadow-md"
          />

          <img
            src={im3}
            alt="Interactive classes"
            className="w-full h-44 object-cover rounded-2xl
                       border border-white/10 shadow-md"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Feature Card ---------- */
const Feature = ({ title, desc }) => (
  <div className="bg-black/40 border border-white/5 rounded-xl p-4">
    <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
    <p className="text-sm text-gray-400">{desc}</p>
  </div>
);
