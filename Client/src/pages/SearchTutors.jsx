import axios from "../axiosConfig.js";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SubjectCard from "../components/SubjectCard.jsx";

import { pageMotion, cardMotion } from "../ui/motion";
import { colors } from "../ui/colors";

const SearchTutors = () => {
  const [allTutors, setAllTutors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [queryData, setQueryData] = useState({
    subject: "",
    city: "",
    mode: "",
  });

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setQueryData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= DEBOUNCED SEARCH ================= */
  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "/parent/auth/parent/tutor-search", // ✅ FIXED ROUTE
          {
            params: queryData,
            signal: controller.signal,
          }
        );

        if (data.success) {
          setAllTutors(data.users || []);
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error("Search error:", error);
        }
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [queryData]);

  return (
    <motion.div
      {...pageMotion}
      className={`min-h-screen bg-gradient-to-br ${colors.bg} text-white px-6 py-12`}
    >
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-400">
          Find Your Perfect Tutor
        </h1>
        <p className="text-gray-400 mt-2">
          Search by subject, city & teaching mode
        </p>
      </div>

      {/* SEARCH PANEL */}
      <motion.div
        {...cardMotion}
        className={`max-w-6xl mx-auto ${colors.card} rounded-2xl p-6`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <input
            type="text"
            name="subject"
            value={queryData.subject}
            onChange={handleChange}
            placeholder="📘 Subject (Maths, Physics...)"
            className="bg-gray-950 border border-gray-700 rounded-xl
                       px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="text"
            name="city"
            value={queryData.city}
            onChange={handleChange}
            placeholder="📍 City (Delhi, Noida...)"
            className="bg-gray-950 border border-gray-700 rounded-xl
                       px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <select
            name="mode"
            value={queryData.mode}
            onChange={handleChange}
            className="bg-gray-950 border border-gray-700 rounded-xl
                       px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">🎓 All Modes</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </motion.div>

      {/* RESULTS */}
      <div className="max-w-6xl mx-auto mt-12">

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-indigo-400 animate-pulse"
          >
            Searching tutors...
          </motion.p>
        )}

        {!loading && allTutors.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500"
          >
            No tutors found
          </motion.p>
        )}

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
        >
          {allTutors.map((tutor) => (
            <motion.div
              key={tutor._id}
              {...cardMotion}
              whileHover={{ scale: 1.03 }}
            >
              <SubjectCard tutor={tutor} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SearchTutors;
