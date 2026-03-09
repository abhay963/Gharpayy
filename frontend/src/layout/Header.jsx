import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiBell } from "react-icons/fi";
import { UserButton, useUser, SignedIn } from "@clerk/clerk-react";

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { isLoaded } = useUser();

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-black/40 backdrop-blur-2xl backdrop-saturate-150 shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* LOGO + NAME */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-700 shadow-md"
              >
                <span className="text-lg font-black text-white">G</span>
              </motion.div>
              <div className="hidden sm:flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-200 via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                  Gharpayy
                </h1>
                <p className="text-xs text-gray-400 font-medium -mt-1">
                  Super Stays • PG & Coliving • Bangalore
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: Search + Notifications + User */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* SEARCH BAR – expands on focus */}
              <div
                className={`group relative flex h-10 items-center rounded-full border transition-all duration-300 ${
                  isSearchFocused
                    ? "w-80 sm:w-96 border-teal-500/50 bg-teal-950/30"
                    : "w-10 sm:w-72 border-white/10 bg-white/5"
                }`}
              >
                <FiSearch
                  className="absolute left-3.5 text-gray-400 group-focus-within:text-teal-300"
                  size={18}
                />
                <input
                  type="text"
                  placeholder={isSearchFocused ? "Search leads by name, phone or source..." : "Search"}
                  className={`w-full bg-transparent pl-10 pr-4 text-sm text-gray-100 placeholder-gray-500 focus:outline-none ${
                    isSearchFocused ? "opacity-100" : "opacity-0 sm:opacity-100"
                  }`}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>

              {/* NOTIFICATIONS (future: new leads, follow-ups, reminders) */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/6 text-gray-300 hover:bg-white/12 hover:text-teal-300 transition-colors"
              >
                <FiBell size={18} />
                {/* Red dot – can be conditional later based on unread count */}
                <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-red-500/30" />
              </motion.button>

              {/* CLERK USER BUTTON – perfect for agents/admins */}
              {isLoaded && (
                <SignedIn>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox:
                          "h-9 w-9 border-2 border-teal-500/30 rounded-full shadow-sm",
                        userButtonPopoverCard:
                          "bg-gray-950 border border-white/10 shadow-2xl backdrop-blur-md",
                        userButtonPopoverFooter: "border-t border-white/5",
                      },
                    }}
                  />
                </SignedIn>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content overlap */}
      <div className="h-16" />
    </>
  );
}