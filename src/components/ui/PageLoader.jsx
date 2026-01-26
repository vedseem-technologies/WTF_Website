"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * GLOBAL LOADER TOGGLE
 * Set this to false to completely disable the loader across the app.
 */
const IS_LOADER_ENABLED = true;

const PageLoader = ({ forceShow = false, onComplete }) => {
  const [isVisible, setIsVisible] = useState(forceShow && IS_LOADER_ENABLED);

  useEffect(() => {
    if (!IS_LOADER_ENABLED) {
      if (onComplete) onComplete();
      return;
    }

    // Ensure it shows for at least 3 seconds if forced (e.g., on specific page click)
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete, forceShow]);

  if (!IS_LOADER_ENABLED || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950"
      >
        <div className="relative flex flex-col items-center gap-8">
          {/* Pulsing/Blinking Logo */}
          <motion.div
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [0.95, 1, 0.95],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-32 h-32 md:w-48 md:h-48 relative"
          >
            <Image 
              src="/Logo.png" 
              alt="WTF Logo" 
              fill 
              className="object-contain" 
              priority
            />
          </motion.div>

          {/* Optional Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-white text-3xl md:text-5xl font-bold dongle-regular tracking-widest uppercase">
              Where's The Fork
            </h2>
            <div className="w-24 h-1 bg-red-600 rounded-full mt-2 overflow-hidden relative">
              <motion.div 
                className="absolute inset-x-0 h-full bg-white"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoader;
export { IS_LOADER_ENABLED };
