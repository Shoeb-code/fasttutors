import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextTutor.jsx";
import { AuthContextParent } from "../../context/AuthParent.jsx";
import { motion, AnimatePresence } from "framer-motion";

/* ================= MOTION ================= */

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

/* ================= NAVBAR ================= */

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { parentUser, logoutStudent } = useContext(AuthContextParent);
  const navigate = useNavigate();

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

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

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/" className="text-2xl font-extrabold tracking-wide text-amber-400">
          Fast<span className="text-white">Tutors</span>
        </NavLink>


{/* CENTER PUBLIC LINKS */}
<div className="hidden md:flex items-center gap-8">

  <NavLink
    to="/all-tuitions"
    className={({ isActive }) =>
      `text-sm font-medium transition ${
        isActive
          ? "text-amber-400"
          : "text-neutral-300 hover:text-white"
      }`
    }
  >
    All Tuitions
  </NavLink>

  <NavLink
    to="/study-materials"
    className={({ isActive }) =>
      `text-sm font-medium transition ${
        isActive
          ? "text-blue-400"
          : "text-neutral-300 hover:text-white"
      }`
    }
  >
    Study Materials
  </NavLink>

</div>


        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {!user && !parentUser && (
            <>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenLogin(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
              >
                Login
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenRegister(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-black"
              >
                Register
              </motion.button>
            </>
          )}

          {(user || parentUser) && (
         <motion.button
         onClick={() => setOpenProfile(true)}
         initial={{ scale: 1 }}
         whileHover={{
           scale: 1.08,
           y: -2,
         }}
         whileTap={{ scale: 0.92 }}
         transition={{ type: "spring", stiffness: 350, damping: 18 }}
         className="relative group"
       >
         {/* Glow ring */}
         <span
           className="
             absolute inset-0 rounded-full
             ring-2 ring-transparent
             group-hover:ring-blue-600
             transition duration-300
           "
         />
       
         {/* Avatar */}
         <motion.img
           src={user?.profilePhoto || parentUser?.profilePhoto || "/default-avatar.png"}
           className="
             w-10 h-10 rounded-full
             border border-neutral-700
             group-hover:border-blue-400
             transition-all duration-300
             shadow-md group-hover:shadow-amber-500/20
           "
         />
       </motion.button>
       
          )}
        </div>
      </div>

      {/* LOGIN DRAWER */}
      <Drawer open={openLogin} onClose={() => setOpenLogin(false)} title="Login As">
        <DrawerLink to="/tutor-login" onClose={setOpenLogin}>Tutor</DrawerLink>
        <DrawerLink to="/parent-login" onClose={setOpenLogin}>Parent / Student</DrawerLink>
      </Drawer>

      {/* REGISTER DRAWER */}
      <Drawer open={openRegister} onClose={() => setOpenRegister(false)} title="Register As">
        <DrawerLink to="/tutor-register" onClose={setOpenRegister}>Tutor</DrawerLink>
        <DrawerLink to="/parent-register" onClose={setOpenRegister}>Parent / Student</DrawerLink>
      </Drawer>

      {/* PROFILE DRAWER */}
      <ProfileDrawer
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        user={user}
        parentUser={parentUser}
        onLogoutTutor={handleLogoutTutor}
        onLogoutStudent={handleLogoutStudent}
      />
    </nav>
  );
};

export default Navbar;

/* ================= SOLID DRAWER ================= */

const Drawer = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div {...fade} onClick={onClose} className="fixed inset-0 bg-black/60 z-40" />

        <motion.aside
          {...slideRight}
          className="
          fixed right-0 top-0 h-full w-80
          bg-gray-950   /* SOLID COLOR */
          border-l border-gray-800
          z-50 p-6
        "
        >
          <h2 className="text-xl font-bold text-amber-400 mb-6">{title}</h2>
          <div className="flex flex-col gap-4">{children}</div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

const DrawerLink = ({ to, children, onClose }) => (
  <Link
    to={to}
    onClick={() => onClose(false)}
    className="
    p-4 rounded-xl
     text-white
     bg-gray-900
    hover:bg-blue-600
    
    transition
  "
  >
    {children}
  </Link>
);

/* ================= SOLID PROFILE DRAWER ================= */

const ProfileDrawer = ({ open, onClose, user, parentUser, onLogoutTutor, onLogoutStudent }) => {
  const role = user ? "tutor" : parentUser ? "student" : null;
  const profile = user || parentUser;

  const tutorLinks = [
    { to: "/tutor/dashboard", label: "Dashboard" },
    { to: "/tutor/edit-profile", label: "Edit Profile" },
    { to: "/tutor/tuitions-post", label: "All Tuitions" },
    {to: '/tutor/buy-coins' ,label: "Buy Coins"},
    {to: '/tutor/applied-tuittions' ,label: "My-tuitions"},
  ];

  const parentLinks = [
    { to: "/parent/my-post", label: "My Posts" },
    { to: "/parent/add-tuition", label: "Add Tuition" },
    { to: "/parent/search-tutors", label: "Find Tutors" },
  ];

  const links = role === "tutor" ? tutorLinks : parentLinks;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div {...fade} onClick={onClose} className="fixed inset-0 bg-black/60 z-40" />

          <motion.aside
            {...slideRight}
            className="
            fixed right-0 top-0 h-full w-[340px]
            bg-neutral-950   /* SOLID SURFACE */
            border-l border-neutral-800
            z-50 p-6 flex flex-col
          "
          >
            {/* HEADER */}
            <div className="flex items-center gap-4 mb-10">
              <img
                src={profile?.profilePhoto || "/default-avatar.png"}
                className="w-16 h-16 rounded-full border border-neutral-700"
              />
              <div>
                <h3 className="font-semibold text-lg text-white">
                  {profile?.name || "FastTutors User"}
                </h3>
                <p className="text-xs text-neutral-400 capitalize">{role}</p>
              </div>
            </div>

            {/* MENU */}
            <div className="flex flex-col gap-2">
              {links?.map((item, i) => (
                <Link
                  key={i}
                  to={item.to}
                  onClick={onClose}
                  className="
                  p-4 rounded-xl
                  bg-gray-900
                  hover:bg-blue-800
                  text-neutral-300 hover:text-white
                  transition-all duration-300
                "
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* LOGOUT */}
            <div className="mt-auto">
              {user && (
                <button
                  onClick={onLogoutTutor}
                  className="w-full p-3 rounded-xl text-white bg-red-800 hover:bg-red-600 transition"
                >
                  Logout Tutor
                </button>
              )}

              {parentUser && (
                <button
                  onClick={onLogoutStudent}
                  className="w-full text-amber-300 p-3 rounded-xl bg-red-600 hover:bg-red-500 transition"
                >
                  Logout Parent
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
