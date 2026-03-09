import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiHome, FiMapPin, FiDollarSign, FiUser } from "react-icons/fi";
import API from "../services/api";
import toast from "react-hot-toast";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
};

const formVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({
    property_name: "",
    location: "",
    property_type: "",
    price: "",
    owner_name: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await API.get("/inventory/all");
      setInventory(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load properties", { duration: 4000 });
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addProperty = async (e) => {
    e.preventDefault();
    
    if (Object.values(form).some((val) => !val.trim())) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await API.post("/inventory/add", form);
      toast.success("Property added successfully!");
      
      setForm({
        property_name: "",
        location: "",
        property_type: "",
        price: "",
        owner_name: ""
      });
      
      await fetchInventory();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add property");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProperty = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      await API.delete(`/inventory/${id}`);
      toast.success("Property deleted");
      await fetchInventory();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete property");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-black text-white p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-10 tracking-tight"
      >
        Property Inventory
      </motion.h1>

      {/* ─── ADD FORM ──────────────────────────────────────────────── */}
      <motion.form
        variants={formVariants}
        initial="hidden"
        animate="visible"
        onSubmit={addProperty}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12 bg-gray-900/60 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-800/60 shadow-2xl"
      >
        {[
          { name: "property_name", icon: FiHome, placeholder: "Property Name" },
          { name: "location", icon: FiMapPin, placeholder: "Location" },
          { name: "property_type", icon: FiHome, placeholder: "Type (2BHK / Villa...)" },
          { name: "price", icon: FiDollarSign, placeholder: "Price (₹)", type: "number" },
          { name: "owner_name", icon: FiUser, placeholder: "Owner Name" }
        ].map((field, i) => (
          <motion.div
            key={field.name}
            variants={itemVariants}
            className="relative group"
          >
            <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              required
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl pl-11 pr-4 py-3.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500/70 focus:bg-gray-800/80 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300"
            />
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="col-span-full sm:col-span-2 lg:col-span-5 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3.5 rounded-xl font-medium shadow-lg shadow-indigo-900/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus className={isSubmitting ? "animate-spin" : ""} />
          {isSubmitting ? "Adding..." : "Add Property"}
        </motion.button>
      </motion.form>

      {/* ─── PROPERTY GRID ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {inventory.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 text-gray-400 text-lg font-light"
          >
            No properties in inventory yet. Add your first one above!
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {inventory.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="group relative bg-gray-900/70 backdrop-blur-lg border border-gray-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/20"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors mb-2 line-clamp-1">
                      {item.property_name}
                    </h3>

                    <div className="space-y-2.5 text-sm text-gray-300">
                      <p className="flex items-center gap-2">
                        <FiMapPin className="text-indigo-400" size={16} />
                        {item.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <FiHome className="text-purple-400" size={16} />
                        {item.property_type}
                      </p>
                      <p className="flex items-center gap-2 text-lg font-medium text-indigo-300 mt-3">
                        <FiDollarSign size={18} />
                        ₹{Number(item.price).toLocaleString("en-IN")}
                      </p>
                      <p className="text-gray-400 mt-3">
                        Owner: <span className="text-gray-200">{item.owner_name}</span>
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteProperty(item.id)}
                      className="mt-6 flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
                    >
                      <FiTrash2 size={18} />
                      Delete
                    </motion.button>
                  </div>

                  {/* subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}