"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Utensils, Phone, ChefHat, Play } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * BottomNavbar Component
 * A premium mobile navigation bar with a floating central play button and dynamic SVG notch.
 * Features:
 * - Smoothly animated notch using SVG path animation
 * - Floating action button (FAB) with soft shadows
 * - Responsive design (fixed at bottom for mobile)
 * - Backdrop blur and glassmorphism effects
 */
const BottomNavbar = () => {
  const [isActive, setIsActive] = useState(true);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Optional: Auto-animate notch on mount for visual "pop"
    const timeout = setTimeout(() => setIsActive(true), 500);

    const handleHide = (e) => setIsHidden(e.detail);
    window.addEventListener('hideBottomNavbar', handleHide);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('hideBottomNavbar', handleHide);
    };
  }, []);

  if (!isMounted || pathname === "/login" || pathname === "/signup" || isHidden) return null;

  // SVG Path Definitions (Responsive relative to 400x120 viewBox)
  // Flat state: Top edge constant at Y=30
  const flatPath = "M0 30 L400 30 L400 120 L0 120 Z";
  
  // Notched state: Center curve dipping down
  const notchedPath = "M0 30 L145 30 C170 30, 175 75, 200 75 C225 75, 230 30, 255 30 L400 30 L400 120 L0 120 Z";

  // Navigation Items
  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Menu", icon: Utensils, href: "/menu" },
    { label: "Play", icon: null, isCentral: true }, // Workspace for the FAB
    { label: "Call", icon: Phone, href: "tel:+919818981438" },
    { label: "Catering", icon: ChefHat, href: "/services/catering" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="relative w-full h-24 pointer-events-auto">
        
        {/* SVG Notch Background */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 400 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <motion.path
              d={(isActive ? notchedPath : flatPath) || "M0 0"}
              fill="rgba(10, 10, 10, 0.98)"
              animate={{ d: (isActive ? notchedPath : flatPath) || "M0 0" }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20
              }}
            />
          </svg>
          {/* Subtle Border/Glow for the path */}
          <svg
            viewBox="0 0 400 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <motion.path
              d={(isActive ? notchedPath : flatPath) || "M0 0"}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.5"
              animate={{ d: (isActive ? notchedPath : flatPath) || "M0 0" }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20
              }}
            />
          </svg>
        </div>

        {/* Floating Play Button */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-50">
          <Link href="/reels">
            <motion.button
              initial={{ y: 0, scale: 0.8, opacity: 0 }}
              animate={{ 
                y: isActive ? 34 : 0, 
                scale: 1.1, 
                opacity: 1,
                backgroundColor: "#dc2626"
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="group relative w-16 h-16 rounded-full flex items-center justify-center text-white transition-colors overflow-hidden"
            >
              {/* Inner Glow */}
              {/* <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" /> */}
              
              <motion.div
                animate={{ rotate: isActive ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Play fill="white" size={28} className="ml-1 drop-shadow-md" />
              </motion.div>
            </motion.button>
          </Link>
        </div>

        {/* Navigation Items Container */}
        <div className="absolute inset-x-0 bottom-0 pb-safe h-14 flex justify-between items-center px-2">
          {navItems.map((item, idx) => {
            if (item.isCentral) {
              return <div key="central-space" className="w-16 h-full" />;
            }

            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href || "#"}
                className="flex flex-col items-center justify-center min-w-[70px] py-4 transition-all active:scale-90"
              >
                <motion.div
                  animate={{
                    y: active ? -4 : 0,
                    scale: active ? 1.2 : 1,
                    color: active ? "#dc2626" : "#ffffff",
                  }}
                  className="relative "
                >
                  <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                  {/* {active && (
                    <motion.span
                      layoutId="activeDot"
                      className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.6)]"
                    />
                  )} */}
                </motion.div>
                <span className={`text-[25px] leading-tight mt-0.5 dongle-regular tracking-tight ${
                  active ? "text-red-500 font-bold" : "text-white/60"
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .dongle-regular {
          font-family: var(--font-dongle, "Dongle", sans-serif);
        }
      `}</style>
    </div>
  );
};

export default BottomNavbar;
