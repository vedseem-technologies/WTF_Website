"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Footer from "./Footer";

// --- Section 1: Franchise Hero (WTF Reveal) ---
function FranchiseHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.0001,
  });

  const leftX = useTransform(smoothProgress, [0, 0.4], ["0%", "-110%"]);
  const rightX = useTransform(smoothProgress, [0, 0.4], ["0%", "110%"]);
  const contentScale = useTransform(smoothProgress, [0, 0.4], [0.85, 1]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.35], [0, 1]);
  const swipeDownOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-zinc-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          style={{
            scale: contentScale,
            opacity: contentOpacity,
            willChange: "transform, opacity",
          }}
          className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center px-4"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/c3.jpg.jpeg"
              alt="WTF Foods Culinary Background"
              fill
              priority
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/50" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-sm md:max-w-3xl lg:max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 md:mb-4 lg:mb-6 xl:mb-8"
            >
              <Image
                src="/logo_orig.png"
                alt="WTF Logo"
                width={180}
                height={180}
                className="object-contain"
              />
            </motion.div>
            {/* <motion.span className="text-[#D62828] font-black uppercase tracking-[0.5em] text-sm md:text-xl mb-6">
              The Roll-X Factor
            </motion.span> */}
            <h1 className="text-3xl lg:text-5xl xl:text-7xl text-white font-black leading-none uppercase mb-8 drop-shadow-2xl">
              OWN THE <span className="text-[#D62828]">GAME</span>
            </h1>
            <p
              className="text-xl lg:text-2xl xl:text-3xl text-zinc-300 max-w-4xl font-light mb-12"
              style={{
                lineHeight: "1.2",
              }}
            >
              Disrupt the QSR industry with India's most aggressive food
              movement. This isn't just a franchise; it's a culinary powerhouse.
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#fff",
                color: "#D62828",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#D62828] text-white px-5 py-3 md:px-6 md:py-2 lg:px-8 lg:py-3 xl:px-10 xl:py-4 rounded-full text-md md:text-xl lg:text-xl xl:text-xl uppercase tracking-widest shadow-2xl transition-all duration-300"
            >
              Request Access
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          style={{
            x: leftX,
            willChange: "transform",
          }}
          className="w-1/2 h-full relative overflow-hidden z-10"
        >
          <div className="absolute inset-0 w-[200%] h-full">
            <Image
              src="/hero-brand.webp"
              alt="WTF Hero"
              fill
              priority
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          style={{
            x: rightX,
            willChange: "transform",
          }}
          className="w-1/2 h-full relative overflow-hidden z-10"
        >
          <div className="absolute inset-0 w-[200%] h-full -left-[100%]">
            <Image
              src="/hero-brand.webp"
              alt="WTF Hero"
              fill
              priority
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: swipeDownOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-white text-lg font-bold tracking-[0.3em] uppercase opacity-60">
            Scroll to Enter
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white text-3xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Section 2: Brand Ethos ---
function BrandEthos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(214,40,40,0.3)] aspect-[4/5] max-w-[500px]"
          >
            <Image
              src="/c1.jpg.jpeg"
              alt="The WTF Vibe"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 30, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute -bottom-10 -right-10 md:right-0 z-20 w-3/5 rounded-[2.5rem] overflow-hidden border-[7px] border-white shadow-2xl aspect-square hidden md:block"
          >
            <Image
              src="/c2.jpg.jpeg"
              alt="The Roll-X Secret"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-4 md:gap-6 lg:gap-8 xl:gap-10"
        >
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-[3px] rounded-full bg-[#D62828]" />
            <span className="text-[#D62828] font-black uppercase tracking-widest text-md lg:text-2xl">
              Our Identity
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-zinc-950 font-black uppercase leading-none">
            What is <span className="text-[#D62828]">WTF?</span>
          </h2>
          <p className="text-xl md:text-xl lg:text-2xl text-zinc-700 leading-relaxed font-medium">
            WTF Foods isn't a kitchen; it's a movement. We've cracked the code
            of India's street-food obsession and transformed it into a scalable,
            high-tech culinary engine.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-zinc-500 leading-relaxed">
            Our Roll-X range has redefined the Kathi Roll forever. We don't
            follow trends—we set them, one explosive flavor at a time.
          </p>
          <div className="grid grid-cols-2 gap-10 pt-2 lg:pt-6">
            <div className="flex flex-col">
              <span className="lg:text-6xl md:text-5xl text-4xl font-black text-[#D62828] leading-none md:mb-2">
                100%
              </span>
              <span className="lg:text-lg md:text-md text-sm mt-2 lg:font-bold md:font-medium font-medium uppercase text-zinc-400 tracking-widest">
                Growth Retention
              </span>
            </div>
            <div className="flex flex-col">
              <span className="lg:text-6xl md:text-5xl text-4xl font-black text-zinc-950 leading-none md:mb-2">
                Zero
              </span>
              <span className="lg:text-lg md:text-md text-sm mt-2 lg:font-bold md:font-medium font-medium uppercase text-zinc-400 tracking-widest">
                Royalty Drama
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Section 3: The Edge (Why Choose Us) ---
function TheEdge() {
  const benefits = [
    {
      title: "Battle-Tested Logic",
      desc: "Our operational blueprints are built for chaos and refined for maximum profitability.",
      icon: (
        <svg
          className="w-10 h-10 text-[#D62828]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Unstoppable Support",
      desc: "From supply chain dominance to digital marketing warfare, we are your elite wingman.",
      icon: (
        <svg
          className="w-10 h-10 text-[#D62828]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "ROI Velocity",
      desc: "Designed for a lightning-fast break-even point with one of the industry's lowest CAPEX.",
      icon: (
        <svg
          className="w-10 h-10 text-[#D62828]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3c6.667 0 6.667-10 0-10"
          />
        </svg>
      ),
    },
    {
      title: "The Roll-X Appeal",
      desc: "A product line that owns the market craving. High recall, high demand, high impact.",
      icon: (
        <svg
          className="w-10 h-10 text-[#D62828]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-[90%] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 lg:mb-20 gap-10">
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <span className="text-[#D62828] font-bold uppercase tracking-widest text-sm lg:text-xl">
              Strategic Partnership
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-zinc-950 font-black uppercase leading-none">
              The <span className="text-[#D62828]">Disruptor's</span> Edge
            </h2>
          </div>
          <Link href="/contact" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-zinc-950 hidden md:block text-white lg:px-10 px-8 py-2 lg:py-4 rounded-xl font-black uppercase tracking-widest shadow-xl border-2 border-transparent hover:bg-[#D62828] transition-all lg:text-lg text-md"
            >
              Inquire Now
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 flex flex-col gap-6 h-full group hover:shadow-2xl hover:border-red-100 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center transition-colors duration-500">
                <div className="text-[#D62828]">{benefit.icon}</div>
              </div>
              <div className="flex flex-col gap-4 flex-grow">
                <h3 className="lg:text-xl md:text-lg text-base text-zinc-950 font-bold leading-tight min-h-[2.25em] flex items-center uppercase">
                  {benefit.title}
                </h3>
                <p className="text-zinc-500 lg:text-lg md:text-base text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Section 4: Blueprint (Investment) ---
function Blueprint() {
  return (
    <section className="py-4 md:py-16 bg-white overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-12 order-2 lg:order-1">
            <div className="flex flex-col gap-6">
              <h2 className="text-zinc-950 font-black text-3xl lg:text-4xl xl:text-5xl uppercase leading-none">
                How WTF <span className="text-[#D62828]">Dominates</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl leading-relaxed mb-4">
                We've eliminated the legacy baggage of old-school food
                franchises:
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  "Absolute 0% Royalty on all sales—always.",
                  "Exclusive Access to handcrafted WTF secret recipes.",
                  "Data-Driven inventory algorithms for zero waste.",
                  "Automated Digital Ad machine focused on your radius.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-4 lg:text-xl text-zinc-800 lg:font-semibold leading-[1.1] items-center"
                  >
                    <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D62828] flex items-center justify-center shrink-0 text-sm">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="flex flex-col gap-6 p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                 <Image src="/logo_orig.png" alt="WTF" width={50} height={50} />
              </div>
              <h3 className="text-zinc-950 font-semibold text-xl lg:text-2xl xl:text-3xl uppercase tracking-tighter">Investment Blueprint</h3>
              <ul className="flex flex-col gap-2 list-disc pl-6 text-zinc-700">
                <li className="text-lg">
                  <span className="font-semibold">Franchise fee:</span> INR 8,26,000 (Inclusive of GST)
                </li>
                <li className="text-lg">
                  <span className="font-semibold">Total Investment:</span> INR 15,00,000 to 17,00,000
                </li>
                <li className="text-lg">
                  <span className="font-semibold">What's Included -</span>
                  <ul className="mt-2 flex flex-col gap-1.5 list-circle pl-6">
                    <li className="text-base">Brand licensing services, continuous staff training, marketing, and ownership of selective recipes</li>
                    <li className="text-base">0% Royalty till the contract ends</li>
                    <li className="text-base">Call center support for CSAT</li>
                    <li className="text-base">Hasle free inventory system</li>
                    <li className="text-base">Robust Training System</li>
                    <li className="text-base">Manpower Support Solutions</li>
                  </ul>
                </li>
              </ul>
              <motion.a
                href="https://partnerships.wtffoods.in/forms/wtf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 bg-[#D62828] text-white px-8 py-4 rounded-xl uppercase tracking-widest shadow-lg transition-all text-lg flex items-center justify-center"
              >
                Secure Your Territory
              </motion.a>
            </div> */}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2 lg:pl-10"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden border-[7px] border-[#D62828] shadow-[0_30px_60px_-15px_rgba(214,40,40,0.4)] aspect-[4/5] w-full max-w-[550px] mx-auto">
              <Image
                src="/our-food-menu.jpg"
                alt="WTF Mastery"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function BrandHero() {
  return (
    <main className="w-full bg-white partner-typography">
      <FranchiseHero />
      <BrandEthos />
      <TheEdge />
      <Blueprint />
    </main>
  );
}
