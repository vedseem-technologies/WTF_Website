
"use client";
import React from "react";
import Image from "next/image";

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
            <span className="block text-[6rem] md:text-[6rem] lg:text-[10rem] font-normal">Where</span>
            <span className="text-[#ff0000] block text-[6rem] md:text-[6rem] lg:text-[14rem] font-normal">Food</span>
            <span className="block text-[6rem] md:text-[6rem] lg:text-[10rem] font-normal">Begins</span>
          </h1>
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
