
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/Hero.jpeg"
        alt="hero"
        fill
        priority
        unoptimized
        className="object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="text-white max-w-full">
          <h1
            className="
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
            <span className="block text-[clamp(2rem,12vw,6rem)] md:text-[6rem] lg:text-[10rem] font-normal leading-none">Where</span>
            <span className="text-[#ff0000] block text-[clamp(2.5rem,15vw,8rem)] md:text-[8rem] lg:text-[14rem] font-normal leading-none my-1">Food</span>
            <span className="block text-[clamp(2rem,12vw,6rem)] md:text-[6rem] lg:text-[10rem] font-normal leading-none">Begins</span>
          </h1>

          {/* Play Button */}
          {/* <Link href="/reels" className="mt-8 inline-flex items-center gap-4 group cursor-pointer active:scale-95 transition-transform">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-cheddar tracking-widest leading-none">Watch</span>
              <span className="text-4xl md:text-5xl font-cheddar text-red-600 tracking-widest leading-none -mt-2">Reels</span>
            </div>
          </Link> */}
        </div>
      </div>

      {/* Optional Dark Overlay for Better Readability */}
      {/* <div className="absolute inset-0 bg-black/30"   // text-[4.5rem]
              // sm:text-[4.5rem]
              // md:text-[6rem]
              // lg:text-[8rem]
              // xl:text-[10rem]
              // 2xl:text-[12rem] /> */}
    </section>
  );
}

export default Hero;
