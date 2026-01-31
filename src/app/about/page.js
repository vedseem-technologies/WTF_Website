"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";

export default function AboutPage() {
  // Timeline data
  const timelineStory = [
    {
      year: "2020",
      title: "Foundation",
      description: "Established with a vision to transform the food delivery industry through technology and exceptional service.",
      metric: "5 Restaurants"
    },
    {
      year: "2021",
      title: "Market Entry",
      description: "Launched our platform and quickly gained traction with both customers and restaurant partners.",
      metric: "50+ Partners"
    },
    {
      year: "2022",
      title: "Expansion Phase",
      description: "Scaled operations to multiple cities, building a robust delivery network and infrastructure.",
      metric: "5 Cities"
    },
    {
      year: "2023",
      title: "Technology Innovation",
      description: "Introduced AI-driven recommendations and real-time tracking systems for enhanced customer experience.",
      metric: "100k Users"
    },
    {
      year: "2024",
      title: "Strategic Growth",
      description: "Expanded service offerings with catering solutions and premium restaurant partnerships.",
      metric: "500+ Restaurants"
    },
    {
      year: "2025",
      title: "International Presence",
      description: "Established operations in international markets while maintaining our commitment to quality.",
      metric: "10 Countries"
    },
    {
      year: "2026",
      title: "Sustainable Future",
      description: "Leading the industry with eco-friendly initiatives and carbon-neutral delivery options.",
      metric: "Net Zero Goal"
    }
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-red-500 selection:text-white relative">
      <Header />
      
      {/* Hero Section - Stats Only */}
      <section className="relative pt-32 pb-16 md:pt-30 md:pb-24 bg-zinc-950 overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full">
          {/* Section Title: Who We Are */}
          <div className="mb-20 flex flex-col items-center text-center">
            <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-10 text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none">
              <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-white"
              >
                Who
              </motion.div>
              <motion.div
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-red-500"
              >
                We
              </motion.div>
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-white"
              >
                Are
              </motion.div>
            </div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="h-1 md:h-3 bg-gradient-to-r from-red-600 to-orange-500 w-32 md:w-64 rounded-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {/* Owner's Message Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20 md:mb-28"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Owner Portrait */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="relative"
                >
                  <div className="relative w-full max-w-md mx-auto lg:mx-0">
                    {/* Main Image */}
                    <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl aspect-[3/4]">
                      <Image 
                        src="/images/owner_portrait.png"
                        alt="Founder & CEO"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    {/* Decorative Glow */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-3xl -z-10" />
                  </div>
                </motion.div>

                {/* Owner's Words */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="space-y-6 text-center lg:text-left"
                >
                  {/* Quote Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600/10 border border-red-500/20">
                    <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.5c0-5.006 4.5-7.5 4.5-7.5s-1.5 1.5-1.5 4.5v3h3v7.5z" />
                      <path d="M6.017 21v-7.5c0-5.006 4.5-7.5 4.5-7.5s-1.5 1.5-1.5 4.5v3h3v7.5z" />
                    </svg>
                  </div>

                  {/* Quote Text */}
                  <blockquote className="space-y-6">
                    <p className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                      "Our mission is simple: to bring joy to every doorstep through exceptional food and service."
                    </p>
                    <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
                      We started WTF with a vision to revolutionize how people experience food delivery. 
                      Every meal we deliver is a promise of quality, speed, and care.
                    </p>
                  </blockquote>

                  {/* Signature */}
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-2xl md:text-3xl font-bold text-white mb-1">Sahil Sethi </p>
                    <p className="text-lg md:text-xl text-red-500 uppercase tracking-wider font-semibold">Founder & CEO</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                { target: 500, suffix: "K+", label: "Orders Delivered", decimals: 0 },
                { target: 1000, suffix: "+", label: "Restaurant Partners", decimals: 0 },
                { target: 10, suffix: "+", label: "Cities Served", decimals: 0 },
                { target: 4.9, suffix: "/5", label: "Customer Rating", decimals: 1 }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-red-500/50 transition-all text-center flex flex-col items-center justify-center min-h-[180px] md:min-h-[220px]">
                    <div className="text-4xl md:text-6xl font-black text-white mb-3">
                      <Counter to={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
                    </div>
                    <p className="text-zinc-400 text-base md:text-lg uppercase tracking-widest font-bold leading-tight">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        {/* About Us Description Section - Redesign */}
        <section className="py-24 md:py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square">
                  <Image 
                    src="/images/about_story.png" 
                    alt="Our Story" 
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700" />
              </motion.div>

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-50 border border-red-100">
                  <span className="text-red-600 text-3xl font-bold uppercase tracking-widest">Our Vision</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-zinc-950 leading-[0.9] tracking-tighter"
                    style={{lineHeight: '0.7'}}
                >
                  Crafting the Best {""}
                  <span className="text-red-600">Culinary Experience</span>
                </h2>
                
                <div className="space-y-6 text-zinc-600 text-2xl md:text-3xl leading-tight font-medium"
                style={{lineHeight: '0.7'}}
                >
                  <p>
                    At WTF, our journey began with a simple yet powerful idea: to connect people through the universal language of incredible food. 
                  </p>
                <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                >
                  <div className="inline-block px-4 py-2 mt-8 rounded-full bg-red-50 border border-red-100 text-red-600 font-bold text-3xl uppercase tracking-wider mb-6">
                    Our Mission
                  </div>
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-zinc-950 mb-6 leading-tight"
                       style={{lineHeight: '0.7'}}
                  >
                    Connecting People Through <span className="text-red-600">Great Food</span>
                  </h2>
                  <div className="space-y-4 text-zinc-600 text-md leading-relaxed"
                       style={{lineHeight: '0.7'}}
                  >
                    <p>
                      At WTF, we believe food is more than sustenance—it's an experience that brings people together. 
                      Our mission is to make exceptional dining accessible to everyone, everywhere.
                    </p>
                  </div>
                </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Statement / Stats Section */}
        <section className="pb-8 md:pb-22 bg-white relative overflow-hidden">
          {/* Subtle Background Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-50/50 rounded-full blur-[120px] -z-10" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: "Delivery Time", value: "<30min", icon: "⚡", color: "from-yellow-400 to-orange-500" },
                { label: "Satisfaction", value: "98%", icon: "😊", color: "from-green-400 to-emerald-600" },
                { label: "Active Users", value: "500K+", icon: "👥", color: "from-blue-400 to-indigo-600" },
                { label: "Daily Orders", value: "50K+", icon: "📦", color: "from-red-400 to-rose-600" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-3xl p-8 border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 h-full flex flex-col items-center text-center">
                    {/* Icon container with gradient background on hover */}
                    <div className="mb-6 w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 relative">
                       <span className="relative z-10">{item.icon}</span>
                       <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight group-hover:text-red-600 transition-colors duration-300">
                        {item.value}
                      </h4>
                      <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
                        {item.label}
                      </p>
                    </div>

                    {/* Decorative Bottom Bar */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-red-600 rounded-full group-hover:w-16 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Timeline */}
        <ProfessionalTimeline timelineStory={timelineStory} />

        {/* Newsletter CTA */}
        <section className="py-24 px-6 md:px-8 bg-zinc-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-zinc-950 rounded-3xl p-12 md:p-16 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
              
              <div className="relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  Stay Updated
                </h2>
                <p className="text-zinc-400 text-md md:text-md max-w-2xl mx-auto mb-8">
                  Subscribe to our newsletter for exclusive offers, new restaurant partnerships, and updates.
                </p>

                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-zinc-500 outline-none focus:border-red-500 focus:bg-white/15 transition-all backdrop-blur-sm"
                    required
                    suppressHydrationWarning
                  />
                  <button
                    type="submit"
                    className="px-8 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
                    suppressHydrationWarning
                  >
                    Subscribe
                  </button>
                </form>

                <p className="text-zinc-500 text-md mt-6">
                  Join 50,000+ subscribers. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </motion.div>
    </main>
  );
}

// Professional Timeline Component with Progressive Fill - Optimized
function ProfessionalTimeline({ timelineStory }) {
  const timelineRef = useRef(null);
  const timelineContainerRef = useRef(null); // Ref for the actual wrapper of line/cards
  const progressLineRef = useRef(null);
  const mobileProgressLineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth 60fps updates
      rafRef.current = requestAnimationFrame(() => {
        if (!timelineContainerRef.current) return;
      
        const container = timelineContainerRef.current;
      
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top + window.scrollY;
        const containerHeight = container.offsetHeight;
      
        // Viewport center (stable & natural trigger point)
        const viewportCenter = window.scrollY + window.innerHeight * 0.5;
      
        // Progress calculation
        const rawProgress =
          ((viewportCenter - containerTop) / containerHeight) * 1.2;
      
        const percentage = Math.max(0, Math.min(1, rawProgress));
      
        const heightInPixels = percentage * containerHeight;
      
        // Update DOM directly (fast)
        if (progressLineRef.current) {
          progressLineRef.current.style.height = `${percentage * 100}%`;
        }
        if (mobileProgressLineRef.current) {
          mobileProgressLineRef.current.style.height = `${percentage * 100}%`;
        }
      
        // Store pixel height for dot sync
        setLineHeight(heightInPixels);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section ref={timelineRef} className="relative pt-8 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 font-bold text-sm uppercase tracking-wider mb-6">
            Our Journey
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-zinc-950">
            The Path to <span className="text-red-600">Excellence</span>
          </h2>
          <p className="text-zinc-600 text-md md:text-3xl max-w-2xl mx-auto">
            Milestones that shaped our journey to becoming a leader in food delivery
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={timelineContainerRef} className="relative">
          {/* Desktop Timeline Lines - Centered (ALWAYS) */}
          <div className="hidden md:block">
            {/* Background line - stays at center */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-200 -translate-x-1/2" />
            
            {/* Progressive filling line - stays at center with GPU acceleration */}
            <div
              ref={progressLineRef}
              className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-red-500 via-red-600 to-red-700 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              style={{ 
                height: '0%',
                willChange: 'height',
                transform: 'translateX(-50%)'
              }}
            />
          </div>

          {/* Mobile Timeline Lines - Left positioned */}
          <div className="md:hidden">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-200" />
            <div
              ref={mobileProgressLineRef}
              className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-red-500 via-red-600 to-red-700"
              style={{ 
                height: '0%',
                willChange: 'height'
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-0">
            {timelineStory.map((item, index) => (
              <TimelineCard
                key={item.year}
                item={item}
                index={index}
                lineHeight={lineHeight}
                totalItems={timelineStory.length}
                containerRef={timelineContainerRef}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Professional Timeline Card - Uses actual position for perfect sync
function TimelineCard({ item, index, lineHeight, totalItems, containerRef }) {
  const dotRef = useRef(null);
  const [isReached, setIsReached] = useState(false);
  
  const isLeft = index % 2 === 0;

  // Check if progress line has reached this dot's actual position
  useEffect(() => {
    if (!dotRef.current || !containerRef.current) return;
    
    // Get positions
    const containerRect = containerRef.current.getBoundingClientRect();
    const dotRect = dotRef.current.getBoundingClientRect();
    
    // Calculate dot position relative to the container start
    // This is the precise pixel distance from the top of the red line
    const dotTopRelative = dotRect.top - containerRect.top;
    const dotCenter = dotTopRelative + (dotRect.height / 2);
    
    // Dot is reached when line height >= dot center position
    // No arbitrary offsets needed because we're measuring inside the same container
    const shouldReveal = lineHeight >= dotCenter;
    
    if (shouldReveal !== isReached) {
      setIsReached(shouldReveal);
    }
    
  }, [lineHeight, containerRef, isReached]); 

  return (
    <div
      className={`relative flex items-center ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row gap-8 md:gap-16 mb-10 md:mb-12`}
    >
      {/* Content Card - Appears when line reaches this position */}
      <div className={`w-full md:w-[calc(50%-4rem)] text-left pl-20 md:pl-0 ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isReached ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0
          }}
          className="group relative bg-white rounded-2xl p-8 md:p-10 border border-zinc-200 hover:border-red-200 hover:shadow-xl transition-all duration-300"
          style={{ willChange: isReached ? 'auto' : 'opacity, transform' }}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative">
            {/* Year and Metric */}
            <div className="flex items-center justify-between mb-6">
              <div className="px-4 py-2 rounded-lg bg-zinc-100 group-hover:bg-red-50 transition-colors">
                <span className="text-2xl font-black text-zinc-900 group-hover:text-red-600 transition-colors">
                  {item.year}
                </span>
              </div>
              <div className="text-right">
                <div className="text-md text-zinc-500 uppercase tracking-wider">Milestone</div>
                <div className="text-xl font-bold text-red-600">{item.metric}</div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-black text-zinc-950 mb-4 leading-tight">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-zinc-600 text-md leading-relaxed"
               style={{lineHeight: '0.9'}}
            >
              {item.description}
            </p>

            {/* Accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={isReached ? { width: "60px" } : { width: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mt-6"
            />
          </div>
        </motion.div>
      </div>

      {/* Timeline Dot - Appears when line reaches it */}
      <div ref={dotRef} className="absolute left-8.5 md:left-1/2 top-12 -translate-x-1/2 z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={isReached ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          {/* Outer ring pulse - only when active */}
          {isReached && (
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-red-500 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            />
          )}
          
          {/* Main dot */}
          <div className="relative w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-600 border-4 border-white shadow-lg" />
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="hidden md:block w-[calc(50%-4rem)]" />
    </div>
  );
}

function Counter({ to, suffix = "", decimals = 0, duration = 1.5 }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!inView) return;

    const node = nodeRef.current;
    
    const controls = animate(0, to, {
      duration,
      onUpdate(value) {
        if (node) {
          node.textContent = value.toFixed(decimals) + suffix;
        }
      }
    });

    return () => controls.stop();
  }, [to, suffix, decimals, duration, inView]);

  return <span ref={nodeRef} />;
}
