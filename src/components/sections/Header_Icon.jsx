"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isShrunk, setIsShrunk] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { 
      label: "Home", 
      href: "/",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    },
    { 
      label: "Menu", 
      href: "/menu",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    { 
      label: "Who We Are", 
      href: "/about",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    { 
      label: "Services", 
      href: "/services",
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
    { 
      label: "Catering", 
      href: "/services/catering",
      icon: "M12 6v6m0 0v6m0-6h6m-6 0H6"
    },
  ];

  // ... (Check if user is logged in remains same)

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('wtf_token');
    localStorage.removeItem('wtf_user');
    setUser(null);
    setShowProfileMenu(false);
    window.location.href = '/';
  };

  const isExpanded = !isShrunk || isHovered;

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      >
        {/* ... (Mobile & Tablet Header remains same) ... */}
        {/* ... (Desktop Header Content remains same) ... */}

        {/* Side Navigation Buttons (Desktop Only) */}
        <div 
          className="hidden lg:flex flex-col gap-3 absolute left-12 mt-14 top-48 pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.label}>
                <div
                  className={`group relative flex items-center rounded-full transition-all duration-500 cursor-pointer overflow-hidden
                    ${isActive 
                      ? "bg-red-600 text-white shadow-xl shadow-red-600/30" 
                      : "bg-white text-red-700 border border-red-100 hover:bg-red-600 hover:text-white"
                    } ${isExpanded ? "px-6 py-3" : "w-14 h-14 justify-center"}`}
                >
                  {/* Icon */}
                  <div className={`flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isExpanded ? "mr-3" : ""}`}>
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={item.icon} />
                    </svg>
                  </div>
                  
                  {/* Label */}
                  <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0"}`}>
                    <p className="text-xl font-bold font-mono tracking-tighter whitespace-nowrap">
                      {item.label}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
          
          {/* Be a Partner Button as a specialized side button */}
          <Link href="https://wtf-foods.vercel.app/" className="mt-4">
            <div className={`group relative flex items-center rounded-full bg-gradient-to-r from-yellow-400 to-red-600 text-white shadow-2xl transition-all duration-500 overflow-hidden ${isExpanded ? "px-8 py-4" : "w-14 h-14 justify-center"}`}>
              {/* Icon */}
              <div className={`flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isExpanded ? "mr-3" : ""}`}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              
              {/* Label */}
              <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0"}`}>
                <p className="text-xl font-bold font-mono tracking-tighter uppercase whitespace-nowrap">
                  Be a Partner ?
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* MINIMAL MOBILE & TABLET DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Cinematic Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
              onClick={() => setIsOpen(false)}
            />

            {/* Professional Minimal Top Drawer */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="fixed top-0 left-0 right-0 w-full bg-zinc-950/95 backdrop-blur-3xl z-[70] flex flex-col overflow-hidden border-b border-white/5 md:h-fit md:rounded-b-[4rem] md:shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            >
              <div className="max-w-7xl mx-auto w-full flex flex-col">
                {/* Header inside Drawer */}
                <div className="px-6 md:px-12 py-2 flex items-center justify-between border-b border-white/5">
                  <Image src="/Logo.png" alt="logo" width={60} height={35} className="w-auto h-10 md:h-12" />
                  <button
                    className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full text-white/50 hover:text-white transition-all active:scale-95"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-8 md:h-8">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Minimal Navigation List */}
                <div className="flex flex-col px-6 md:px-12 py-6 md:py-8">
                  {navItems
                    .filter(item => !["Home", "Menu", "Catering", "Reels"].includes(item.label))
                    .map((item, index) => {
                      const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between py-2 md:py-4 border-b border-white/[0.03] group"
                        >
                          <span className={`text-3xl md:text-4xl dongle-regular tracking-tight transition-colors ${isActive ? "text-red-600" : "text-white/60 group-hover:text-white"
                            }`}>
                            {item.label}
                          </span>
                          {isActive && (
                            <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 bg-red-600 rounded-full" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Primary Actions Footer */}
                <div className="p-6 md:px-12 md:pt-4 md:pb-8 pt-2 pb-4 flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Link className="bg-gradient-to-r from-yellow-400 to-red-500 text-center text-white py-2 md:py-3 rounded-xl text-2xl md:text-3xl dongle-regular uppercase tracking-[0.1em] border border-white/5 active:scale-95 transition-all" href="/partner">
                      Partner
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
