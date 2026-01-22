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
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { label: "Menu", href: "/menu", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label: "Services", href: "/services", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "About", href: "/about", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Contact", href: "/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ];

  // Hide / show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* HEADER */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 md:px-6 py-1 md:py-2 bg-black/50 border border-white/40 rounded-full mt-4 mx-4">
          {/* Logo */}
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={80} height={50} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link href={item.href} key={item.label}>
                  <p
                    className={`px-3 py-1 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-red-500 text-white"
                        : "hover:bg-red-400"
                    }`}
                  >
                    {item.label}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-6">
            <button>Be a Partner ?</button>
            <button>Login</button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(true)}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor">
              <path strokeWidth="2" d="M4 7h20M4 14h20M4 21h20" />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[280px] bg-zinc-950 border-l border-white/5 z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="px-4 py-3 flex justify-between items-center border-b border-white/5 bg-zinc-900/50">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="logo" width={80} height={50} />
                  {/* <span className="text-white text-sm font-black tracking-tighter uppercase italic">Where's The Fork</span> */}
                </div>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-white/50 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M13.5 4.5l-9 9m0-9l9 9" />
                  </svg>
                </button>
              </div>

              {/* Navigation Grid */}
              <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
                <p className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">Quick Access</p>
                <div className="grid grid-cols-1 gap-2">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                            isActive
                              ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                              : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? "bg-white/20" : "bg-zinc-900"}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                          </div>
                          <span className="text-sm font-bold tracking-wide">{item.label}</span>
                          {isActive && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* <div className="mt-8 border-t border-white/5 pt-6">
                  <p className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">Support</p>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-4 p-3 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all text-sm font-bold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Customer Care
                    </button>
                  </div>
                </div> */}
              </div>

              {/* Footer */}
              <div className="p-4 space-y-2 bg-zinc-900/50">
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-black text-xs font-black uppercase tracking-widest py-3.5 rounded-lg active:bg-gray-100 transition-colors"
                >
                  Login
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-transparent text-white/50 text-xs font-bold uppercase tracking-widest py-3 rounded-lg border border-white/10 hover:text-white transition-colors"
                >
                  Be a Partner
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
