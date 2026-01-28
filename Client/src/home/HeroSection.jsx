import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-black via-gray-950 to-gray-900
                        rounded-3xl m-6 px-8 py-16 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-4 px-4 py-1 rounded-full
                           bg-amber-500/20 text-amber-400 text-sm font-medium">
            Why Choose FastTutors?
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Learn Smarter with{" "}
            <span className="text-amber-500">Trusted Tutors</span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            FastTutors helps students find reliable one-on-one home tuition
            or online tutors anywhere in India. Learn at your own pace
            with personalized guidance — or earn extra income as a tutor.
          </p>

          {/* FEATURES */}
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-green-400">
              <span className="text-xl">✔</span> Low & transparent charges
            </li>
            <li className="flex items-center gap-3 text-green-400">
              <span className="text-xl">✔</span> Fast and reliable tutor matching
            </li>
            <li className="flex items-center gap-3 text-green-400">
              <span className="text-xl">✔</span> Best customer support
            </li>
            <li className="flex items-center gap-3 text-green-400">
              <span className="text-xl">✔</span> Earn extra income as a tutor
            </li>
          </ul>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap gap-4">
            <Link to="/learn-more">
              <button className="px-8 py-4 rounded-xl
                                 bg-gradient-to-r from-amber-500 to-orange-600
                                 text-black font-bold text-lg
                                 hover:scale-[1.03] transition shadow-lg">
                Get Started →
              </button>
            </Link>

            <Link to="/register">
              <button className="px-8 py-4 rounded-xl
                                 border border-gray-600 text-white
                                 hover:bg-gray-800 transition">
                Become a Tutor
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src={assets.ch1}
            alt="Online tutoring"
            className="w-full max-w-md rounded-3xl
                       border border-white/10 shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}
