
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Default images as fallback
const defaultImages = [
  { src: "/Hero.jpeg", alt: "Hero 1" },
  { src: "/our-food-menu.jpg", alt: "Hero 5" },
  { src: "/c2.jpg.jpeg", alt: "Hero 2" },
  { src: "/c3.jpg.jpeg", alt: "Hero 3" },
  { src: "/c4.jpg.jpeg", alt: "Hero 4" },
];

function Hero() {
  const [heroImages, setHeroImages] = useState(defaultImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch Banner Images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner?limit=100`);
        if (response.ok) {
          const result = await response.json();
          const bannerData = result.data || [];
          const activeBanners = bannerData.filter(item => item.active);

          if (activeBanners && activeBanners.length > 0) {
            setHeroImages(activeBanners.map((item, index) => ({
              src: item.image,
              alt: `Hero ${index + 1}`
            })));
          }
        }
      } catch (error) {
        console.error("Failed to fetch banner images:", error);
      }
    };
    fetchImages();
  }, []);

  // Auto-rotate images every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

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
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              relative overflow-hidden cursor-pointer transition-all duration-300 rounded-full
              ${index === currentIndex ? "w-12 h-3 bg-white/30" : "w-3 h-3 bg-white/50 hover:bg-white/80"}
            `}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <motion.div
                layoutId="progress-bar"
                className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 30, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
