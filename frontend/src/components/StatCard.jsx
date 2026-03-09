import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon, color = "bg-indigo-600/30" }) {
  // Map color prop to modern gradient + accent classes
  const accentMap = {
    indigo: {
      bg: "from-indigo-600/25 via-indigo-500/15 to-transparent",
      border: "border-indigo-500/30",
      text: "text-indigo-300",
      iconBg: "bg-indigo-900/40 border-indigo-700/40",
      iconText: "text-indigo-400",
      glow: "shadow-indigo-900/30",
    },
    purple: {
      bg: "from-purple-600/25 via-purple-500/15 to-transparent",
      border: "border-purple-500/30",
      text: "text-purple-300",
      iconBg: "bg-purple-900/40 border-purple-700/40",
      iconText: "text-purple-400",
      glow: "shadow-purple-900/30",
    },
    emerald: {
      bg: "from-emerald-600/25 via-emerald-500/15 to-transparent",
      border: "border-emerald-500/30",
      text: "text-emerald-300",
      iconBg: "bg-emerald-900/40 border-emerald-700/40",
      iconText: "text-emerald-400",
      glow: "shadow-emerald-900/30",
    },
    amber: {
      bg: "from-amber-600/25 via-amber-500/15 to-transparent",
      border: "border-amber-500/30",
      text: "text-amber-300",
      iconBg: "bg-amber-900/40 border-amber-700/40",
      iconText: "text-amber-400",
      glow: "shadow-amber-900/30",
    },
    pink: {
      bg: "from-pink-600/25 via-pink-500/15 to-transparent",
      border: "border-pink-500/30",
      text: "text-pink-300",
      iconBg: "bg-pink-900/40 border-pink-700/40",
      iconText: "text-pink-400",
      glow: "shadow-pink-900/30",
    },
  };

  const theme = accentMap[color] || accentMap.indigo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -8,
        scale: 1.04,
        boxShadow: `0 25px 50px -12px ${theme.glow.replace("shadow-", "rgba(")}`,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`
        group relative overflow-hidden rounded-2xl border backdrop-blur-xl
        bg-gradient-to-br ${theme.bg}
        ${theme.border}
        hover:${theme.border.replace("/30", "/50")}
        transition-all duration-300
        shadow-lg ${theme.glow}
      `}
    >
      {/* Shine sweep on hover */}
      <div
        className="
          absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
          -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out
          pointer-events-none
        "
      />

      {/* Subtle top glow bar */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative p-6 flex flex-col gap-5">
        {/* Title */}
        <p className="text-sm uppercase tracking-wider font-medium text-gray-400/90 group-hover:text-gray-300 transition-colors">
          {title}
        </p>

        {/* Value + Icon row */}
        <div className="flex items-center justify-between">
          <h2
            className={`
              text-4xl md:text-5xl font-black tracking-tight
              bg-gradient-to-br from-white via-gray-200 to-gray-300 bg-clip-text text-transparent
            `}
          >
            {value}
          </h2>

          <motion.div
            whileHover={{ rotate: 12, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`
              w-14 h-14 rounded-xl flex items-center justify-center
              ${theme.iconBg}
              border backdrop-blur-sm
              group-hover:scale-110 group-hover:shadow-lg transition-all duration-300
            `}
          >
            <Icon className={`text-2xl ${theme.iconText}`} />
          </motion.div>
        </div>

        {/* Optional micro accent line under value */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}