"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "../../components/sections/Header";

export default function AboutPage() {
  const steps = [
    {
      title: "Choose Your Cravings",
      description: "Browse through our extensive menu of cuisines, from spicy Biriyanis to cheesy Pizzas.",
      icon: "🍕"
    },
    {
      title: "Chef's Craft",
      description: "Our expert chefs prepare your meal with the finest ingredients and secret recipes.",
      icon: "👨‍🍳"
    },
    {
      title: "Express Delivery",
      description: "Witness the speed as we bring your hot meal right to your doorstep in minutes.",
      icon: "🚚"
    }
  ];

  const categories = [
    { name: "Indian", count: "150+ Items", img: "/block-1.png" },
    { name: "Continental", count: "80+ Items", img: "/block-3.png" },
    { name: "Chinese", count: "120+ Items", img: "/block-1.png" },
    { name: "Desserts", count: "50+ Items", img: "/block-3.png" },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] overflow-hidden selection:bg-red-500 selection:text-white font-sans">
      <Header />  
      {/* Dynamic Food Hero */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-40 bg-zinc-950 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div 
             animate={{ 
               scale: [1, 1.1, 1],
               rotate: [0, 5, 0]
             }}
             transition={{ duration: 20, repeat: Infinity }}
             className="absolute -top-[10%] -right-[5%] w-[60%] h-[80%] bg-red-600/20 blur-[150px] rounded-full" 
          />
          <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               rotate: [0, -5, 0]
             }}
             transition={{ duration: 15, repeat: Infinity }}
             className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[70%] bg-orange-600/10 blur-[120px] rounded-full" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 font-black text-[10px] md:text-sm uppercase tracking-[0.3em] mb-8">
              The Evolution of Taste
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter mb-8 uppercase italic">
              FEAST. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">EXPERIENCE.</span> <br />
              REPEAT.
            </h1>
            <p className="text-zinc-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
              WTF1 isn't just a platform; it's a culinary journey designed for the modern foodie. We bridge the gap between hungry hearts and incredible flavors.
            </p>
          </motion.div>

          {/* Floating Food Elements (Visual Flair) */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block absolute -left-20 top-1/2 w-48 h-48 opacity-20"
          >
            <Image src="/block-1.png" alt="food" width={200} height={200} className="rounded-full rotate-12" unoptimized />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block absolute -right-20 bottom-0 w-64 h-64 opacity-20"
          >
            <Image src="/block-3.png" alt="food" width={200} height={200} className="rounded-full -rotate-12" unoptimized />
          </motion.div>
        </div>
      </section>

      {/* How it Works / The Platform */}
      <section className="py-24 md:py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black text-zinc-950 uppercase italic tracking-tighter leading-tight">
                Seamless <span className="text-red-600 underline decoration-red-200 underline-offset-8">Experience</span> From App To Table
              </h2>
            </div>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs hidden md:block">Scroll to explore</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                {...fadeIn}
                transition={{ delay: index * 0.2 }}
                className="group relative p-10 rounded-[3rem] bg-white border border-zinc-100 hover:border-red-100 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-red-500/5 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="text-5xl mb-8 group-hover:scale-125 transition-transform duration-500 inline-block">{step.icon}</div>
                  <h3 className="text-xl md:text-2xl font-black text-zinc-950 mb-4 uppercase italic tracking-tight">{step.title}</h3>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Decorative Number */}
                <span className="absolute -bottom-8 -right-4 text-9xl font-black text-zinc-50 opacity-[0.03] italic">{index + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Variety / Categories Section */}
      <section className="py-24 bg-zinc-950 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-4">Unmatched <span className="text-red-500">Variety</span></h2>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Whatever you desire, we have it served.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                {...fadeIn}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer"
              >
                <Image 
                  src={cat.img} 
                  alt={cat.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <span className="text-white text-3xl font-black italic uppercase tracking-tighter mb-1">{cat.name}</span>
                  <span className="text-red-500 font-bold text-xs uppercase tracking-widest">{cat.count}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section with Statistics */}
      <section className="py-24 md:py-40 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn} className="relative">
              {/* Overlapping Images Design */}
              <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0">
                <div className="absolute top-0 left-0 w-[80%] h-[80%] rounded-[3rem] overflow-hidden shadow-2xl z-20 hover:scale-105 transition-transform duration-500">
                  <Image src="/block-1.png" alt="chef" fill className="object-cover" unoptimized />
                </div>
                <div className="absolute bottom-0 right-0 w-[70%] h-[70%] rounded-[3rem] overflow-hidden shadow-2xl z-10 border-[12px] border-white">
                  <Image src="/block-3.png" alt="food plate" fill className="object-cover" unoptimized />
                </div>
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/5 blur-[100px] rounded-full" />
            </motion.div>

            <motion.div {...fadeIn} className="lg:pl-10">
              <span className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Our Mission</span>
              <h2 className="text-4xl md:text-6xl font-black text-zinc-950 mb-8 leading-none italic tracking-tighter uppercase">
                Redefining the <br />
                <span className="text-red-600">Digital Kitchen.</span>
              </h2>
              <p className="text-zinc-600 text-lg mb-12 leading-relaxed">
                At WTF1, we believe that food is the universal language of love. Our platform is built to amplify this love by connecting top-tier culinary artists with passionate foodies. Every order placed is a promise of quality, hygiene, and unparalleled taste.
              </p>
              
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="text-4xl font-black text-zinc-950 italic mb-1">500k+</p>
                  <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Meals Delivered</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-zinc-950 italic mb-1">4.9/5</p>
                  <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">User Rating</p>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                 <Link href="/menu" className="px-8 py-4 bg-zinc-950 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-zinc-800 transition-all">Browse Menu</Link>
                 <Link href="/contact" className="px-8 py-4 border border-zinc-200 text-zinc-950 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-zinc-50 transition-all">Support</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Newsletter / Join Us */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto rounded-[4rem] bg-zinc-950 p-12 md:p-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10">
             <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-8 leading-none">
               Don't Just Eat. <br />
               <span className="text-red-600">Explore.</span>
             </h2>
             <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-12">Join our elite circle of foodies and get exclusive access to new recipes, deals, and catering packages.</p>
             <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onClick={(e) => e.preventDefault()}>
               <input 
                 type="email" 
                 placeholder="your@email.com" 
                 className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-red-600 transition-all"
               />
               <button className="px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-900/40">Subscribe</button>
             </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
