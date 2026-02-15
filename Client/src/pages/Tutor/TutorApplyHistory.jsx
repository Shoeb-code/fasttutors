import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { motion } from "framer-motion";
import { Trash2, CalendarDays, BookOpen, Phone } from "lucide-react";

export default function TutorApplyHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchHistory = async () => {
    try {
      const { data } = await axios.get("/tutor/apply-history");
      if (data.success) {
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  /* ================= DELETE ================= */
  const deleteHistory = async (id) => {
    console.log("DELETE CLICKED:", id);
    if (!id) return; // safety check

    const confirmDelete = window.confirm(
      "Delete this applied tuition?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(`/tutor/apply-history/${id}`);

      if (data.success) {
        setHistory((prev) =>
          prev.filter((item) => item._id !== id)
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete history");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading history...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-amber-400">
            My Applied Tuitions
          </h1>
          <p className="text-gray-400 mt-2">
            Track all your applied tuition history in one place.
          </p>
        </div>

        {/* EMPTY */}
        {history.length === 0 ? (
          <p className="text-center text-gray-400">
            No applied tuitions yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {history.map((h, i) => (
              <motion.div
                key={h._id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="relative rounded-3xl p-[1px] bg-gray-800"
              >
                {/* CARD */}
                <div className="bg-gray-950 rounded-3xl p-6 h-full border border-white/10">

                  {/* SUBJECT */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
                      <BookOpen size={18} /> {h.subject}
                    </h3>

                    <button
                      onClick={() => deleteHistory(h._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* DATE */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <CalendarDays size={14} />
                    {new Date(h.createdAt).toLocaleString()}
                  </div>

                  {/* INFO */}
                  <div className="space-y-3 text-sm">
                    <Info label="Student" value={h.name || "Student"} />
                    <Info
                      icon={<Phone size={14} />}
                      label="Phone"
                      value={h.mobile || "N/A"}
                    />
                    <Info label="Class" value={h.studentClass} />
                    <Info
                      label="Mode"
                      value={
                        h.tuitionPlace === "online"
                          ? "Online"
                          : h.tuitionPlace === "home"
                          ? "Home Tuition"
                          : "Offline"
                      }
                    />
                  </div>

                  {/* STATUS */}
                  <div className="mt-6 flex justify-end">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                      Applied
                    </span>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= INFO COMPONENT ================= */

const Info = ({ label, value, icon }) => (
  <div className="flex justify-between items-center bg-gray-800 rounded-xl px-4 py-2">
    <span className="text-gray-400 flex items-center gap-1">
      {icon} {label}
    </span>
    <span className="text-white font-medium">{value}</span>
  </div>
);
