"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { itemData } from "@/components/sections/Popular-items"; // If possible to reuse, but menuSections has its own items
import { menuSections } from "@/data/menuData";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";

const accentMap = {
  yellow: {
    text: "text-yellow-400",
    border: "border-yellow-400",
    underline: "bg-yellow-400",
    button: "bg-yellow-500 hover:bg-yellow-600",
  },
  red: {
    text: "text-red-500",
    border: "border-red-500",
    underline: "bg-red-500",
    button: "bg-red-600 hover:bg-red-700",
  },
  green: {
    text: "text-green-500",
    border: "border-green-500",
    underline: "bg-green-500",
    button: "bg-green-600 hover:bg-green-700",
  },
};

export default function CategoryDetails() {
  const { slug } = useParams();
  
  // Find the section that matches the slug
  const section = menuSections.find((s) => s.slug === slug);

  if (!section) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 font-dongle">404</h1>
          <p className="text-2xl mb-8 font-dongle">Category not found</p>
          <Link href="/menu" className="bg-red-600 px-8 py-2 rounded-full text-xl font-dongle uppercase">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const accent = accentMap[section.accentColor] || accentMap.red;

  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] font-dongle">
      <Header />
      
      {/* Category Hero */}
      <div className="relative w-full h-[300px] md:h-[450px]">
        <Image
          src="/corousel-1.png" // Fallback or section-specific if added later
          alt={section.title}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-2xl md:text-3xl uppercase tracking-widest mb-2"
          >
            {section.phrase1}
          </motion.p>
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-6xl md:text-9xl font-black uppercase leading-none ${accent.text}`}
          >
            {section.title}
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 150 }}
            className={`h-1.5 md:h-2 rounded-full mt-4 ${accent.underline}`}
          />
        </div>
      </div>

      {/* Items Grid */}
      <section className="max-w-7xl mx-auto px-2 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-8">
          {section.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative
                h-[18rem] sm:h-[20rem] lg:h-[22rem]
                rounded-2xl overflow-hidden
                group cursor-pointer shadow-xl
                border ${accent.border}
              `}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-black via-black/70 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                <h3 className="text-white font-semibold text-2xl md:text-4xl leading-none">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between mt-2 md:mt-4">
                  <span className="text-white font-bold text-2xl md:text-3xl">
                    {item.price}
                  </span>
                  <p className="text-yellow-400 text-2xl md:text-3xl">
                    ⭐ {item.rating}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-20 text-center">
          <Link 
            href="/menu" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xl md:text-3xl transition-colors uppercase tracking-widest"
          >
            ← Explore other ranges
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
