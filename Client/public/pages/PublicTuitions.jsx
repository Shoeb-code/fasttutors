import { useEffect, useMemo, useState } from "react";
import axios from "../../src/axiosConfig.js";

import { motion } from "framer-motion";
import { Search, MapPin, IndianRupee, CalendarDays, BookOpen } from "lucide-react";

export default function PublicTuitionShowPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    subject: "",
    studentClass: "",
    mode: "",
    fee: "",
    location: "",
    sort: "newest",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/public/all-tuitions");
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Failed to fetch tuition posts", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (filters.subject) {
      result = result.filter((p) =>
        p.subject?.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }

    if (filters.studentClass) {
      result = result.filter(
        (p) => String(p.studentClass) === filters.studentClass
      );
    }

    if (filters.mode) {
      result = result.filter((p) => p.mode === filters.mode);
    }

    if (filters.location) {
      result = result.filter((p) =>
        p.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.fee) {
      result = result.filter((p) => Number(p.fee) <= Number(filters.fee));
    }

    result.sort((a, b) =>
      filters.sort === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    return result;
  }, [posts, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Public Tuition Requests
          </h1>
          <p className="text-zinc-400 text-lg">
            Discover the latest tuition enquiries and apply as a tutor.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6 shadow-2xl mb-8">
          <div className="grid md:grid-cols-5 gap-4">
            <input placeholder="Subject" className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-700 focus:border-indigo-500 outline-none" />
            <input placeholder="Class" className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-700 focus:border-indigo-500 outline-none" />
            <select className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-700 focus:border-indigo-500 outline-none">
              <option>All Modes</option>
              <option>online</option>
              <option>offline</option>
            </select>
            <input placeholder="Fee" className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-700 focus:border-indigo-500 outline-none" />
            <input placeholder="Location" className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-700 focus:border-indigo-500 outline-none" />
          </div>

          <div className="mt-5 flex justify-end">
            <select className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-700 focus:border-indigo-500 outline-none">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <motion.div
              key={post._id || post.id}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-semibold">
                  Class {post.studentClass}
                </span>
                <span className="text-sm text-zinc-400 flex items-center gap-2">
                  <CalendarDays size={16} />
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <BookOpen size={20} className="text-indigo-400" />
                {post.subject}
              </h2>

              <p className="text-zinc-400 mb-5 leading-7">
                {post.description || post.bio || "Tutor requirement posted by student."}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 text-sm mb-6">
                <div className="rounded-2xl bg-white/5 p-3"><strong>Mode:</strong> {post.mode || post.tuitionPlace}</div>
                <div className="rounded-2xl bg-white/5 p-3 flex items-center gap-1"><IndianRupee size={14} /> {post.fee}</div>
                <div className="rounded-2xl bg-white/5 p-3 flex items-center gap-2"><MapPin size={14} /> {post.location}</div>
                <div className="rounded-2xl bg-white/5 p-3">🔒 Phone hidden</div>
              </div>

              <button
                onClick={() => (window.location.href = '/tutor-register')}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 font-bold shadow-lg"
              >
                Apply as Tutor →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}