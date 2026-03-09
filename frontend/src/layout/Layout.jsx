import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FiMenu, FiX } from "react-icons/fi";

export default function Layout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for header shadow / glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile sidebar when route changes (you can enhance with useLocation)
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-black to-indigo-950 text-white overflow-x-hidden">
      {/* Global background glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-indigo-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[70%] h-[70%] bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block sticky top-0 h-screen z-30">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
                onClick={closeMobileSidebar}
              />

              {/* Mobile Sidebar Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 22, stiffness: 160 }}
                className="fixed inset-y-0 left-0 w-80 bg-gradient-to-b from-gray-950 via-black to-gray-950 z-50 lg:hidden shadow-2xl shadow-black/60"
              >
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    LeadNest
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={closeMobileSidebar}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white"
                  >
                    <FiX size={24} />
                  </motion.button>
                </div>

                <div className="p-4">
                  <Sidebar onLinkClick={closeMobileSidebar} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header with mobile menu toggle */}
          <Header
            isScrolled={isScrolled}
            onMobileMenuToggle={() => setIsMobileSidebarOpen(true)}
          />

          {/* Main Content */}
          <main className="flex-1 relative">
            {/* Subtle scroll indicator gradient */}
            <div className="sticky top-0 z-20 h-1 bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-[1920px] mx-auto"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>

      {/* Floating mobile menu button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileSidebarOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden z-40 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-900/50 text-white"
      >
        <FiMenu size={24} />
      </motion.button>
    </div>
  );
}