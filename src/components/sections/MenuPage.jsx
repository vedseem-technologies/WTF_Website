"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Sample food items data with type (veg/nonveg)
const foodItems = [
  {
    id: 1,
    name: "Paneer Tikka",
    price: "₹299",
    image: "/block-1.png",
    type: "veg",
  },
  {
    id: 2,
    name: "Butter Chicken",
    price: "₹349",
    image: "/block-2.png",
    type: "nonveg",
  },
  {
    id: 3,
    name: "Veg Biryani",
    price: "₹249",
    image: "/block-3.png",
    type: "veg",
  },
  {
    id: 4,
    name: "Dal Makhani",
    price: "₹199",
    image: "/block-4.png",
    type: "veg",
  },
  {
    id: 5,
    name: "Garlic Naan",
    price: "₹49",
    image: "/block-1.png",
    type: "veg",
  },
  {
    id: 6,
    name: "Chicken Tikka",
    price: "₹329",
    image: "/block-2.png",
    type: "nonveg",
  },
  {
    id: 7,
    name: "Pasta Alfredo",
    price: "₹279",
    image: "/block-3.png",
    type: "veg",
  },
  {
    id: 8,
    name: "Veg Manchurian",
    price: "₹229",
    image: "/block-4.png",
    type: "veg",
  },
  {
    id: 9,
    name: "Fried Rice",
    price: "₹199",
    image: "/block-1.png",
    type: "veg",
  },
  {
    id: 10,
    name: "Chicken Wings",
    price: "₹299",
    image: "/block-2.png",
    type: "nonveg",
  },
  {
    id: 11,
    name: "Chilli Paneer",
    price: "₹269",
    image: "/block-3.png",
    type: "veg",
  },
  {
    id: 12,
    name: "Fish Curry",
    price: "₹389",
    image: "/block-4.png",
    type: "nonveg",
  },
];

// Scrolling banner images
const bannerImages = [
  "/corousel-1.png",
  "/corousel-2.png",
  "/block-1.png",
  "/block-2.png",
  "/block-3.png",
  "/block-4.png",
];

function MenuPage() {
  const [filter, setFilter] = useState("all"); // 'all', 'veg', 'nonveg'

  const filteredItems = foodItems.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Scrolling Image Banner */}
      <div className="w-full h-64 md:h-80 overflow-hidden relative bg-black">
        <div className="animate-scroll flex">
          {/* Duplicate images for seamless loop */}
          {[...bannerImages, ...bannerImages].map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 md:w-80 h-64 md:h-80 relative"
            >
              <Image
                src={img}
                alt={`Food ${index + 1}`}
                fill
                className="object-cover"
              />
              {/* Steam animation overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* Overlay text */}
        <div className="absolute top-4 left-4 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Menu Page</h1>
          <p className="text-sm text-gray-300">scrolling image with a</p>
        </div>
      </div>

      {/* Our Food Items Section */}
      <section className="w-full bg-[#1a1a1a] py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-6">
            <h2
              className="text-3xl md:text-1xl font-bold"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              <span className="text-white">Our </span>
              <span className="text-red-700">Food</span>
              <span className="text-white"> Items</span>
            </h2>
          </div>

          {/* Title and Veg Toggle Row */}
          <div className="flex justify-between items-center mb-10">
            <div></div>

            {/* iOS-style Veg Toggle on the right */}
            <div
              onClick={() => setFilter(filter === "veg" ? "all" : "veg")}
              className={`relative w-16 h-7 rounded-full cursor-pointer transition-all duration-300 ${
                filter === "veg" ? "bg-green-500" : "bg-gray-600"
              }`}
            >
              {/* Toggle Circle */}
              <div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
                  filter === "veg" ? "left-9" : "left-0.5"
                }`}
              >
                {/* Line indicator */}
                <span className="text-gray-400 font-bold text-xs">|</span>
              </div>

              {/* Veg Label */}
              <span
                className={`absolute right-2 top-1/2 -translate-y-1/2 text-white font-semibold text-sm transition-opacity ${
                  filter === "veg" ? "opacity-0" : "opacity-100"
                }`}
              >
                veg
              </span>
              <span
                className={`absolute left-2 top-1/2 -translate-y-1/2 text-white font-semibold text-sm transition-opacity ${
                  filter === "veg" ? "opacity-100" : "opacity-0"
                }`}
              >
                veg
              </span>
            </div>
          </div>

          {/* Food Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                {/* Card with overlapping circle */}
                <div className="relative w-36 flex flex-col items-center mx-auto">
                  {/* Circle - Absolutely positioned to overlap */}
                  <div
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full overflow-hidden border-[6px] z-10 ${
                      item.type === "veg"
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>

                  {/* Rectangle - Positioned below with padding for overlap */}
                  <div className="mt-24 bg-gray-200 rounded-2xl px-22 pt-32 pb-6 flex flex-col items-center w-full">
                    <p className="text-red-800 font-semibold text-sm text-center">
                      {item.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No items message */}
          {filteredItems.length === 0 && (
            <div className="text-center text-gray-400 py-10">
              <p>No items found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MenuPage;
