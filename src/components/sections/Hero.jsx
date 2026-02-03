
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Array of hero images to rotate through
const heroImages = [
  { src: "/Hero.jpeg", alt: "Hero 1" },
  { src: "/block-1.png", alt: "Hero 2" },
  { src: "/block-2.png", alt: "Hero 3" },
  { src: "/corousel-1.png", alt: "Hero 4" },
  { src: "/our-food-menu.jpg", alt: "Hero 5" },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate images every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden">
      {/* Background Images with Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentIndex].src}
            alt={heroImages[currentIndex].alt}
            fill
            priority={currentIndex === 0}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="text-white max-w-full">
          <h1
            className="
              md:hidden
              lg:mt-[6rem]
              md:mt-[4rem]
              mt-[2rem]
              leading-[1.0]
              tracking-tighter
              break-words
              uppercase
              font-normal
              font-cheddar
            "
          >
            <span className="block text-[6rem] md:text-[6rem] lg:text-[10rem] font-normal leading-none">Where</span>
            <span className="text-[#ff0000] block text-[8rem] md:text-[8rem] lg:text-[14rem] font-normal leading-none my-1">Food</span>
            <span className="block text-[6rem] md:text-[6rem] lg:text-[10rem] font-normal leading-none">Begins</span>
          </h1>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              transition-all duration-300
              ${index === currentIndex 
                ? "w-12 h-3 bg-red-600" 
                : "w-3 h-3 bg-white/50 hover:bg-white/80"
              }
              rounded-full
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
