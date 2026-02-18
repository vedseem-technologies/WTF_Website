"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllRangeMenus } from "../../services/menuService";

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

const rangeConfig = {
  "Paneer Range": {
    phrase1: "Here's Our",
    title: "Paneer",
    phrase2: " Range...",
    slug: "paneer",
    accentColor: "yellow",
  },
  "Fast Food Range": {
    phrase1: "Here's Our",
    title: "Fast Food",
    phrase2: " Range...",
    slug: "fast-food",
    accentColor: "red",
  },
  "Chinese Range": {
    phrase1: "Here's Our",
    title: "Chinese",
    phrase2: " Range...",
    slug: "chinese",
    accentColor: "green",
  },
};

export default function MenuPage() {
  const [menuSections, setMenuSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await getAllRangeMenus();
        const items = data.data || [];

        // Group items by range
        const grouped = items.reduce((acc, item) => {
          const range = item.range;
          if (!acc[range]) {
            acc[range] = [];
          }
          acc[range].push(item);
          return acc;
        }, {});

        // Transform into section format
        const sections = Object.keys(grouped).map(range => {
          const config = rangeConfig[range] || {
            phrase1: "Here's Our",
            title: range,
            phrase2: " Range...",
            slug: "other",
            accentColor: "red",
          };

          return {
            ...config,
            items: grouped[range]
          };
        });

        // Optional: Sort sections based on a predefined order if needed
        const sortOrder = ["Paneer Range", "Fast Food Range", "Chinese Range"];
        sections.sort((a, b) => {
          // Find the original key by looking up which range matches the title/config
          // This is a bit indirect, so we might want to keep the range key in the section object
          // But for now, let's just rely on the order they come or basic sorting.
          // A better way is to iterate over `rangeConfig` keys to create the order.
          return 0;
        });

        // Re-sorting based on rangeConfig keys order
        const orderedSections = sortOrder
          .map(key => sections.find(s => s.title === rangeConfig[key]?.title))
          .filter(Boolean);

        // append any others that weren't in the sortOrder
        const others = sections.filter(s => !orderedSections.includes(s));

        setMenuSections([...orderedSections, ...others]);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);



  return (
    <div className="w-full min-h-screen bg-[#0f0f0f]">

      {/* HERO */}
      <div className="relative w-full h-[280px] md:h-[420px]">
        <Image
          src="/our-food-menu.jpg"
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
                  <span className={accentMap[section.accentColor]?.text || "text-white"}>
                    {section.title}
                  </span>
                  {section.phrase2}
                </h2>

                <div
                  className={`mt-0 lg:mt-4 h-[3px] w-20 md:w-24 rounded-full ${accentMap[section.accentColor]?.underline || "bg-white"}`}
                />
              </div>

              <Link href={`/menu/category/${section.slug}`}>
                <button className="self-start sm:self-auto text-white bg-red-500 py-1 px-6 rounded-full text-2xl lg:text-3xl active:scale-95 transition-transform">
                  View All
                </button>
              </Link>
            </div>

            {/* Horizontal Scroll */}
            <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4">

              {section.items.map((item) => (
                <div
                  key={item._id}
                  className={`
                    relative
                    min-w-[14rem] h-[18rem]
                    sm:min-w-[16rem] sm:h-[20rem]
                    lg:min-w-[18rem] lg:h-[22rem]
                    rounded-2xl overflow-hidden
                    group cursor-pointer shadow-xl
                    border ${accentMap[section.accentColor]?.border || "border-white"}
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
