
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiPlus, FiFilter, FiRefreshCw, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import API from "../services/api";

/* Button */
function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium flex items-center ${className}`}
    >
      {children}
    </button>
  );
}

/* Card */
function Card({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

/* Badge */
function Badge({ status }) {
  let style = "bg-gray-700 text-gray-200";

  if (status === "New Lead") style = "bg-blue-900/40 text-blue-300 border border-blue-700/40";
  if (status === "Contacted") style = "bg-yellow-900/40 text-yellow-300 border border-yellow-700/40";
  if (status === "Requirement Collected") style = "bg-purple-900/40 text-purple-300 border border-purple-700/40";
  if (status === "Visit Scheduled") style = "bg-indigo-900/40 text-indigo-300 border border-indigo-700/40";
  if (status === "Booked") style = "bg-green-900/40 text-green-300 border border-green-700/40";
  if (status === "Lost") style = "bg-red-900/40 text-red-300 border border-red-700/40";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}

export default function Leads() {

  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    source: "Website"
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    setIsLoading(true);

    API.get("/leads/all")
      .then((res) => {
        setLeads(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleAddLead = async () => {

    if (!newLead.name) {
      alert("Lead name required");
      return;
    }

    if (!/^\d{10}$/.test(newLead.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    try {

      await API.post("/leads/create", {
        name: newLead.name,
        phone: newLead.phone,
        source: newLead.source
      });

      setShowModal(false);

      setNewLead({
        name: "",
        phone: "",
        source: "Website"
      });

      fetchLeads();

    } catch (err) {
      console.log(err);
    }

  };

  const filteredLeads = leads.filter((lead) => {

    const matchesSearch =
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone?.includes(search);

    const matchesSource =
      sourceFilter === "All Sources" || lead.source === sourceFilter;

    const matchesStage =
      stageFilter === "All Stages" || lead.status === stageFilter;

    return matchesSearch && matchesSource && matchesStage;

  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-indigo-950 text-white pb-12">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative px-6 pt-10 md:px-10 lg:px-16 xl:px-24 max-w-[1800px] mx-auto space-y-10"
      >

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

          <div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              Leads
            </h1>

            <p className="mt-2 text-gray-400 font-light tracking-wide">
              {filteredLeads.length} active leads
            </p>
          </div>

          <div className="flex items-center gap-4">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={fetchLeads}
              className="p-3 bg-gray-800/60 rounded-xl border border-gray-700/50 text-gray-300 hover:text-white hover:border-gray-500/70 transition-all"
            >
              <FiRefreshCw className="text-xl" />
            </motion.button>

            <Button onClick={() => setShowModal(true)}>
              <FiPlus className="mr-2" />
              Add New Lead
            </Button>

          </div>

        </div>

        <Card className="backdrop-blur-xl bg-gray-900/40 border border-white/5 rounded-2xl p-5">

          <div className="flex flex-col md:flex-row gap-4 items-center">

            <div className="relative flex-1 max-w-md">

              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search by name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700/60 rounded-xl pl-11 pr-4 py-3 text-white"
              />

            </div>

            <div className="flex gap-4 flex-wrap">

              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="bg-gray-800/60 border border-gray-700/60 rounded-xl px-4 py-3 text-sm"
              >
                <option>All Sources</option>
                <option>WhatsApp</option>
                <option>Website</option>
                <option>Instagram</option>
                <option>Phone</option>
              </select>

              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="bg-gray-800/60 border border-gray-700/60 rounded-xl px-4 py-3 text-sm"
              >
                <option>All Stages</option>
                <option>New Lead</option>
                <option>Contacted</option>
                <option>Requirement Collected</option>
                <option>Visit Scheduled</option>
                <option>Booked</option>
                <option>Lost</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-5 py-3 bg-gradient-to-r from-indigo-600/70 to-purple-600/70 rounded-xl font-medium flex items-center gap-2"
              >
                <FiFilter />
                More Filters
              </motion.button>

            </div>

          </div>

        </Card>

        <Card className="backdrop-blur-xl bg-gray-900/30 border border-white/5 rounded-2xl overflow-hidden">

          <AnimatePresence>

            {isLoading ? (

              <div className="py-24 flex flex-col items-center justify-center text-gray-400">
                Loading leads...
              </div>

            ) : filteredLeads.length === 0 ? (

              <div className="py-20 flex flex-col items-center justify-center text-center">
                <FiUserPlus className="text-7xl text-gray-600 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-300 mb-3">
                  No leads found
                </h3>
              </div>

            ) : (

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="overflow-x-auto"
              >

                <table className="w-full min-w-[900px]">

                  <thead className="bg-gray-900/60 border-b border-gray-800/80">
                    <tr>
                      <th className="p-5 text-left text-sm font-semibold text-gray-300">Name</th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-300">Phone</th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-300">Source</th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-300">Stage</th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-300">Agent</th>
                      <th className="p-5 text-left text-sm font-semibold text-gray-300">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredLeads.map((lead) => (

                      <motion.tr
                        key={lead.id}
                        variants={itemVariants}
                        onHoverStart={() => setHoveredRow(lead.id)}
                        onHoverEnd={() => setHoveredRow(null)}
                        className={`border-b border-gray-800/60 ${
                          hoveredRow === lead.id ? "bg-gray-800/40" : ""
                        }`}
                      >

                        <td className="p-5">
                          <Link
                            to={`/lead/${lead.id}`}
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            {lead.name}
                          </Link>
                        </td>

                        <td className="p-5 text-gray-300">{lead.phone || "-"}</td>

                        <td className="p-5">{lead.source}</td>

                        <td className="p-5">
                          <Badge status={lead.status} />
                        </td>

                        <td className="p-5 text-gray-300">
                          {lead.agent_name || "Unassigned"}
                        </td>

                        <td className="p-5"></td>

                      </motion.tr>

                    ))}

                  </tbody>

                </table>

              </motion.div>

            )}

          </AnimatePresence>

        </Card>

      </motion.div>

      {showModal && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-gray-900 p-8 rounded-2xl w-[400px] space-y-4">

            <h2 className="text-2xl font-bold">Add Lead</h2>

            <input
              placeholder="Name"
              value={newLead.name}
              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
              className="w-full bg-gray-800 p-3 rounded-lg"
            />

            <input
              placeholder="Phone"
              value={newLead.phone}
              onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
              className="w-full bg-gray-800 p-3 rounded-lg"
            />

            <select
              value={newLead.source}
              onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
              className="w-full bg-gray-800 p-3 rounded-lg"
            >
              <option>Website</option>
              <option>WhatsApp</option>
              <option>Instagram</option>
              <option>Phone</option>
            </select>

            <div className="flex justify-end gap-4 pt-2">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAddLead}
                className="px-4 py-2 bg-indigo-600 rounded-lg"
              >
                Add Lead
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
