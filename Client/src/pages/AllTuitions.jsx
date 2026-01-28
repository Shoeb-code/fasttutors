import React, { useEffect, useMemo, useState } from "react";
import axios from "../axiosConfig.js";
import { motion } from "framer-motion";
import {
  Coins,
  MapPin,
  CalendarDays,
  Laptop,
  Home,
  Phone,
} from "lucide-react";

/* ================= UTIL ================= */
const maskPhone = (phone) => {
  if (!phone) return "**********";
  const str = String(phone);
  if (str.length <= 2) return "**";
  return "*".repeat(str.length - 2) + str.slice(-2);
};

function AllTuitions() {
  const [allTuitions, setAllTuitions] = useState([]);
  const [filteredTuitions, setFilteredTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [subjectFilter, setSubjectFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [modeFilter, setModeFilter] = useState("all");

  /* ================= FETCH ================= */
  const fetchAllTuitions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/tutor/request");
      if (data.success) setAllTuitions(data.request);
    } catch (err) {
      console.error("Fetch tuitions error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTuitions();
  }, []);

  /* ================= FILTER ================= */
  useEffect(() => {
    let filtered = [...allTuitions];

    if (subjectFilter !== "all") {
      filtered = filtered.filter((i) => i.subject === subjectFilter);
    }

    if (locationFilter.trim()) {
      filtered = filtered.filter(
        (i) =>
          i.location &&
          i.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (modeFilter !== "all") {
      filtered = filtered.filter((i) => i.tuitionPlace === modeFilter);
    }

    setFilteredTuitions(filtered);
  }, [subjectFilter, locationFilter, modeFilter, allTuitions]);

  const subjects = useMemo(
    () => ["all", ...new Set(allTuitions.map((i) => i.subject))],
    [allTuitions]
  );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  /* ================= APPLY ================= */
  const handleApply = async (tuitionId) => {
    try {
      const { data } = await axios.post("/tutor/apply", { tuitionId });

      if (data.success) {
        fetchAllTuitions(); // refresh cards
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to apply. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center
                      bg-gradient-to-br from-black to-gray-900 text-white">
        Loading enquiries...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900
                    text-white px-6 py-12">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold
                       bg-gradient-to-r from-cyan-400 to-indigo-500
                       bg-clip-text text-transparent">
          Tuition Enquiries
        </h1>
        <p className="text-gray-400 mt-1">
          Browse verified student requirements
        </p>
      </div>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-xl
                      border border-white/10 rounded-2xl p-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div>
            <label className="text-sm text-gray-300">Subject</label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3"
            >
              {subjects.map((sub, i) => (
                <option key={i} value={sub}>
                  {sub === "all" ? "All Subjects" : sub}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">Location</label>
            <input
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Jamia Nagar"
              className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Mode</label>
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3"
            >
              <option value="all">All Modes</option>
              <option value="online">Online</option>
              <option value="home">Offline / Home</option>
            </select>
          </div>

          <div className="flex items-end text-sm text-gray-400">
            Showing
            <span className="mx-1 text-white font-semibold">
              {filteredTuitions.length}
            </span>
            results
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTuitions.map((enquiry, index) => (
          <motion.div
            key={enquiry._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/60
                       border border-white/10 rounded-2xl p-6
                       hover:border-amber-400 transition"
          >
            {/* TOP */}
            <div className="flex justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-cyan-400">
                  {enquiry.subject}
                </h3>
                <p className="text-sm text-gray-400">
                  Class {enquiry.studentClass}
                </p>
              </div>
              <span className="text-xs text-amber-400">
                {formatDate(enquiry.createdAt)}
              </span>
            </div>

            <p className="text-sm text-gray-300 flex items-center gap-1">
              <MapPin size={14} /> {enquiry.location}
            </p>

            <p className="text-sm text-gray-300 mt-1 flex items-center gap-1">
              <CalendarDays size={14} /> {enquiry.classInWeek} classes / week
            </p>

            {/* PHONE */}
            <p className="text-sm text-gray-300 mt-2 flex items-center gap-1">
              <Phone size={14} />
              {enquiry.hasApplied
                ? enquiry.mobile
                : maskPhone(enquiry.mobile)}
            </p>

            {/* MODE */}
            <div className="mt-3">
              {enquiry.tuitionPlace === "online" ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full
                                 bg-blue-500/20 text-blue-400 text-xs">
                  <Laptop size={12} /> Online
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full
                                 bg-green-500/20 text-green-400 text-xs">
                  <Home size={12} /> Offline
                </span>
              )}
            </div>

            {/* BIO */}
            <div className="mt-4 bg-black/40 p-3 rounded-xl border border-white/10 text-sm">
              <p className="font-medium mb-1 text-gray-200">
                Requirement
              </p>
              <p className="line-clamp-3 text-gray-400">
                {enquiry.bio}
              </p>
            </div>

            {/* FOOTER */}
            <div className="mt-5 flex items-center justify-between">
              <div>
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Coins size={16} /> {enquiry.coinCost} coins
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  👥 Applied: {enquiry.appliedCount} / 5
                </p>
              </div>

              <button
                disabled={enquiry.isClosed || enquiry.hasApplied}
                onClick={() => handleApply(enquiry._id)}
                className={`px-5 py-2 rounded-xl font-semibold
                  ${
                    enquiry.isClosed || enquiry.hasApplied
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:shadow-lg"
                  }`}
              >
                {enquiry.isClosed
                  ? "Closed"
                  : enquiry.hasApplied
                  ? "Applied"
                  : "Apply Now"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AllTuitions;
