import React, { useContext, useEffect, useState } from "react";
import axios from "../../axiosConfig.js";
import { AuthContext } from "../../context/AuthContextTutor.jsx";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utils/tokenService.js";

import {
  Users,
  BookOpen,
  BadgeCheck,
  Trophy,
  MessageCircle,
  Coins,
  History,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TutorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [dashboard, setDashboard] = useState(null);
  const [applyHistory, setApplyHistory] = useState([]);
  const [demoVideo, setDemoVideo] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DASHBOARD ================= */
  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/tutor/dashboard");
      if (data.success) {
        setDashboard(data);
        setDemoVideo(data.tutor?.demoVideo || "");
      }
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  /* ================= FETCH APPLY HISTORY ================= */
  const fetchApplyHistory = async () => {
    try {
      const { data } = await axios.get("/tutor/apply-history");
      if (data.success) {
        setApplyHistory(data.history);
      }
    } catch (err) {
      console.error("Apply history error:", err);
    }
  };

  /* ================= ON LOAD ================= */
  useEffect(() => {
    const token = getAccessToken();
    if (!user || !token) return;
  
    const loadData = async () => {
      try {
        await Promise.all([
          fetchDashboard(),
          fetchApplyHistory(),
        ]);
      } finally {
        setLoading(false); // 🔥 THIS WAS MISSING
      }
    };
  
    loadData();
  }, [user]);

  /* ================= SAVE DEMO VIDEO ================= */
  const saveDemoVideo = async () => {
    if (!demoVideo) return;

    try {
      const { data } = await axios.put("/tutor/demo-video", { demoVideo });
      if (data.success) {
        fetchDashboard();
      }
    } catch {
      alert("Failed to save demo video");
    }
  };

  if (loading || !dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  const {
    tutor,
    earnings = [],
    schedule = [],
    questions = [],
    chats = [],
  } = dashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 px-4 py-12 text-white">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-400">
            Tutor Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Welcome back, {tutor.firstName} 👋
          </p>
        </div>

        {/* PROFILE + COINS */}
        <Card>
          <div className="flex items-center gap-6">
            <img
              src={tutor.profilePhoto || "/default-avatar.png"}
              className="w-24 h-24 rounded-full border border-white/10"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-semibold">
                {tutor.firstName} {tutor.lastName}
              </h2>
              <p className="text-gray-400">{tutor.subject}</p>

              <div className="flex gap-3 mt-3">
                {tutor.badges?.verified && (
                  <Badge icon={<BadgeCheck />} label="Verified" />
                )}
                {tutor.badges?.topTutor && (
                  <Badge icon={<Trophy />} label="Top Tutor" />
                )}
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-300">Coins Balance</p>
              <p className="text-3xl font-extrabold text-amber-400 flex items-center gap-2">
                <Coins /> {tutor.coins}
              </p>
              <button
                onClick={() => navigate("/tutor/buy-coins")}
                className="mt-2 px-4 py-2 bg-amber-500 text-black rounded-xl"
              >
                Buy Coins
              </button>
            </div>
          </div>
        </Card>






        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Stat icon={<Users />} label="Students" value={schedule.length} />
          <Stat
            icon={<BookOpen />}
            label="Questions Solved"
            value={questions.reduce((a, b) => a + b.count, 0)}
          />
          <Stat icon={<Trophy />} label="Rating" value="4.8 ⭐" />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* EARNINGS */}
            <Card>
              <SectionTitle icon="📈" text="Earnings Overview" />
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={earnings}>
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#6366f1"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* QUESTIONS */}
            <Card>
              <SectionTitle icon="🧠" text="Question Solving History" />
              {questions.map((q, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{q.subject}</span>
                  <span className="text-indigo-400">{q.count}</span>
                </div>
              ))}
            </Card>



            {/* DEMO VIDEO */}
            <Card>
              <SectionTitle icon="🎥" text="Demo Teaching Video" />
              <input
                value={demoVideo}
                onChange={(e) => setDemoVideo(e.target.value)}
                placeholder="YouTube video link"
                className="input"
              />
              <button
                onClick={saveDemoVideo}
                className="mt-3 px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600"
              >
                Save Video
              </button>

              {demoVideo && (
                <iframe
                  className="mt-4 rounded-xl border border-white/10 w-full h-56"
                  src={demoVideo.replace("watch?v=", "embed/")}
                  allowFullScreen
                />
              )}
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">

          <Card>
  <SectionTitle icon={<History />} text="Tuition Apply History" />

  {applyHistory.length === 0 ? (
    <p className="text-sm text-gray-400">
      No tuitions applied yet
    </p>
  ) : (
    <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
      {applyHistory.map((h, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/10
                     bg-black/40 p-4 hover:border-indigo-400 transition"
        >
          {/* TOP */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="text-lg font-semibold text-indigo-300">
                {h.subject}
              </h4>
              <p className="text-sm text-gray-400">
                Class {h.studentClass}
              </p>
            </div>

            <span className="text-xs text-gray-500">
              {new Date(h.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* STUDENT INFO */}
          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
            <Info label="Student" value={h.name || "Student"} />
            <Info label="Phone" value={h.mobile || "N/A"} />
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
            <Info label="Coins Used" value={`-${h.coinCost} 🪙`} />
          </div>

          {/* STATUS */}
          <div className="flex justify-end">
            <span className="px-3 py-1 text-xs rounded-full
                             bg-green-500/10 text-green-400">
              Applied
            </span>
          </div>
        </div>
      ))}
    </div>
  )}
</Card>



            {/* CHAT */}
            <Card>
              <SectionTitle icon={<MessageCircle />} text="Student Chats" />
              {chats.map((c, i) => (
                <div key={i} className="text-sm">
                  <b>{c.studentName}:</b>{" "}
                  <span className="text-gray-400">{c.lastMessage}</span>
                </div>
              ))}
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;

/* ================= UI HELPERS ================= */

const Card = ({ children }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
    {children}
  </div>
);

const Stat = ({ icon, label, value }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex gap-4">
    <div className="text-indigo-400">{icon}</div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const Badge = ({ icon, label }) => (
  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm">
    {icon} {label}
  </span>
);

const SectionTitle = ({ icon, text }) => (
  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-indigo-300">
    {icon} {text}
  </h3>
);
const Info = ({ label, value }) => (
  <div className="bg-white/5 rounded-lg px-3 py-2">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm text-white font-medium">
      {value}
    </p>
  </div>
);