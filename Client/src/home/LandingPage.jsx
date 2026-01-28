import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextTutor";
import { AuthContextParent } from "../context/AuthParent";

import HeroSection from "./HeroSection";
import InfoSection from "./InfoSection";
import Footer from "./Footer";
import About from "./About";
import HowItWorks from "./components/HowItWorks";
import BestAchievment from "./components/BestAchievment";
import StudentAndTeacher from "./components/StudentAndTeacher";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const { parentUser } = useContext(AuthContextParent);

  return (
    <div className="font-sans bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">

      {/* ================= HERO INTRO ================= */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Find the <span className="text-amber-400">Best Tutors</span> Near You
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Connect with verified tutors for online or home tuition and
            take your learning to the next level.
          </p>

          {!user && !parentUser && (
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/parent-register"
                className="px-8 py-4 rounded-xl
                           bg-gradient-to-r from-blue-500 to-indigo-600
                           text-white font-bold text-lg
                           hover:scale-[1.05] transition shadow-lg"
              >
                Find a Tutor
              </Link>

              <Link
                to="/tutor-register"
                className="px-8 py-4 rounded-xl
                           border border-white/20 text-white
                           hover:bg-white/10 transition"
              >
                Become a Tutor
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-amber-400">
            About FastTutors
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            A trusted platform connecting students and tutors across India.
          </p>
        </div>
        <About />
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <HowItWorks />

      {/* ================= FEATURES ================= */}
      <HeroSection />

      {/* ================= ACHIEVEMENTS ================= */}
      <BestAchievment />

      {/* ================= STUDENT / TEACHER CTA ================= */}
      <StudentAndTeacher />

      {/* ================= TESTIMONIALS ================= */}
      <InfoSection />

      {/* ================= FINAL CTA ================= */}
      {!user && !parentUser && (
        <section className="bg-gradient-to-r from-gray-950 to-gray-950 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join FastTutors today and connect with the right tutor in minutes.
            </p>

            <Link
              to="/register"
              className="inline-block px-10 py-4 rounded-xl
                         bg-amber-400 text-black
                         font-bold text-lg
                         hover:bg-amber-300 hover:scale-[1.05]
                         transition shadow-xl"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      )}

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default LandingPage;
