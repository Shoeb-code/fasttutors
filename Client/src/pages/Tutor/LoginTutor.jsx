import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContextTutor";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginTutor = () => {
  const { loginTutor } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginTutor(formData);

    if (result.success) {
      navigate("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2
                   bg-white/5 backdrop-blur-xl border border-white/10
                   rounded-3xl shadow-[0_0_80px_rgba(34,197,94,0.25)]
                   overflow-hidden"
      >
        {/* LEFT BRAND PANEL */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-gray-600/20 to-gray-600/10">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-wide">
              Fast<span className="text-green-600">Tutors</span>
            </h1>
            <p className="mt-4 text-gray-300 text-lg">
              Teach. Inspire. Transform.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <p className="text-xl text-green-600 italic">
              “Teaching is the profession that teaches all other professions.”
            </p>

            <p className="text-gray-400">
              Join thousands of tutors shaping young minds across India.
            </p>
          </div>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FastTutors · Tutor Portal
          </p>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-white mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-300 mb-8">
            Login to continue your teaching journey 🚀
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="example@mail.com"
                onChange={handleChange}
                required
                className="w-full bg-gray-950 border border-gray-700 rounded-xl
                           p-3 text-white placeholder-gray-500
                           focus:ring-2 focus:ring-green-500 focus:border-green-500
                           outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full bg-gray-950 border border-gray-700 rounded-xl
                           p-3 text-white placeholder-gray-500
                           focus:ring-2 focus:ring-green-500 focus:border-green-500
                           outline-none transition"
              />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 rounded-xl
                         bg-gradient-to-r from-green-700 to-green-700
                         text-black font-bold text-lg
                         shadow-lg"
            >
              🔑 Login as Tutor
            </motion.button>
          </form>

          {/* Bottom Text */}
          <p className="text-gray-400 text-sm text-center mt-8">
            New to FastTutors?{" "}
            <a
              href="/register"
              className="text-green-600 hover:underline font-medium"
            >
              Create Tutor Account
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginTutor;
