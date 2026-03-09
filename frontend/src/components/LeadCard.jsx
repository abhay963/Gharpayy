import { motion } from "framer-motion";
import {
  FiPhone,
  FiUser,
  FiMessageSquare,
  FiArrowRight,
} from "react-icons/fi";

export default function LeadCard({ lead }) {
  const statusColors = {
    "New Lead": "from-emerald-600/30 to-emerald-900/20 text-emerald-300 border-emerald-700/40",
    Contacted: "from-blue-600/30 to-blue-900/20 text-blue-300 border-blue-700/40",
    "Requirement Collected": "from-indigo-600/30 to-indigo-900/20 text-indigo-300 border-indigo-700/40",
    "Visit Scheduled": "from-purple-600/30 to-purple-900/20 text-purple-300 border-purple-700/40",
    Booked: "from-pink-600/30 to-pink-900/20 text-pink-300 border-pink-700/40",
    Lost: "from-red-600/30 to-red-900/20 text-red-300 border-red-700/40",
  };

  const sourceColors = {
    WhatsApp: "bg-green-900/50 text-green-300 border-green-700/40",
    Instagram: "bg-pink-900/50 text-pink-300 border-pink-700/40",
    Website: "bg-blue-900/50 text-blue-300 border-blue-700/40",
    Phone: "bg-amber-900/50 text-amber-300 border-amber-700/40",
  };

  const defaultStatus = lead.status || "New Lead";
  const statusStyle = statusColors[defaultStatus] || "from-gray-700/30 to-gray-900/20 text-gray-300 border-gray-700/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -6,
        scale: 1.03,
        boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        group relative overflow-hidden rounded-2xl border backdrop-blur-xl
        bg-gradient-to-br ${statusStyle}
        border-white/5 hover:border-indigo-500/30
        transition-all duration-300
      `}
    >
      {/* Shine overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

      {/* Top accent bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500/70 via-purple-500/70 to-pink-500/70 opacity-60" />

      <div className="relative p-5">
        {/* Name + quick actions */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600/80 to-purple-600/80 flex items-center justify-center shadow-md shadow-indigo-900/40">
              <FiUser className="text-white text-lg" />
            </div>

            <div>
              <h4 className="font-bold text-lg text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                {lead.name}
              </h4>
              <p className="text-sm text-gray-400 font-light mt-0.5">
                {lead.phone || "No phone provided"}
              </p>
            </div>
          </div>

          <motion.a
            href={`tel:${lead.phone}`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-lg bg-gray-800/60 hover:bg-indigo-900/40 text-indigo-300 hover:text-indigo-200 transition-colors"
          >
            <FiPhone className="text-lg" />
          </motion.a>
        </div>

        {/* Tags row */}
        <div className="mt-5 flex flex-wrap gap-2">
          <span
            className={`
              px-3 py-1 rounded-full text-xs font-medium border
              ${sourceColors[lead.source] || "bg-gray-800/60 text-gray-300 border-gray-700/50"}
            `}
          >
            {lead.source || "Unknown"}
          </span>

          <span
            className={`
              px-3 py-1 rounded-full text-xs font-medium border
              ${statusStyle.split(" ")[1] ? statusStyle.split(" ")[1] : "bg-gray-800/60 text-gray-300 border-gray-700/50"}
            `}
          >
            {defaultStatus}
          </span>

          {lead.assigned_agent && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800/60 text-gray-300 border border-gray-700/50">
              {lead.assigned_agent}
            </span>
          )}
        </div>

        {/* Quick message hint */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FiMessageSquare className="text-indigo-400" />
            <span>Quick message • WhatsApp / SMS</span>
            <FiArrowRight className="text-indigo-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}