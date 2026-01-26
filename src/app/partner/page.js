'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/sections/Header';
import PageLoader from '@/components/ui/PageLoader';

export default function BrandReveal() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Page Loader appears on mount for min 3s */}
      <PageLoader forceShow={true} onComplete={() => setLoading(false)} />

      <div className="w-full bg-white min-h-screen flex flex-col items-center justify-center relative px-4 py-10 md:py-20 z-0 overflow-hidden">
        <Header />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="text-center flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl"
        >

          <motion.div className="flex flex-row gap-4 md:gap-6 w-full justify-center">
            {/* Logo with 3D Flip & Scale */}
            {/* <motion.div 
              initial={{ rotateY: 180, scale: 0, opacity: 0 }}
              animate={!loading ? { rotateY: 0, scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.8 }}
              className="w-32 h-32 md:w-48 md:h-48 relative mb-2 md:mb-4"
            >
              <Image src="/Logo.png" alt="Brand Logo" fill className="object-contain" priority />
            </motion.div> */}
  
            {/* Logo with 3D Flip & Scale */}
            {/* <motion.div 
              initial={{ rotateY: 180, scale: 0, opacity: 0 }}
              animate={!loading ? { rotateY: 0, scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.8 }}
              className="w-32 h-32 md:w-48 md:h-48 relative mb-2 md:mb-4"
            >
              <Image src="/rollx-logo.png" alt="Brand Logo" fill className="object-contain" priority />
            </motion.div> */}
          </motion.div>
          {/* Headline with Character-like Slide Up */}
          <motion.h1 
            initial={{ y: 100, opacity: 0, skewY: 10 }}
            animate={!loading ? { y: 0, opacity: 1, skewY: 0 } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="text-4xl md:text-7xl lg:text-9xl uppercase tracking-tighter text-[#D62828] leading-none text-center"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 900, letterSpacing: '2px' }}
          >
            Be Our<br /> Partner
          </motion.h1>

          {/* Subheading with Fade & Slide Right */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={!loading ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-4 mt-6 md:mt-8 w-full"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#D62828] tracking-wide uppercase">
                Get Franchise
            </h2>

            {/* Buttons Row with Sequential Pop-in */}
            <div className="flex flex-row gap-4 md:gap-6 w-full justify-center">
                 <motion.a
                    href="https://partnerships.wtffoods.in/forms/wtf"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={!loading ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="px-8 py-3 md:py-4 bg-[#D62828] text-white text-lg md:text-xl font-bold rounded-full transition-all duration-300 shadow-lg text-center min-w-[120px] md:min-w-[150px] hover:shadow-red-500/50"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    initial={{ rotateY: 180, scale: 0, opacity: 0 }}
                    animate={!loading ? { rotateY: 0, scale: 1, opacity: 1 } : {}}
                    transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.8 }}
                    className="w-32 h-32 md:w-48 md:h-48 relative mb-2 md:mb-4"
                  >
                    <Image src="/rollx-logo.png" alt="Brand Logo" fill className="object-contain" priority />
                  </motion.div>
                </motion.a>

                <motion.a
                    href="https://partnerships.wtffoods.in/forms/roll-x"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={!loading ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 1.0 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 md:py-4 bg-[#D62828] text-white text-lg md:text-xl font-bold rounded-full transition-all duration-300 shadow-lg text-center min-w-[120px] md:min-w-[150px] hover:shadow-red-500/50"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    initial={{ rotateY: 180, scale: 0, opacity: 0 }}
                    animate={!loading ? { rotateY: 0, scale: 1, opacity: 1 } : {}}
                    transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.8 }}
                    className="w-32 h-32 md:w-48 md:h-48 relative mb-2 md:mb-4"
                  >
                    <Image src="/Logo.png" alt="Brand Logo" fill className="object-contain" priority />
                  </motion.div>
                </motion.a>
            </div>

            {/* Contact Button with Bloom/Fade In */}
            {/* <motion.a
                href="https://www.instagram.com/sahil.sethi01/"
                initial={{ opacity: 0, y: 20 }}
                animate={!loading ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1.2 }}
                target="_blank"
                rel="noopener noreferrer" 
                className="px-6 py-2 md:py-3 bg-white text-[#D62828] border-2 border-[#D62828] text-base md:text-lg font-bold rounded-full transition-all duration-300 shadow-lg text-center min-w-[100px] md:min-w-[130px] hover:bg-red-50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                Contact
            </motion.a> */}
          </motion.div>
        </motion.div>

        {/* Dynamic Background Glows */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={!loading ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={!loading ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, delay: 0.7 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" 
        />
      </div>
    </>
  );
}
