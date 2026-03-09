import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiHome,
  FiUsers,
  FiBarChart2,
  FiCalendar,
  FiChevronRight,
  FiZap,
  FiMapPin,
  FiUser,
  FiBox,
  FiSearch,
  FiClock,
  FiX,
  FiTool,
} from "react-icons/fi";

const navItems = [
  { path: "/", label: "Dashboard", icon: FiHome },
  { path: "/leads", label: "Leads", icon: FiUsers },
  { path: "/pipeline", label: "Pipeline", icon: FiBarChart2 },
  { path: "/visits", label: "Visits", icon: FiCalendar },
  { path: "/agents", label: "Agents", icon: FiUser },
  { path: "/nearby", label: "Nearby Properties", icon: FiMapPin },
];

const toolItems = [
  { path: "/owners", label: "Owners", icon: FiUser, color: "from-amber-600 to-orange-600" },
  { path: "/inventory", label: "Inventory", icon: FiBox, color: "from-indigo-600 to-purple-600" },
  { path: "/availability", label: "Availability", icon: FiSearch, color: "from-cyan-600 to-teal-600" },
  { path: "/history", label: "Activity History", icon: FiClock, color: "from-gray-700 to-gray-600" },
];

export default function Sidebar() {

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showTools, setShowTools] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <motion.aside
        initial={{ width: 80 }}
        animate={{ width: 280 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 border-r border-white/5 flex flex-col"
      >

        <div className="relative z-10 p-6 flex flex-col h-full">

          {/* Logo */}

          <div className="flex items-center gap-3 mb-14">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <FiZap className="text-white text-xl" />
            </div>


          </div>

          {/* Navigation */}

          <nav className="flex flex-col gap-2">

            {navItems.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.path}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >

                  <NavLink to={item.path}>

                    {({ isActive }) => (

                      <div
                        className={`group relative flex items-center gap-4 px-5 py-4 rounded-xl transition ${
                          isActive
                            ? "bg-indigo-600/30 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >

                        {/* Active indicator */}

                        <div
                          className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-full bg-indigo-500 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        />

                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isActive
                              ? "bg-indigo-600"
                              : "bg-gray-800"
                          }`}
                        >
                          <Icon className="text-xl" />
                        </div>

                        <span>{item.label}</span>

                        <FiChevronRight className="ml-auto opacity-50 group-hover:opacity-100" />

                      </div>

                    )}

                  </NavLink>

                </motion.div>

              );

            })}

          </nav>

          {/* More Tools */}

          <div className="mt-auto pt-10">

            <button
              onClick={() => setShowTools(true)}
              className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:text-white cursor-pointer"
            >

              <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                <FiTool />
              </div>

              <span className="font-medium">
                Advanced Tools
              </span>

            </button>

          </div>

        </div>

      </motion.aside>

      {/* TOOL PANEL */}

      <AnimatePresence>

        {showTools && (

          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTools(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-72 bg-gray-950 border-r border-gray-800 z-50 p-6"
            >

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-lg font-semibold text-white">
                  Advanced Tools
                </h2>

                <button onClick={() => setShowTools(false)}>
                  <FiX />
                </button>

              </div>

              <div className="flex flex-col gap-4">

                {toolItems.map((tool) => (

                  <button
                    key={tool.path}
                    onClick={() => {
                      navigate(tool.path);
                      setShowTools(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
                  >

                    <tool.icon />

                    {tool.label}

                  </button>

                ))}

              </div>

            </motion.div>

          </>

        )}

      </AnimatePresence>

    </>
  );

}