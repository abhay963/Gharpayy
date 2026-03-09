import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, FiUsers, FiHome, FiMapPin, FiDollarSign, 
  FiChevronRight, FiArrowLeft 
} from "react-icons/fi";
import API from "../services/api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { y: -6, transition: { duration: 0.25 } }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function Owners() {
  const [owners, setOwners] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const res = await API.get("/owners/all");
      setOwners(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOwnerProperties = async (ownerName) => {
    setLoading(true);
    setSelectedOwner(ownerName);

    try {
      const res = await API.get(`/owners/${ownerName}`);
      setProperties(res.data || []);
    } catch (err) {
      console.error(err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedOwner(null);
    setProperties([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-black text-white px-5 py-8 md:p-10">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedOwner ? (
            <motion.div
              key="owners-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-10">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight">
                  Property Owners
                </h1>
                <div className="text-gray-400 flex items-center gap-2">
                  <FiUsers size={20} />
                  <span>{owners.length} owners</span>
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {owners.length === 0 ? (
                  <div className="col-span-full text-center py-16 text-gray-400 text-lg">
                    No owners found in the system yet.
                  </div>
                ) : (
                  owners.map((owner) => (
                    <motion.div
                      key={owner.owner_name}
                      variants={cardVariants}
                      whileHover="hover"
                      onClick={() => fetchOwnerProperties(owner.owner_name)}
                      className="group relative bg-gray-900/70 backdrop-blur-lg border border-gray-800/70 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-900/20"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30">
                            <FiUser size={24} className="text-indigo-400" />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                              {owner.owner_name}
                            </h2>
                            <p className="text-sm text-gray-400 mt-1">
                              Click to view properties
                            </p>
                          </div>
                        </div>
                        <FiChevronRight 
                          className="text-gray-500 group-hover:text-indigo-400 transition-colors mt-1.5" 
                          size={20} 
                        />
                      </div>

                      {/* subtle gradient hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </motion.div>
                  ))
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="owner-details"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <button
                  onClick={handleBack}
                  className="p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <FiArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    {selectedOwner}
                  </h1>
                  <p className="text-gray-400 mt-1 flex items-center gap-2">
                    <FiHome size={16} />
                    Properties owned
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-lg bg-gray-900/40 rounded-2xl border border-gray-800/60">
                  No properties found for this owner.
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {properties.map((property) => (
                    <motion.div
                      key={property.id}
                      variants={listItemVariants}
                      className="bg-gray-900/70 backdrop-blur-lg border border-gray-800/70 rounded-2xl p-6 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-900/15"
                    >
                      <h3 className="text-xl font-semibold text-white mb-3 line-clamp-1">
                        {property.property_name}
                      </h3>

                      <div className="space-y-3 text-gray-300">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-indigo-400" size={16} />
                          <span className="line-clamp-1">{property.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiHome className="text-purple-400" size={16} />
                          <span>{property.property_type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-medium text-indigo-300 pt-2">
                          <FiDollarSign size={18} />
                          ₹{Number(property.price).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}