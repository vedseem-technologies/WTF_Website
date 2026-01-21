"use client";

import React from "react";
import Image from "next/image";


const accentMap = {
  yellow: {
    text: "text-yellow-400",
    border: "border-yellow-400",
    underline: "bg-yellow-400",
  },
  red: {
    text: "text-red-500",
    border: "border-red-500",
    underline: "bg-red-500",
  },
  green: {
    text: "text-green-500",
    border: "border-green-500",
    underline: "bg-green-500",
  },
};

/* ============================
   MENU DATA (CATEGORY BASED)
=============================== */
const menuSections = [
  {
    title: "Here's Our Paneer Range...",
    accentColor: "yellow",
    items: [
      { id: 1, name: "Achari Paneer Tikka", price: "₹149/-", image: "/block-1.png", rating: 4.5 },
      { id: 2, name: "Paneer Butter Masala", price: "₹219/-", image: "/block-2.png", rating: 4.8 },
      { id: 3, name: "Paneer Tikka Masala", price: "₹219/-", image: "/block-3.png", rating: 4.6 },
      { id: 4, name: "Kadai Paneer", price: "₹249/-", image: "/block-4.png", rating: 4.7 },
    ],
  },
  {
    title: "Here's Our Fast Food Range...",
    accentColor: "red",
    items: [
      { id: 5, name: "Malai Kofta", price: "₹249/-", image: "/block-1.png", rating: 4.4 },
      { id: 6, name: "Mushroom Masala", price: "₹349/-", image: "/block-2.png", rating: 4.6 },
      { id: 7, name: "Mushroom Lababdar", price: "₹229/-", image: "/block-3.png", rating: 4.5 },
      { id: 8, name: "Maharaja Veg Delight", price: "₹199/-", image: "/block-4.png", rating: 4.3 },
    ],
  },
  {
    title: "Here's Our Large Range Of South India Taste...",
    accentColor: "green",
    items: [
      { id: 9, name: "Biryani", price: "₹149/-", image: "/block-1.png", rating: 4.6 },
      { id: 10, name: "Plain Dosa", price: "₹149/-", image: "/block-2.png", rating: 4.4 },
      { id: 11, name: "Masala Dosa", price: "₹159/-", image: "/block-3.png", rating: 4.7 },
      { id: 12, name: "Idli Sambhar", price: "₹149/-", image: "/block-4.png", rating: 4.5 },
    ],
  },
];


/* ============================
   COMPONENT
=============================== */
export default function MenuPage() {
  return (
    <div className="w-full min-h-screen bg-[#0f0f0f]">

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[420px]">
        <Image
          src="/corousel-1.png"
          alt="Food Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-yellow-400 text-4xl md:text-6xl font-bold">
            Our Food Items
          </h1>
        </div>
      </div>

      {/* ================= MENU SECTIONS ================= */}
      <section className="px-4 md:px-10 py-14 w-[96%] mx-auto">

        {menuSections.map((section, index) => (
          <div key={index} className="mb-16 bg-white/10 backdrop-blur-sm py-8 px-14 rounded-2xl border-1 border-white/50">

            {/* Section Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="mb-6">
                <h2 className="text-white text-lg md:text-2xl font-semibold">
                  <span className={accentMap[section.accentColor].text}>
                    {section.title}
                  </span>
                </h2>
              
                {/* Underline */}
                <div
                  className={`mt-2 h-[3px] w-24 rounded-full ${accentMap[section.accentColor].underline}`}
                />
              </div>
              
              <button className="text-white bg-red-500 py-1 px-4 rounded-full text-lg">View All</button>
            </div>
            {/* Horizontal Scroll */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">

              {section.items.map((item) => (
                <div
                  key={item.id}
                  className={`relative min-w-[18rem] max-w-[18rem] h-[22rem]
                  rounded-2xl overflow-hidden group cursor-pointer shadow-xl
                  border-1 ${accentMap[section.accentColor].border}`}
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
              
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/30" />
              
                  {/* Bottom Gradient for Text */}
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent" />
              
                  {/* Content OVER Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h3 className="text-white font-semibold text-xl leading-tight">
                      {item.name}
                    </h3>
            
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-white font-bold text-lg">
                        {item.price}
                      </span>
              
                    <p className="text-yellow-400 text-lg mt-1">
                      ⭐ {item.rating}
                    </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </section>
    </div>
  );
}
