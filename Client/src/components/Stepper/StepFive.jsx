import { motion } from "framer-motion";
import React from "react";

function StepFive({ onNext, onPrev, data, setData }) {

  const checkPassword = () => {
    if (!data.password || data.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    if (data.password !== data.rePassword) {
      return alert("Passwords do not match");
    }

    onNext();
  };

  return (
    <div className="w-full border border-white/10 rounded-2xl p-6 lg:p-8 text-gray-200 bg-white/5 backdrop-blur-sm">

      {/* Progress */}
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-2">Step 5 of 6</p>
        <div className="h-2 bg-gray-800 rounded-full">
          <div className="h-2 w-5/6 bg-blue-600 rounded-full" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-2">
        Your Contact Details
      </h2>
      <p className="text-gray-400 mb-8">
        We’ll use this information to contact you securely
      </p>

      {/* Name */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-300 font-medium">
          Full Name
        </label>
        <input
          type="text"
          value={data.name}
          placeholder="John Doe"
          className="input"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-300 font-medium">
          Email Address
        </label>
        <input
          type="email"
          value={data.email}
          placeholder="johndoe@gmail.com"
          className="input"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>

      {/* Mobile */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-300 font-medium">
          Mobile Number
        </label>
        <input
          type="tel"
          value={data.mobile}
          placeholder="9876543210"
          className="input"
          onChange={(e) => setData({ ...data, mobile: e.target.value })}
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-300 font-medium">
          Create Password
        </label>
        <input
          type="password"
          value={data.password}
          placeholder="Minimum 6 characters"
          className="input"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>

      {/* Confirm Password */}
      <div className="mb-10">
        <label className="block mb-2 text-gray-300 font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          value={data.rePassword}
          placeholder="Re-enter password"
          className="input"
          onChange={(e) => setData({ ...data, rePassword: e.target.value })}
        />

        {data.rePassword && data.password !== data.rePassword && (
          <p className="text-red-400 text-sm mt-2">
            Passwords do not match
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={onPrev}
          className="px-10 py-4 rounded-xl border border-gray-500 text-gray-300
                     hover:bg-gray-800 transition font-semibold"
        >
          ← Previous
        </button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={checkPassword}
          disabled={!data.name || !data.email || !data.mobile}
          className="px-12 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white font-bold shadow-lg disabled:opacity-40"
        >
          Continue →
        </motion.button>
      </div>

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
}

export default StepFive;
