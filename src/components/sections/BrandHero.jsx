"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function BrandReveal() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative px-4 py-10 md:py-20 z-0">
      <div className="text-center flex flex-col items-center gap-6 md:gap-8 -mt-15">
        <div className="flex flex-col items-center gap-4 mt-6 md:mt-8 w-full">
          <h2
            className="text-4xl md:text-7xl lg:text-9xl uppercase tracking-tighter text-[#D62828] leading-none text-center"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 800,
            }}
          >
            Partner With Us!
          </h2>

          <div className="flex flex-row gap-8 md:gap-16 w-full justify-center flex-wrap pt-4">
            {/* WTF Logo Link */}
            <motion.a
              href="https://partnerships.wtffoods.in/forms/wtf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center p-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-32 h-32 md:w-56 md:h-56">
                <Image
                  src="/logo_orig.png"
                  alt="WTF Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.a>

            {/* ROLL-X Logo Link */}
            <motion.a
              href="https://partnerships.wtffoods.in/forms/roll-x"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center p-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-32 h-32 md:w-56 md:h-56">
                <Image
                  src="/roll-x.png"
                  alt="Roll-X Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrandHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const leftX = useTransform(smoothProgress, [0, 0.75], ["0%", "-200%"]);
  const rightX = useTransform(smoothProgress, [0, 0.75], ["0%", "200%"]);

  const revealScale = useTransform(smoothProgress, [0, 0.75], [0.8, 1]);
  const revealY = useTransform(smoothProgress, [0, 0.75], [100, 0]);
  const revealOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);
  const swipeDownOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="h-[250vh] relative bg-white">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex justify-center items-center">
        {/* Brand Reveal (Behind) */}
        <motion.div
          style={{ scale: revealScale, y: revealY, opacity: revealOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <BrandReveal />
        </motion.div>

        {/* Left Half (Front) */}
        <motion.div
          style={{ x: leftX }}
          className="w-1/2 h-full relative overflow-hidden z-10"
        >
          <div className="absolute inset-0 w-[200%] h-full">
            {/* Desktop Image */}
            <Image
              src="/hero-brand.png"
              alt="Hero Left"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center hidden md:block"
            />
            {/* Mobile Image */}
            <Image
              src="/hero1_orig.png"
              alt="Hero Left Mobile"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center block md:hidden"
            />
          </div>
        </motion.div>

        {/* Right Half (Front) */}
        <motion.div
          style={{ x: rightX }}
          className="w-1/2 h-full relative overflow-hidden z-10"
        >
          <div className="absolute inset-0 w-[200%] h-full -left-[100%]">
            {/* Desktop Image */}
            <Image
              src="/hero-brand.png"
              alt="Hero Right"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center hidden md:block"
            />
            {/* Mobile Image */}
            <Image
              src="/hero1_orig.png"
              alt="Hero Right Mobile"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center block md:hidden"
            />
          </div>
        </motion.div>

        {/* Swipe Down Indicator */}
        <motion.div
          style={{ opacity: swipeDownOpacity }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-white text-sm md:text-base font-medium tracking-wider drop-shadow-lg">
            Swipe Down
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white text-2xl drop-shadow-lg"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
