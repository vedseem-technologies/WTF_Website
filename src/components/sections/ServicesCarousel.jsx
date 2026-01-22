"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  { 
    id: 1, 
    title: "Franchise Model", 
    image: "/block-1.png", 
    color: "from-blue-500/20 to-blue-900/40",
    description: "Expand your business with our proven franchise systems."
  },
  { 
    id: 2, 
    title: "Catering", 
    image: "/block-2.png", 
    color: "from-red-500/20 to-red-900/40",
    description: "Exquisite culinary experiences for your special events."
  },
  { 
    id: 3, 
    title: "Food Delivery", 
    image: "/block-3.png", 
    color: "from-yellow-500/20 to-yellow-900/40",
    description: "Fast and reliable delivery to your doorstep."
  },
  { 
    id: 4, 
    title: "Fine Dining", 
    image: "/block-4.png", 
    color: "from-green-500/20 to-green-900/40",
    description: "Immersive atmosphere and gourmet cuisine."
  },
  { 
    id: 5, 
    title: "Event Planning", 
    image: "/block-1.png", 
    color: "from-purple-500/20 to-purple-900/40",
    description: "Seamless coordination for unforgettable gatherings."
  },
  { 
    id: 6, 
    title: "Cloud Kitchen", 
    image: "/block-2.png", 
    color: "from-orange-500/20 to-orange-900/40",
    description: "Efficient delivery-only kitchen solutions."
  },
  { 
    id: 7, 
    title: "Bulk Orders", 
    image: "/block-3.png", 
    color: "from-pink-500/20 to-pink-900/40",
    description: "Customized large-scale catering and orders."
  },
];

export default function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slotSize, setSlotSize] = useState(350);
  const [isMobile, setIsMobile] = useState(false);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 2000);
  
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
  
      if (mobile) setSlotSize(160);
      else if (window.innerWidth < 1024) setSlotSize(250);
      else setSlotSize(350);
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
  
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const n = services.length;

  return (
    <section className="w-full py-16 md:py-24 bg-[#050505] overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 md:mt-8 relative z-10">
        <div className="text-center mb-12 md:mb-10">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-red-500 font-bold tracking-widest uppercase text-xs md:sm mb-4 block"
          >
            Premium Solutions
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-5xl font-black text-white mb-2 md:mb-6 tracking-tighter"
          >
            OUR MULTIPLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">SERVICES</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-transparent mx-auto rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative h-[400px] md:h-[450px] w-full flex items-center justify-center">
          {services.map((service, index) => {
            // Calculate distance d from activeIndex (normalized to [-n/2, n/2])
            let d = (index - (activeIndex % n));
            if (d > n / 2) d -= n;
            if (d < -n / 2) d += n;

            const isVisible = Math.abs(d) <= 2;
            
            // Animation values based on position d
            let x = d * slotSize;
            let scale = 1;
            let opacity = 1;
            let zIndex = 0;

            if (isVisible) {
              // Scale and opacity based on distance
              scale = 1 - Math.abs(d) * 0.25; // 0:1, 1:0.75, 2:0.5
              opacity = 1 - Math.abs(d) * (isMobile ? 0.4 : 0.3);
              zIndex = 30 - Math.abs(d) * 10;
            } else {
              // Position off-screen items
              x = d > 0 ? slotSize * 3 : -slotSize * 3;
              scale = 0.3;
              opacity = 0;
              zIndex = 0;
            }

            return (
              <motion.div
                key={service.id}
                initial={false}
                animate={{
                  x,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="absolute w-[240px] md:w-[300px] h-[350px] md:h-[420px] cursor-pointer group"
              >
                <div className={`w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-gradient-to-br ${service.color} backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col transition-colors duration-300 hover:border-red-500/30`}>
                  {/* Image Container */}
                  <div className="relative h-[60%] md:h-[65%] w-full p-3 md:p-4">
                    <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="px-6 md:px-8 pb-6 md:pb-8 flex flex-col justify-end flex-grow">
                    <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight uppercase">
                      {service.title}
                    </h3>
                    <p className="text-white/50 text-[10px] md:text-xs font-medium leading-relaxed line-clamp-2 transform transition-all duration-500 group-hover:text-white/80">
                      {service.description}
                    </p>
                    <motion.div 
                      className="w-8 h-1 bg-red-600 mt-4 rounded-full"
                      whileHover={{ width: 40 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Integrated Progress Navigation */}
      <div className="flex justify-center items-center gap-3 mt-8 relative z-20">
        {services.map((_, i) => {
          const isActive = (activeIndex % n) === i;
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="flex items-center transition-all duration-500 group"
            >
              {isActive ? (
                <div className="flex items-center gap-1.5">
                  {/* Left Dot */}
                  {/* <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]" /> */}
                  
                  {/* Progress Bar in between */}
                  <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                      key={activeIndex}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-red-600 to-orange-500"
                    />
                  </div>
                  
                  {/* Right Dot */}
                  {/* <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]" /> */}
                </div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/40 transition-all duration-300" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
