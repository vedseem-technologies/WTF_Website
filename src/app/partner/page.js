'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/sections/Header';

export default function BrandReveal() {
  return (
    <div className="w-full bg-white min-h-screen flex flex-col items-center justify-center relative px-4 py-10 md:py-20 z-0">
      <Header />
      <div 
        className="text-center flex flex-col items-center gap-6 md:gap-8 "
      >
        {/* Logo */}
        <div className="w-24 h-24 md:w-48 md:h-48 relative mb-2 md:mb-4">
             <Image src="/Logo.png" alt="Brand Logo" fill className="object-contain" />
        </div>

        {/* Headline */}
        <h1 
            className="text-4xl md:text-7xl lg:text-9xl uppercase tracking-tighter text-[#D62828] leading-none text-center"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 900 }}
        >
          WHERE’S<br />THE FORK
        </h1>

        {/* Content Section */}
        <div className="flex flex-col items-center gap-4 mt-6 md:mt-8 w-full">
            
            {/* Headline Text */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#D62828] tracking-wide uppercase">
                Get Franchise
            </h2>

            {/* Buttons Row */}
            <div className="flex flex-row gap-4 md:gap-6 w-full justify-center">
                 {/* WTF Button */}
                 <motion.a
                    href="https://partnerships.wtffoods.in/forms/wtf"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="px-8 py-3 md:py-4 bg-[#D62828] text-white text-lg md:text-xl font-bold rounded-full hover:bg-red-700 transition-colors duration-300 shadow-lg text-center min-w-[120px] md:min-w-[150px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    WTF
                </motion.a>

                {/* ROLL-X Button */}
                <motion.a
                    href="https://partnerships.wtffoods.in/forms/roll-x"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 md:py-4 bg-[#D62828] text-white text-lg md:text-xl font-bold rounded-full hover:bg-red-700 transition-colors duration-300 shadow-lg text-center min-w-[120px] md:min-w-[150px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ROLL-X
                </motion.a>
            </div>

            {/* Contact Button */}
            <motion.a
                href="https://www.instagram.com/sahil.sethi01/"
                target="_blank"
                rel="noopener noreferrer" 
                className="px-6 py-2 md:py-3 bg-white text-[#D62828] border-2 border-[#D62828] text-base md:text-lg font-bold rounded-full hover:bg-red-50 transition-colors duration-300 shadow-lg text-center min-w-[100px] md:min-w-[130px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Contact
            </motion.a>

            {/* Under Construction Text */}
            {/* <p className="text-xs md:text-sm text-gray-500 font-medium tracking-wider mt-2 opacity-80">
               We are under transformation
            </p> */}
        </div>
      </div>
    </div>
  );
}
