
"use client";
import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/Hero.png"
        alt="hero"
        fill
        priority
        unoptimized
        className="object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center px-8 sm:px-8 md:px-16 lg:px-24">
        <div className="text-white max-w-full">
          <h1
            className="
              text-[4.5rem]
              sm:text-[4.5rem]
              md:text-[6rem]
              lg:text-[8rem]
              xl:text-[10rem]
              2xl:text-[12rem]
              leading-[0.95]
              tracking-tight
              break-words
            "
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            <span className="italic font-normal block">Where</span>
            <span className="italic font-bold text-red-500 block">Food</span>
            <span className="italic font-normal block">Begins</span>
          </h1>
        </div>
      </div>

      {/* Optional Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
}

export default Hero;
