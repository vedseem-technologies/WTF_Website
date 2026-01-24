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
    phrase1:"Here's Our",
    title: "Paneer",
    phrase2:" Range...",
    accentColor: "yellow",
    items: [
      { id: 1, name: "Achari Paneer Tikka", price: "₹149/-", image: "/block-1.png", rating: 4.5 },
      { id: 2, name: "Paneer Butter Masala", price: "₹219/-", image: "/block-2.png", rating: 4.8 },
      { id: 3, name: "Paneer Tikka Masala", price: "₹219/-", image: "/block-3.png", rating: 4.6 },
      { id: 4, name: "Kadai Paneer", price: "₹249/-", image: "/block-4.png", rating: 4.7 },
    ],
  },
  {
    phrase1:"Here's Our",
    title: "Fast Food",
    phrase2:" Range...",
    accentColor: "red",
    items: [
      { id: 5, name: "Malai Kofta", price: "₹249/-", image: "/block-1.png", rating: 4.4 },
      { id: 6, name: "Mushroom Masala", price: "₹349/-", image: "/block-2.png", rating: 4.6 },
      { id: 7, name: "Mushroom Lababdar", price: "₹229/-", image: "/block-3.png", rating: 4.5 },
      { id: 8, name: "Maharaja Veg Delight", price: "₹199/-", image: "/block-4.png", rating: 4.3 },
    ],
  },
  {
    phrase1:"Here's Our",
    title: "South India",
    phrase2:" Range...",
    accentColor: "green",
    items: [
      { id: 9, name: "Biryani", price: "₹149/-", image: "/block-1.png", rating: 4.6 },
      { id: 10, name: "Plain Dosa", price: "₹149/-", image: "/block-2.png", rating: 4.4 },
      { id: 11, name: "Masala Dosa", price: "₹159/-", image: "/block-3.png", rating: 4.7 },
      { id: 12, name: "Idli Sambhar", price: "₹149/-", image: "/block-4.png", rating: 4.5 },
    ],
  },
];


export default function MenuPage() {
  return (
    <div className="w-full min-h-screen bg-[#0f0f0f]">

      {/* HERO */}
      <div className="relative w-full h-[280px] md:h-[420px]">
        <Image
          src="/corousel-1.png"
          alt="Food Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-yellow-400 text-6xl md:text-8xl font-bold">
            Our Food Items
          </h1>
        </div>
      </div>

      {/* MENU SECTIONS */}
      <section className="px-3 sm:px-4 md:px-10 py-10 md:py-14 w-full md:w-[96%] mx-auto">

        {menuSections.map((section, index) => (
          <div
            key={index}
            className="
              mb-12 md:mb-16
              bg-gray-800/20 backdrop-blur-sm
              py-6 lg:py-8
              px-4 sm:px-8 lg:px-14
              rounded-2xl
              border border-white/50
            "
          >
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2 lg:gap-4">
              <div>
                <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold">
                  {section.phrase1}{" "}
                  <span className={accentMap[section.accentColor].text}>
                    {section.title}
                  </span>
                  {section.phrase2}
                </h2>

                <div
                  className={`mt-0 lg:mt-4 h-[3px] w-20 md:w-24 rounded-full ${accentMap[section.accentColor].underline}`}
                />
              </div>

              <button className="self-start sm:self-auto text-white bg-red-500 py-1 px-6 rounded-full text-2xl lg:text-3xl">
                View All
              </button>
            </div>

            {/* Horizontal Scroll */}
            <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4">

              {section.items.map((item) => (
                <div
                  key={item.id}
                  className={`
                    relative
                    min-w-[14rem] h-[18rem]
                    sm:min-w-[16rem] sm:h-[20rem]
                    lg:min-w-[18rem] lg:h-[22rem]
                    rounded-2xl overflow-hidden
                    group cursor-pointer shadow-xl
                    border ${accentMap[section.accentColor].border}
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
                </div>
              ))}
            </div>
          </div>
        ))}

      </section>
    </div>
  );
}
