import axios from "../../axiosConfig.js";
import React, { useContext, useEffect, useState } from "react";
import { AuthContextParent } from "../../context/AuthParent.jsx";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { pageMotion, cardMotion, hoverScale } from "../../ui/motion";
import { colors } from "../../ui/colors";

function MyEnquery() {
  const navigate = useNavigate();
  const { parentUser } = useContext(AuthContextParent);

  const [myEnquiries, setMyEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  /* ================= FETCH DATA ================= */
  const fetchMyData = async () => {
    try {
      const { data } = await axios.get("/parent/my-post");
      if (data.success) setMyEnquiries(data.request);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (!parentUser) {
      navigate("/parent-login");
      return;
    }
    fetchMyData();
  }, [parentUser]);

  /* ================= EDIT ================= */
  const editformdata = (req) => {
    setEditId(req._id);
    setEditForm({
      location: req.location,
      landmark: req.landmark,
      pincode: req.pincode,
      classInWeek: req.classInWeek,
      fee: req.fee,
      bio: req.bio,
    });
  };

  const handleChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const updatedData = async () => {
    try {
      const { data } = await axios.put(`/parent/request/${editId}`, editForm);
      if (data.success) {
        fetchMyData();
        setEditId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= DELETE ================= */
  const deleteMyEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      const { data } = await axios.delete(`/parent/request/${id}`);
      if (data.success) {
        setMyEnquiries((p) => p.filter((e) => e._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= UI ================= */
  return (
    <motion.div
      {...pageMotion}
      className={`min-h-screen bg-gradient-to-br ${colors.bg} px-4 py-16 text-white`}
    >
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10 space-y-2">
        <h1 className="text-4xl font-extrabold text-amber-400">
          My Tuition Enquiries
        </h1>
        <p className="text-gray-400">
          View, edit or remove your posted tuition requirements
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto">
        {loading && (
          <p className="text-center text-indigo-400 animate-pulse">
            Loading enquiries...
          </p>
        )}

        {!loading && myEnquiries.length === 0 && (
          <motion.div
            {...cardMotion}
            className={`${colors.card} rounded-2xl p-10 text-center text-gray-400`}
          >
            No enquiries posted yet
          </motion.div>
        )}

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {myEnquiries.map((val) => (
            <motion.div
              key={val._id}
              {...cardMotion}
              whileHover={{ scale: 1.02 }}
              className={`${colors.card} rounded-2xl p-6 space-y-4`}
            >
              {/* TOP */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">
                    {val.subject} Tutor Required
                  </h2>
                  <p className="text-sm text-gray-400">
                    Class {val.studentClass}
                  </p>
                </div>

                <span className="px-4 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold">
                  ₹ {val.fee}
                </span>
              </div>

              {/* INFO GRID */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Info label="Location" value={val.location} />
                <Info label="Pincode" value={val.pincode} />
                <Info label="Classes / Week" value={val.classInWeek} />
                <Info label="Gender" value={val.gender} />
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {val.bio}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-2">
                <motion.button
                  {...hoverScale}
                  onClick={() => editformdata(val)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black text-sm font-semibold"
                >
                  Edit
                </motion.button>

                <motion.button
                  {...hoverScale}
                  onClick={() => deleteMyEnquiry(val._id)}
                  className="px-4 py-2 rounded-xl bg-red-600 text-sm"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      <AnimatePresence>
        {editId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40"
              onClick={() => setEditId(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-md bg-neutral-900 rounded-2xl border border-white/10">
                <div className="px-6 py-4 border-b border-white/10 flex justify-between">
                  <h2 className="text-lg font-semibold text-amber-400">
                    Edit Enquiry
                  </h2>
                  <button onClick={() => setEditId(null)}>✕</button>
                </div>

                <div className="px-6 py-5 space-y-4">
                  <Input name="fee" value={editForm.fee} onChange={handleChange} placeholder="Monthly Fee" />
                  <Input name="classInWeek" value={editForm.classInWeek} onChange={handleChange} placeholder="Classes / week" />
                  <Input name="location" value={editForm.location} onChange={handleChange} placeholder="Location" />
                  <Input name="landmark" value={editForm.landmark} onChange={handleChange} placeholder="Landmark" />
                  <Input name="pincode" value={editForm.pincode} onChange={handleChange} placeholder="Pincode" />

                  <textarea
                    name="bio"
                    rows={4}
                    value={editForm.bio}
                    onChange={handleChange}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white"
                  />
                </div>

                <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
                  <button onClick={() => setEditId(null)}>Cancel</button>
                  <button
                    onClick={updatedData}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MyEnquery;

/* ================= HELPERS ================= */

const Info = ({ label, value }) => (
  <div className="bg-black/30 border border-white/5 rounded-xl p-3">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm font-medium">{value || "-"}</p>
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full rounded-xl bg-neutral-800 border border-neutral-700
               px-4 py-2 text-white focus:ring-2
               focus:ring-amber-500 outline-none"
  />
);
