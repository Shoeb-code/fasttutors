import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextTutor.jsx";
import { AuthContextParent } from "../../context/AuthParent.jsx";
import { motion, AnimatePresence } from "framer-motion";

const drawerSpring = {
  type: "spring",
  stiffness: 320,
  damping: 30,
};

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideRight = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: drawerSpring,
};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { parentUser, logoutStudent } = useContext(AuthContextParent);
  const navigate = useNavigate();

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  // Close drawers on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenLogin(false);
        setOpenRegister(false);
        setOpenProfile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLogoutTutor = () => {
    logout();
    navigate("/tutor-login");
  };

  const handleLogoutStudent = () => {
    logoutStudent();
    navigate("/parent-login");
  };

  const linkBase = "px-4 py-2 rounded-lg text-sm font-medium transition";
  const active = "bg-amber-500 text-black";
  const inactive = "text-gray-300 hover:bg-gray-800 hover:text-white";

  return (
    <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/" className="text-2xl font-extrabold tracking-wide text-amber-400">
          Fast<span className="text-white">Tutors</span>
        </NavLink>

        {/* CENTER LINKS */}
        <div className="hidden md:flex items-center gap-3">
          {user?.role === "tutor" && (
            <>
              <NavLink to="/tutor/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                Dashboard
              </NavLink>
              <NavLink to="/tutor/tuitions-post" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                Tuitions
              </NavLink>
              <NavLink to="/tutor/edit-profile" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                Edit Profile
              </NavLink>
            </>
          )}

          {parentUser?.role === "student" && (
            <>
              <NavLink to="/parent/add-tuition" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                Add Tuition
              </NavLink>
              <NavLink to="/parent/search-tutors" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                Find Tutors
              </NavLink>
              <NavLink to="/parent/my-post" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
                My Posts
              </NavLink>
            </>
          )}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {!user && !parentUser && (
            <>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setOpenLogin(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Login
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setOpenRegister(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-black hover:bg-amber-400"
              >
                Register
              </motion.button>
            </>
          )}

          {(user || parentUser) && (
            <div className="relative">
              <button
                aria-label="Open profile menu"
                onClick={() => setOpenProfile((p) => !p)}
                className="flex items-center gap-2"
              >
                <img
                  src={user?.profilePhoto || parentUser?.profilePhoto || "/default-avatar.png"}
                  className="w-9 h-9 rounded-full object-cover border border-white/20"
                />
              </button>

              <AnimatePresence>
                {openProfile && (
                  <>
                    <motion.div
                      {...fade}
                      onClick={() => setOpenProfile(false)}
                      className="fixed inset-0 z-40"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-48 bg-neutral-900
                                 border border-white/10 rounded-xl shadow-xl z-50"
                    >
                      <div className="p-3 space-y-2 text-sm">
                        {user && (
                          <button
                            onClick={handleLogoutTutor}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-600 hover:text-white"
                          >
                            Logout Tutor
                          </button>
                        )}
                        {parentUser && (
                          <button
                            onClick={handleLogoutStudent}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-600 hover:text-white"
                          >
                            Logout Parent
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* LOGIN SLIDER */}
      <Drawer open={openLogin} onClose={() => setOpenLogin(false)} title="Login As">
        <DrawerLink to="/tutor-login" onClose={setOpenLogin}>Tutor</DrawerLink>
        <DrawerLink to="/parent-login" onClose={setOpenLogin}>Parent / Student</DrawerLink>
      </Drawer>

      {/* REGISTER SLIDER */}
      <Drawer open={openRegister} onClose={() => setOpenRegister(false)} title="Register As">
        <DrawerLink to="/tutor-register" onClose={setOpenRegister}>Tutor</DrawerLink>
        <DrawerLink to="/parent-register" onClose={setOpenRegister}>Parent / Student</DrawerLink>
      </Drawer>
    </nav>
  );
};

export default Navbar;

/* ================== PRODUCTION DRAWER ================== */

const Drawer = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          {...fade}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40"
        />
        <motion.aside
          role="dialog"
          aria-modal="true"
          {...slideRight}
          className="fixed top-0 right-0 h-full w-72 md:w-80
                     bg-neutral-900/95 backdrop-blur-xl
                     border-l border-white/10 z-50 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-amber-400">{title}</h2>
            <button
              aria-label="Close"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {children}
          </div>

          <div className="mt-auto pt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} FastTutors
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

const DrawerLink = ({ to, children, onClose }) => (
  <Link
    to={to}
    onClick={() => onClose(false)}
    className="p-4 rounded-xl bg-gray-800 text-white
               hover:bg-amber-500 hover:text-black transition"
  >
    {children}
  </Link>
);
