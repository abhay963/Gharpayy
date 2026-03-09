import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiHome,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiArrowRight,
  FiRefreshCw,
  FiMapPin,
  FiXCircle,
} from "react-icons/fi";
import API from "../services/api";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardHover = {
  scale: 1.015,
  y: -4,
  transition: { type: "spring", stiffness: 400, damping: 20 },
};

const inputFocus = {
  scale: 1.015,
  transition: { type: "spring", stiffness: 300, damping: 25 },
};

export default function Visits() {
  const [visits, setVisits] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    lead_id: "",
    property: "",
    visit_date: "",
    outcome: "",
  });

  // Fetch all leads once
  useEffect(() => {
    API.get("/leads/all")
      .then((res) => setLeads(res.data || []))
      .catch(console.error);
  }, []);

  // Fetch visits when lead changes
  useEffect(() => {
    if (!selectedLead) {
      setVisits([]);
      return;
    }
    setLoading(true);
    API.get(`/visits/${selectedLead}`)
      .then((res) => setVisits(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedLead]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "lead_id") {
      setSelectedLead(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/visits/schedule", form);
      setVisits((prev) => [...prev, { ...form, id: Date.now() }]); // optimistic update
      setForm({
        lead_id: "",
        property: "",
        visit_date: "",
        outcome: "",
      });
      setSelectedLead("");
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 text-slate-100 pb-20"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 space-y-12 lg:space-y-16">

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-xl">
              <FiCalendar className="text-4xl text-indigo-400" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent tracking-tight">
                Visit Scheduler
              </h1>
              <p className="text-slate-400 mt-1.5 font-medium">
                Manage property viewings • {leads.length} active leads
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgb(79 70 229 / 0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-medium shadow-lg shadow-indigo-900/30 transition-all"
          >
            <FiPlus className="text-lg" />
            Schedule Visit
          </motion.button>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/70 rounded-2xl p-7 lg:p-10 shadow-2xl shadow-black/40"
          whileHover={cardHover}
        >
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            <FiHome className="text-indigo-400" />
            Schedule New Property Visit
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Lead Select */}
            <motion.div variants={fadeInUp} whileFocus={inputFocus}>
              <select
                name="lead_id"
                value={form.lead_id}
                onChange={handleChange}
                required
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/40 transition-all appearance-none"
              >
                <option value="">Select Lead / Client</option>
                {leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.name} {lead.phone ? `(${lead.phone.slice(-4)})` : ""}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Property */}
            <motion.div variants={fadeInUp} whileFocus={inputFocus}>
              <input
                type="text"
                name="property"
                placeholder="Property name / Society"
                value={form.property}
                onChange={handleChange}
                required
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/40 transition-all"
              />
            </motion.div>

            {/* Date & Time */}
            <motion.div variants={fadeInUp} whileFocus={inputFocus}>
              <input
                type="datetime-local"
                name="visit_date"
                value={form.visit_date}
                onChange={handleChange}
                required
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/40 transition-all [color-scheme:dark]"
              />
            </motion.div>

            {/* Outcome (optional) */}
            <motion.div variants={fadeInUp} whileFocus={inputFocus}>
              <input
                type="text"
                name="outcome"
                placeholder="Expected outcome / notes"
                value={form.outcome}
                onChange={handleChange}
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/40 transition-all"
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="md:col-span-2 lg:col-span-4 mt-3 flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 py-4 rounded-xl font-semibold shadow-lg shadow-indigo-900/40 transition-all text-lg"
            >
              <FiArrowRight />
              Confirm Visit Schedule
            </motion.button>
          </form>
        </motion.div>

        {/* Visits List */}
        <motion.div
          variants={fadeInUp}
          className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/70 rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
          whileHover={cardHover}
        >
          <div className="p-6 lg:p-8 border-b border-slate-800/70">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent flex items-center gap-3">
              <FiClock className="text-indigo-400" />
              Scheduled Visits
              {selectedLead && (
                <span className="text-slate-400 text-lg font-normal ml-2">
                  • {leads.find(l => l.id === selectedLead)?.name || "Selected lead"}
                </span>
              )}
            </h2>
          </div>

          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center text-slate-400">
              <FiRefreshCw className="text-5xl animate-spin mb-4 opacity-70" />
              <p className="text-lg">Loading visits...</p>
            </div>
          ) : visits.length === 0 ? (
            <div className="p-16 text-center text-slate-500">
              <FiXCircle className="mx-auto text-6xl mb-4 opacity-50" />
              <p className="text-xl font-medium">No visits scheduled yet</p>
              <p className="mt-2">Select a lead or schedule your first visit above</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="p-5 text-left font-medium text-slate-300">Property</th>
                    <th className="p-5 text-left font-medium text-slate-300">Date & Time</th>
                    <th className="p-5 text-left font-medium text-slate-300">Outcome / Status</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {visits.map((visit) => (
                      <motion.tr
                        key={visit.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="border-t border-slate-800/60 hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-5 font-medium text-slate-200 flex items-center gap-3">
                          <FiMapPin className="text-indigo-400 opacity-80" />
                          {visit.property}
                        </td>
                        <td className="p-5 text-slate-300">
                          {formatDate(visit.visit_date)}
                        </td>
                        <td className="p-5">
                          {visit.outcome ? (
                            <span className="inline-flex items-center gap-1.5 bg-emerald-900/40 text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium">
                              <FiCheckCircle size={14} />
                              {visit.outcome}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-amber-900/40 text-amber-300 px-4 py-1.5 rounded-full text-sm font-medium">
                              <FiClock size={14} />
                              Pending
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}