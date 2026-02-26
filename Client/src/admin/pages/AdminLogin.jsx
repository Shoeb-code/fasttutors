import { useState } from "react";
import adminAxios from "../adminAxios.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) return;

    try {
      setLoading(true);

      const { data } = await adminAxios.post("/admin/login", {
        email,
        password,
      });
      

      if (data.success) {
        
        localStorage.setItem("adminAccessToken",data.accessToken);
        navigate("/root-control-panel");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#050507] via-[#0a0b12] to-[#07080d]
      text-white px-4
    ">

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="
          w-full max-w-md
          p-[1px]
          rounded-3xl
          bg-gradient-to-b from-white/10 to-white/[0.02]
        "
      >
        <div className="
          bg-[#0b0d12]
          rounded-3xl
          p-10
          border border-white/10
          backdrop-blur-xl
          shadow-2xl
        ">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">
              FastTutors
              <span className="text-amber-400"> Admin</span>
            </h1>

            <p className="text-gray-400 text-sm mt-2">
              Secure Control Panel Access
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <input
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full p-3 rounded-xl
                bg-neutral-900
                border border-white/10
                focus:border-indigo-500
                focus:outline-none
                transition
              "
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full p-3 rounded-xl
                bg-neutral-900
                border border-white/10
                focus:border-indigo-500
                focus:outline-none
                transition
              "
            />
          </div>

          {/* LOGIN BUTTON */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            disabled={!email || !password || loading}
            onClick={login}
            className={`
              w-full py-3 rounded-xl font-semibold
              transition-all duration-300
              ${
                !email || !password
                  ? "bg-neutral-800 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90"
              }
            `}
          >
            {loading ? "Signing in..." : "Enter Control Panel"}
          </motion.button>

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Restricted Access — Admin Only
          </p>

        </div>
      </motion.div>
    </div>
  );
}
