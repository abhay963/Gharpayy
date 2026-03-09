import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import {
  FiUsers, FiCalendar, FiCheckCircle, FiTrendingUp, FiRefreshCw,
  FiUser, FiMessageCircle, FiXCircle, FiClock, FiHome, FiList,
  FiPhoneCall, FiArrowRight
} from "react-icons/fi";
import { FaMicrophone, FaSpinner } from "react-icons/fa";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from "recharts";
import CountUp from "react-countup";

const COLORS = ["#6366f1", "#a78bfa", "#ec4899", "#10b981", "#f59e0b", "#f97316", "#8b5cf6", "#facc15"];

export default function GharpayyDashboard() {
  const recognitionRef = useRef(null);
  const fullSpeechRef = useRef("");
  const chatEndRef = useRef(null);

  const [listening, setListening] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [data, setData] = useState({
    stats: null,
    recentLeads: [],
    agents: [],
    inventory: [],
    visits: [], // we'll fetch or simulate
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const loadAllData = async () => {
    setRefreshing(true);
    setLoading(true);

    try {
      const [statsRes, leadsRes, agentsRes, inventoryRes] = await Promise.all([
        API.get("/dashboard/stats"),
        API.get("/leads/recent"),           // assuming returns [{_id, name, phone, source, status, createdAt, assignedTo}]
        API.get("/agents/all"),             // [{_id, name, email, phone?, leadCount?}]
        API.get("/inventory/all"),          // [{_id, name, location, type, price?, createdAt}]
        // You can add: API.get("/visits/upcoming") if you create this endpoint
      ]);

      setData({
        stats: statsRes.data || {},
        recentLeads: leadsRes.data || [],
        agents: agentsRes.data || [],
        inventory: inventoryRes.data || [],
        // visits: visitsRes.data || []   // add when endpoint exists
      });
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const stopAllVoice = () => {
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      recognitionRef.current = null;
    }
    setListening(false);
  };

  const askAI = async (question) => {
    if (!data.stats) return "No dashboard data available.";
    try {
      const res = await API.post("/ai/chat", { question, report: data.stats });
      return res.data.answer || "No response.";
    } catch (err) {
      return "AI request failed.";
    }
  };

  const startSpeaking = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Speech Recognition not supported"); return; }

    fullSpeechRef.current = "";
    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          fullSpeechRef.current += " " + e.results[i][0].transcript;
        }
      }
    };

    recognition.start();
    setListening(true);
  };

  const stopListening = async () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();

    const speech = fullSpeechRef.current.trim();
    if (speech) {
      setHistory(prev => [...prev, { speaker: "You", text: speech, avatar: "👤" }]);
      setLoadingAI(true);
      const answer = await askAI(speech);
      setHistory(prev => [...prev, { speaker: "AI", text: answer, avatar: "🤖" }]);
      speakText(answer);
      setLoadingAI(false);
    }

    fullSpeechRef.current = "";
    recognitionRef.current = null;
    setListening(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl mx-auto mb-6 text-indigo-500" />
          <p className="text-2xl">Loading Gharpayy CRM...</p>
        </div>
      </div>
    );
  }

  const stats = data.stats || {};
  const conversionRate = stats.total_leads > 0
    ? ((stats.bookings_confirmed / stats.total_leads) * 100).toFixed(1)
    : "0.0";

  const statCards = [
    { title: "Total Leads", value: stats.total_leads || 0, icon: FiUsers, color: "indigo" },
    { title: "New Today", value: stats.new_leads_today || data.recentLeads.length || 0, icon: FiUsers, color: "blue" },
    { title: "Visits Scheduled", value: stats.visits_scheduled || 0, icon: FiCalendar, color: "purple" },
    { title: "Bookings", value: stats.bookings_confirmed || 0, icon: FiCheckCircle, color: "emerald" },
    { title: "Conversion", value: conversionRate, unit: "%", icon: FiTrendingUp, color: "pink" },
    { title: "Properties", value: data.inventory.length || 0, icon: FiHome, color: "amber" },
    { title: "Agents", value: data.agents.length || 0, icon: FiUser, color: "violet" },
  ];

  const pipelineData = [
    "New Lead", "Contacted", "Requirement Collected", "Property Suggested",
    "Visit Scheduled", "Visit Completed", "Booked", "Lost"
  ].map(stage => ({
    stage,
    count: stats.pipeline?.[stage] || 0,
  }));

  const recentLeadsForChart = data.recentLeads.slice(0, 10).map(lead => ({
    date: new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
    leads: 1,
  })).reduce((acc, curr) => {
    const found = acc.find(item => item.date === curr.date);
    if (found) found.leads += 1;
    else acc.push(curr);
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <h1 className="text-3xl md:text-4xl font-bold">Gharpayy CRM Dashboard</h1>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => {
              setShowAIChat(true);
              const greeting = "Hi Abhay! How can I help with leads, visits or properties today?";
              setHistory([{ speaker: "AI", text: greeting, avatar: "🤖" }]);
              speakText(greeting);
            }}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center gap-2 transition"
          >
            <FiMessageCircle /> AI Assistant
          </button>
          <button
            onClick={loadAllData}
            disabled={refreshing}
            className={`px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center gap-2 transition ${refreshing ? "opacity-60" : ""}`}
          >
            <FiRefreshCw className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing..." : "Refresh All"}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5 mb-12">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-gray-900 p-5 rounded-2xl border border-gray-800 hover:border-gray-600 transition"
            >
              <Icon className={`text-3xl mb-2 text-${card.color}-400`} />
              <p className="text-gray-400 text-sm">{card.title}</p>
              <p className="text-2xl font-bold mt-1">
                <CountUp end={card.value} duration={1.6} decimals={card.unit ? 1 : 0} />
                {card.unit || ""}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Lead Sources */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-6">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={stats.sources || []} dataKey="count" nameKey="source" cx="50%" cy="50%" outerRadius={100} label>
                {(stats.sources || []).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-6">Pipeline Stages</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="stage" angle={-40} textAnchor="end" height={90} stroke="#9ca3af" interval={0} />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Leads Chart + List */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-6">Recent Leads (Last 10)</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {data.recentLeads.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent leads</p>
            ) : (
              data.recentLeads.map(lead => (
                <div key={lead._id} className="bg-gray-800 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-medium">{lead.name || "Unknown"}</p>
                    <p className="text-sm text-gray-400">{lead.phone} • {lead.source}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lead.status === "Booked" ? "bg-green-900 text-green-300" :
                      lead.status === "Lost" ? "bg-red-900 text-red-300" :
                      "bg-blue-900 text-blue-300"
                    }`}>
                      {lead.status || "New"}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-6">Recent Leads Trend</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={recentLeadsForChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="leads" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agents & Properties */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Agents List */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FiUsers /> Active Agents ({data.agents.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {data.agents.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No agents added yet</p>
            ) : (
              data.agents.map(agent => (
                <div key={agent._id} className="bg-gray-800 p-4 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-700 rounded-full flex items-center justify-center text-white font-bold">
                      {agent.name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-gray-400">{agent.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-300">
                    {agent.leadCount || 0} leads
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Properties / Inventory */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FiHome /> Properties Inventory ({data.inventory.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {data.inventory.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No properties listed</p>
            ) : (
              data.inventory.slice(0, 8).map(prop => (
                <div key={prop._id} className="bg-gray-800 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <p className="font-medium">{prop.name || prop.title || "Property"}</p>
                    <span className="text-sm text-green-400">{prop.location || "Bangalore"}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {prop.type || "PG"} • ₹{prop.price?.toLocaleString() || "—"}
                  </p>
                </div>
              ))
            )}
            {data.inventory.length > 8 && (
              <p className="text-center text-sm text-gray-500 mt-4">
                + {data.inventory.length - 8} more properties
              </p>
            )}
          </div>
        </div>
      </div>

      {/* AI Chat Panel */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-50">
          <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-800/60">
            <span className="font-bold text-indigo-400">🤖 Gharpayy AI</span>
            <button onClick={() => { setShowAIChat(false); stopAllVoice(); }} className="text-gray-400 hover:text-white text-xl">✕</button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.speaker === "You" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${
                  msg.speaker === "You" ? "bg-indigo-800/60" : "bg-purple-900/50"
                }`}>
                  <p className="text-xs text-gray-300 mb-1">{msg.speaker}</p>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {loadingAI && <div className="flex items-center justify-center text-yellow-400 py-4"><FaSpinner className="animate-spin mr-2" /> Thinking...</div>}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={listening ? stopListening : startSpeaking}
              className={`w-full py-3 rounded-xl flex items-center justify-center gap-3 ${
                listening ? "bg-red-600 animate-pulse" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              <FaMicrophone /> {listening ? "Stop" : "Speak to AI"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}