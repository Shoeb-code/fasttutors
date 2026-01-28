import React, { useState } from "react";
import { UserPen, Globe, MessageCircle } from "lucide-react";

function HowItWorks() {
  const [mode, setMode] = useState("student");

  const steps =
    mode === "student"
      ? [
          {
            icon: <UserPen size={48} />,
            title: "Create Your Profile",
            desc: "Sign up as a student and tell us your learning requirements.",
            color: "text-blue-400",
          },
          {
            icon: <Globe size={48} />,
            title: "Get Tutor Matches",
            desc: "Receive notifications about tutors that match your needs.",
            color: "text-green-400",
          },
          {
            icon: <MessageCircle size={48} />,
            title: "Connect with Tutors",
            desc: "Communicate easily via call, WhatsApp, or messages.",
            color: "text-violet-400",
          },
        ]
      : [
          {
            icon: <UserPen size={48} />,
            title: "Create Tutor Profile",
            desc: "Register as a tutor and showcase your skills and experience.",
            color: "text-blue-400",
          },
          {
            icon: <Globe size={48} />,
            title: "Get Student Leads",
            desc: "Get notified when students are looking for tutors like you.",
            color: "text-green-400",
          },
          {
            icon: <MessageCircle size={48} />,
            title: "Contact Students",
            desc: "Reach students directly via call, SMS, or WhatsApp.",
            color: "text-violet-400",
          },
        ];

  return (
    <section className="bg-gradient-to-br from-black via-gray-950 to-gray-900
                        rounded-3xl m-6 px-6 py-16 text-white">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-amber-400 mb-4">
            How It Works
          </h2>
          <p className="text-gray-400">
            Simple steps to get started with FastTutors
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center gap-4 mb-14">
          <button
            onClick={() => setMode("student")}
            className={`px-6 py-3 rounded-full font-medium transition
              ${
                mode === "student"
                  ? "bg-amber-500 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
          >
            I’m a Student
          </button>

          <button
            onClick={() => setMode("teacher")}
            className={`px-6 py-3 rounded-full font-medium transition
              ${
                mode === "teacher"
                  ? "bg-amber-500 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
          >
            I’m a Tutor
          </button>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10
                         rounded-2xl p-6 text-center
                         hover:border-amber-400 hover:shadow-xl transition"
            >
              <div
                className={`flex justify-center items-center mb-5 ${step.color}`}
              >
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-amber-300 mb-2">
                {step.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
