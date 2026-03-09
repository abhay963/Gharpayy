import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUserPlus, FiTrash2 } from "react-icons/fi";
import API from "../services/api";

export default function Agents() {

  const [agents, setAgents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  /* ---------------- Fetch Agents ---------------- */

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = () => {
    API.get("/agents/all")
      .then((res) => {
        setAgents(res.data);
      })
      .catch(console.error);
  };

  /* ---------------- Handle Input ---------------- */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- Add Agent ---------------- */

  const addAgent = (e) => {
    e.preventDefault();

    API.post("/agents/add", form)
      .then(() => {
        fetchAgents();

        setForm({
          name: "",
          email: "",
          phone: "",
        });
      })
      .catch(console.error);
  };

  /* ---------------- Delete Agent ---------------- */

  const deleteAgent = (id) => {

    API.delete(`/agents/${id}`)
      .then(() => fetchAgents())
      .catch(console.error);

  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-10">Settings</h1>

      {/* ADD AGENT CARD */}

      <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-10 backdrop-blur-lg">

        <h2 className="text-xl font-semibold mb-6">Add Agent</h2>

        <form
          onSubmit={addAgent}
          className="grid md:grid-cols-3 gap-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Agent name"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="phone"
            placeholder="+91..."
            value={form.phone}
            onChange={handleChange}
            className="bg-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="col-span-3 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg"
          >
            <FiUserPlus />
            Add Agent
          </button>

        </form>

      </div>

      {/* TEAM MEMBERS */}

      <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-lg">

        <h2 className="text-xl font-semibold mb-6">Team Members</h2>

        <div className="space-y-4">

          {agents.length === 0 && (
            <p className="text-gray-400">No agents added yet.</p>
          )}

          {agents.map((agent) => (

            <motion.div
              key={agent.id}
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center bg-gray-800/60 p-4 rounded-lg"
            >

              <div>
                <p className="font-semibold">{agent.name}</p>
                <p className="text-sm text-gray-400">{agent.email}</p>
              </div>

              <button
                onClick={() => deleteAgent(agent.id)}
                className="text-red-400 hover:text-red-500"
              >
                <FiTrash2 size={20} />
              </button>

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
}