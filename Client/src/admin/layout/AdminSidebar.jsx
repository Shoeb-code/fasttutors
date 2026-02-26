import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, UploadCloud, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSidebar() {

  const menu = [
    {
      name: "Dashboard",
      to: "/root-control-panel",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Study Materials",
      to: "/root-control-panel/materials",
      icon: <BookOpen size={18} />,
    },
    {
      name: "Upload Material",
      to: "/root-control-panel/upload",
      icon: <UploadCloud size={18} />,
    },
    {
      name: "Settings",
      to: "/root-control-panel/settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <aside
      className="
        w-72 min-h-screen
        bg-[#05070c]
        border-r border-white/10
        px-6 py-8
        flex flex-col
      "
    >

      {/* ================= LOGO ================= */}
      <div className="flex items-center gap-3 mb-10">
        <div className="
          w-12 h-12 rounded-2xl
          bg-gradient-to-br from-indigo-600 to-purple-600
          flex items-center justify-center
        ">
          🛡️
        </div>

        <h1 className="text-xl font-bold">
          FastTutors <span className="text-amber-400">Admin</span>
        </h1>
      </div>

      {/* ================= MENU ================= */}
      <nav className="flex flex-col gap-3">

        {menu.map((item) => (
          <NavLink key={item.name} to={item.to} end>

            {({ isActive }) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`
                  relative flex items-center gap-4
                  px-5 py-4 rounded-2xl
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg"
                      : "text-gray-400 hover:bg-white/5"
                  }
                `}
              >

                {/* ACTIVE INDICATOR */}
                {isActive && (
                  <span className="
                    absolute left-0 top-1/2 -translate-y-1/2
                    w-1 h-6 bg-amber-400 rounded-r-lg
                  " />
                )}

                <div className={`${isActive ? "text-white" : "text-indigo-400"}`}>
                  {item.icon}
                </div>

                <p className="font-medium">
                  {item.name}
                </p>

              </motion.div>
            )}

          </NavLink>
        ))}

      </nav>

      {/* ================= FOOTER ================= */}
      <div className="mt-auto text-xs text-gray-500 pt-10">
        FastTutors Control OS v1.0
      </div>

    </aside>
  );
}
