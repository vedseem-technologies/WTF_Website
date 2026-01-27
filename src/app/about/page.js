"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
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
    <main className="min-h-screen bg-white selection:bg-red-500 selection:text-white">
      <Header />
      
      {/* Hero Section - Stats Only */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-zinc-950 overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          {/* Owner's Message Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
        </div>
      </section>

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
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-red-600 text-lg font-bold uppercase tracking-widest">Our Vision</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-zinc-950 leading-[0.9] tracking-tighter"
                  style={{lineHeight: '0.8'}}
              >
                Crafting the Best <br />
                <span className="text-red-600">Culinary Experience</span>
              </h2>
              
              <div className="space-y-6 text-zinc-600 text-2xl md:text-3xl leading-tight font-medium"
              style={{lineHeight: '0.8'}}
              >
                <p>
                  At WTF, our journey began with a simple yet powerful idea: to connect people through the universal language of incredible food. 
                </p>
                <p>
                  We don't just deliver meals; we deliver moments of joy, curated from the finest kitchens in the city. Our relentless pursuit of excellence drives us to innovate every single day.
                </p>
                <p>
                  From the sizzle of the pan to the smile at your doorstep, every detail is engineered to provide you with the most premium dining experience imaginable.
                </p>
              </div>

              <div className="pt-6">
                <Link 
                  href="/menu"
                  className="inline-flex items-center gap-4 px-10 py-5 bg-zinc-950 text-white font-bold text-2xl rounded-2xl hover:bg-red-600 transition-all duration-300 shadow-xl hover:shadow-red-500/20 group"
                >
                  Explore Our Menu
                  <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Timeline */}
      <ProfessionalTimeline timelineStory={timelineStory} />

      {/* Core Values Section */}
      <section className="py-24 md:py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-zinc-950 mb-4">
              Our Core <span className="text-red-600">Values</span>
            </h2>
            <p className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Excellence",
                desc: "Uncompromising quality in every order",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Innovation",
                desc: "Leveraging technology for better experiences",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: "Reliability",
                desc: "Consistent service you can count on",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Sustainability",
                desc: "Committed to environmental responsibility",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-zinc-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-100 transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-black text-zinc-950 mb-3">{value.title}</h3>
                  <p className="text-zinc-600 text-md leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 font-bold text-sm uppercase tracking-wider mb-6">
                Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-950 mb-6 leading-tight"
                   style={{lineHeight: '0.8'}}
              >
                Connecting People Through <span className="text-red-600">Great Food</span>
              </h2>
              <div className="space-y-4 text-zinc-600 text-md leading-relaxed"
                   style={{lineHeight: '0.8'}}
              >
                <p>
                  At WTF, we believe food is more than sustenance—it's an experience that brings people together. 
                  Our mission is to make exceptional dining accessible to everyone, everywhere.
                </p>
                <p>
                  By partnering with the best restaurants and leveraging cutting-edge technology, we ensure 
                  every order meets the highest standards of quality, speed, and service.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link 
                  href="/menu"
                  className="px-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
                >
                  Explore Menu
                </Link>
                <Link 
                  href="/contact"
                  className="px-8 py-4 border-2 border-zinc-200 text-zinc-900 font-bold rounded-xl hover:border-zinc-300 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-zinc-100 to-zinc-50 rounded-3xl p-12 border border-zinc-200">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: "Delivery Time", value: "<30min", icon: "⚡" },
                    { label: "Satisfaction", value: "98%", icon: "😊" },
                    { label: "Active Users", value: "500K+", icon: "👥" },
                    { label: "Daily Orders", value: "50K+", icon: "📦" }
                  ].map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-4xl mb-2">{item.icon}</div>
                      <div className="text-3xl font-black text-zinc-950 mb-1">{item.value}</div>
                      <div className="text-md text-zinc-600">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

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
                />
                <button
                  type="submit"
                  className="px-8 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
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
          (viewportCenter - containerTop) / containerHeight;
      
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
    <section ref={timelineRef} className="relative pt-16 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
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
      } flex-row gap-8 md:gap-16 mb-32 md:mb-40`}
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

