
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiPhone,
  FiTag,
  FiUserCheck,
  FiClock,
  FiMapPin,
  FiHome,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import API from "../services/api";

export default function LeadDetails() {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [visits, setVisits] = useState([]);

  /* --------------------------------------------------- */
  /* Data fetching                                        */
  /* --------------------------------------------------- */
  useEffect(() => {
    API.get(`/leads/${id}`).then((r) => setLead(r.data)).catch(console.error);
    API.get(`/visits?lead_id=${id}`)
      .then((r) => setVisits(r.data))
      .catch(console.error);
  }, [id]);

  /* --------------------------------------------------- */
  /* Loading state                                        */
  /* --------------------------------------------------- */
  if (!lead) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading…
      </div>
    );
  }

  /* --------------------------------------------------- */
  /* Card definitions                                      */
  /* --------------------------------------------------- */
  const cardInfo = [
    {
      label: "Name",
      value: lead.name,
      icon: <FiUser className="text-2xl text-indigo-400" />,
    },
    {
      label: "Phone",
      value: lead.phone,
      icon: <FiPhone className="text-2xl text-green-400" />,
    },
    {
      label: "Source",
      value: lead.source,
      icon: <FiTag className="text-2xl text-yellow-400" />,
    },
    {
      label: "Assigned Agent",
      value: lead.assigned_agent,
      icon: <FiUserCheck className="text-2xl text-purple-400" />,
    },
    {
      label: "Status",
      value: lead.status,
      icon: <FiClock className="text-2xl text-pink-400" />,
    },
  ];

  /* --------------------------------------------------- */
  /* Framer‑Motion variants                               */
  /* --------------------------------------------------- */
  const container = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, ease: "easeOut" },
    },
  };

  const card = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  };

  const row = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  /* --------------------------------------------------- */
  /* UI                                                   */
  /* --------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 p-6 md:p-12 text-white">
      {/* -------------------- Header -------------------- */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Lead Details
      </motion.h1>

      {/* -------------------- Lead Card -------------------- */}
      <motion.section
        className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-16"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-gray-200">
          <FiUser className="text-indigo-400" />
          Lead Profile
        </h2>

        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={card}>
          {cardInfo.map((c) => (
            <motion.div
              key={c.label}
              className="flex items-center gap-4 p-5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              variants={card}
            >
              {c.icon}
              <div>
                <p className="text-sm text-gray-400">{c.label}</p>
                <p className="text-lg font-medium">{c.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* -------------------- Visits Table -------------------- */}
      <motion.section
        className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-200">
          <FiMapPin className="text-purple-400" />
          Visit History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-gray-900 text-gray-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4">Property</th>
                <th className="p-4">Visit Date</th>
                <th className="p-4">Outcome</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {visits.map((visit) => (
                  <motion.tr
                    key={visit.id}
                    className="border-t border-gray-700 hover:bg-gray-900/30 transition-colors"
                    variants={row}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <td className="p-4 flex items-center gap-2">
                      <FiHome className="text-indigo-300" />
                      {visit.property}
                    </td>
                    <td className="p-4">
                      {new Date(visit.visit_date).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="p-4 flex items-center gap-2">
                      {visit.outcome ? (
                        <FiCheckCircle className="text-green-400" />
                      ) : (
                        <FiXCircle className="text-red-400" />
                      )}
                      {visit.outcome || "-"}
                    </td>
                  </motion.tr>
                ))}

                {visits.length === 0 && (
                  <tr className="text-gray-500">
                    <td colSpan={3} className="p-8 text-center">
                      No visits recorded.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}