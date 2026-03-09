import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FiTrendingUp, FiArrowUpRight } from "react-icons/fi";

export default function PipelineChart({ data }) {
  // Optional: sort data by count descending for visual hierarchy
  const sortedData = [...(data || [])].sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...sortedData.map((d) => d.count || 0), 1);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const percentage = maxCount > 0 ? Math.round((value / maxCount) * 100) : 0;

      return (
        <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/60 rounded-xl p-4 shadow-2xl shadow-black/60">
          <p className="font-medium text-white mb-1.5">{label}</p>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-orange-400 font-semibold text-lg">{value}</span>
            <span className="text-gray-400 text-sm">leads</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {percentage}% of total pipeline
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props) => {
    const { fill, x, y, width, height, index } = props;
    const delay = index * 0.08;

    return (
      <motion.g initial={{ scaleY: 0, transformOrigin: "bottom" }} animate={{ scaleY: 1 }}>
        <defs>
          <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        <motion.rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={`url(#grad-${index})`}
          rx={8}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.6, ease: "easeOut" }}
        />
      </motion.g>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative bg-gradient-to-br from-gray-950 via-black to-gray-950 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl shadow-indigo-950/30"
    >
      {/* Decorative gradient orb */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-600/10 to-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-6 md:p-7">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-600/30 to-amber-600/20 border border-orange-700/30">
              <FiTrendingUp className="text-2xl text-orange-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent tracking-tight">
                Pipeline Distribution
              </h3>
              <p className="text-sm text-gray-400 mt-0.5">Current funnel breakdown</p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 text-sm font-medium text-orange-400"
          >
            <span>View details</span>
            <FiArrowUpRight className="text-base" />
          </motion.div>
        </div>

        {/* Chart */}
        <div className="h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              margin={{ top: 20, right: 10, left: -10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="url(#gridGradient)"
                vertical={false}
              />

              <XAxis
                dataKey="status"
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={{ stroke: "#334155" }}
                tickLine={false}
                dy={10}
              />

              <YAxis
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}`}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(251, 146, 60, 0.08)" }}
              />

              <Bar
                dataKey="count"
                shape={<CustomBar />}
                barSize={36}
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick stats footer */}
        <div className="mt-6 pt-5 border-t border-gray-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {sortedData.slice(0, 4).map((item, i) => (
            <div key={i} className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">{item.status}</p>
              <p className="text-xl font-bold text-orange-400">{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}