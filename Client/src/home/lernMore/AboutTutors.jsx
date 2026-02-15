import React, { memo } from "react";
import Ab12 from "../../assets/ab1.jpg";
import Ab13 from "../../assets/ab2.jpg";
import Ab14 from "../../assets/ab3.jpg";
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
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 }
  }
};

function AboutTutors() {
  const cards = [
    {
      img: Ab12,
      title: "🏠 Offline Home Tuition",
      desc: "A tutor visits your home at scheduled times. Ideal for students who benefit from personal, face-to-face interaction.",
      accent: "from-emerald-400/20 to-transparent",
      text: "text-emerald-400"
    },
    {
      img: Ab13,
      title: "💻 Online Home Tuition",
      desc: "Learn live via Zoom or Google Meet. Perfect for students seeking flexibility and access to top tutors across regions.",
      accent: "from-sky-400/20 to-transparent",
      text: "text-sky-400"
    },
    {
      img: Ab14,
      title: "📅 Easy Scheduling",
      desc: "Plan sessions effortlessly using our integrated calendar system that works around your availability.",
      accent: "from-amber-400/20 to-transparent",
      text: "text-amber-400"
    }
  ];

  return (
    <section
      className="
      relative overflow-hidden
      bg-gradient-to-br from-[#050505] via-[#0b0f14] to-[#0f172a]
      px-6 py-20 text-white
    "
    >
      {/* ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Heading */}
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Home Tuition
          </span>{" "}
          <span className="text-white">(Online & Offline)</span>
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose flexible learning modes designed to fit every student’s needs.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            variants={item}
            className="
            group relative
            bg-white/5 backdrop-blur-2xl
            rounded-3xl p-6
            border border-white/10
            transition-all duration-500
            hover:-translate-y-2
            hover:bg-white/10
            "
          >
            {/* top gradient overlay */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl bg-gradient-to-b ${card.accent}`}
            />

            <img
              loading="lazy"
              src={card.img}
              alt={card.title}
              className="
              relative z-10
              w-full h-48 object-cover
              rounded-2xl mb-5
              transition duration-500
              group-hover:scale-[1.03]
            "
            />

            <h3
              className={`relative z-10 text-xl font-semibold mb-3 ${card.text}`}
            >
              {card.title}
            </h3>

            <p className="relative z-10 text-gray-300 text-sm leading-relaxed">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default memo(AboutTutors);
