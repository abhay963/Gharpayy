import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiUser, FiPhone, FiTag } from "react-icons/fi";
import API from "../services/api";

function PipelineColumn({ title, leads }) {
  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.02 }
  };

  return (
    <motion.div
      className="w-72 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 flex flex-col"
      variants={columnVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
        <FiTag className="text-indigo-400" />
        {title}
        <span className="ml-auto text-sm text-gray-400 bg-gray-800/50 rounded-full px-2">
          {leads.length}
        </span>
      </h2>

      <div className="flex-1 space-y-3">
        <AnimatePresence>
          {leads.map((lead) => (
            <motion.div
              key={lead.id || lead._id}
              className="p-3 rounded-lg bg-gray-900/60 border border-white/5 flex flex-col gap-1"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
            >
              <div className="flex items-center gap-2">
                <FiUser className="text-indigo-300" />
                <p className="text-sm font-medium text-gray-100">
                  {lead.name}
                </p>
              </div>

              <p className="text-xs text-gray-400 flex items-center gap-1">
                <FiPhone className="text-green-400" />
                {lead.phone}
              </p>

              <p className="text-xs text-gray-400">{lead.source}</p>

              <p className="text-xs text-right text-gray-500">
                {lead.status}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {leads.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-6">
            No leads
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Pipeline() {
  const [leads, setLeads] = useState([]);

  const stages = [
    "New Lead",
    "Contacted",
    "Requirement Collected",
    "Property Suggested",
    "Visit Scheduled",
    "Visit Completed",
    "Booked",
    "Lost"
  ];

  useEffect(() => {
    API.get("/leads/all")
      .then((res) => setLeads(res.data || []))
      .catch(() => setLeads([]));
  }, []);

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 p-10 text-white">
      
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Pipeline
        </h1>

        <button className="flex items-center gap-2 bg-orange-600 px-5 py-2 rounded-lg text-sm font-medium shadow-lg">
          <FiPlus />
          Add Lead
        </button>
      </div>

      {/* NO SCROLL HERE */}
      <div className="flex flex-wrap gap-6">
        {stages.map((stage) => {
          const stageLeads = leads.filter((lead) => lead.status === stage);

          return (
            <PipelineColumn
              key={stage}
              title={stage}
              leads={stageLeads}
            />
          );
        })}
      </div>

    </motion.div>
  );
}