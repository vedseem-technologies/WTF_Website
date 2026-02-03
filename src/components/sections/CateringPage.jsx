"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCatering } from "../../context/CateringContext";
import { useRouter } from "next/navigation";
import { occasions, services, categories, packages, cateringMenuItems } from "@/data/cateringData";
import CateringSummaryView from "./CateringSummaryView";
import CustomCalendar from "@/components/ui/CustomCalendar";
import CustomTimePicker from "@/components/ui/CustomTimePicker";

function CateringPage() {
  const {
    selectedOccasion,
    setSelectedOccasion,
    selectedService,
    setSelectedService,
    selectedCategory,
    setSelectedCategory,
  } = useCatering();
  
  const [hoveredOccasion, setHoveredOccasion] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // SPA State Management
  const [viewMode, setViewMode] = useState("landing"); // "landing", "booking", "summary"
  const [selectedContext, setSelectedContext] = useState(null); // { type, item, slug }
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    vegGuests: "10",
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  const banners = [
    "/corousel-1.png",
    "/corousel-2.png",
    "/block-1.png",
  ];

  // Auto-rotate banners every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Navbar visibility handling
  useEffect(() => {
    if (viewMode === "summary" || viewMode === "booking") {
      window.dispatchEvent(new CustomEvent("hideBottomNavbar", { detail: true }));
    } else {
      window.dispatchEvent(new CustomEvent("hideBottomNavbar", { detail: false }));
    }
  }, [viewMode]);

  const handleSelection = (item, type) => {
    setSelectedContext({ type, item, slug: item.slug });
    setViewMode("booking");
  };

  const handleBookingComplete = () => {
    if (bookingDetails.date && bookingDetails.time && bookingDetails.vegGuests) {
      sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
      setViewMode("summary");
    }
  };

  // Filter menu items based on selected occasion and category
  const filteredMenuItems = cateringMenuItems.filter((item) => {
    const matchesOccasion = !selectedOccasion || item.occasions.includes(selectedOccasion);
    const matchesCategory = !selectedCategory || item.categories.includes(selectedCategory);
    return matchesOccasion && matchesCategory;
  });

  if (viewMode === "summary") {
    // If we have specific items for this slug, we can pass them, otherwise the view handles it
    return (
      <CateringSummaryView 
        selectedItem={selectedContext.type === 'package' ? selectedContext.item : null}
        slug={selectedContext.slug}
        bookingDetails={bookingDetails}
        onBack={() => setViewMode("landing")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white font-dongle">
      {/* Booking Details Modal */}
      <AnimatePresence>
        {viewMode === "booking" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 font-dongle"
            onClick={() => setViewMode("landing")}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative border-b border-slate-100 px-8 py-6 text-center">
                <button
                  onClick={() => setViewMode("landing")}
                  className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
      
                <h2 className="text-4xl font-extrabold text-slate-900">
                  Booking Details
                </h2>
                <p className="mt-1 text-2xl text-slate-500">
                  Get exact pricing & service availability
                </p>
              </div>
      
              {/* Content */}
              <div className="space-y-6 px-8 py-6">
                {/* Service */}
                <div>
                  <label className="mb-1 block text-2xl font-semibold uppercase tracking-wide text-slate-400">
                    Selected Interest
                  </label>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-3xl text-slate-800">
                    {selectedContext?.item?.name}
                  </div>
                </div>
      
                {/* Date & Time */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="relative">
                    <label className="mb-1 block text-lg font-semibold uppercase tracking-wide text-slate-400">
                      Event Date
                    </label>
                    <button
                      onClick={() => setCalendarOpen(!calendarOpen)}
                      className={`w-full rounded-xl border-2 px-4 py-3 text-left transition flex items-center justify-between outline-none ${
                        !bookingDetails.date && !calendarOpen ? "border-red-200 bg-red-50/30" : "border-slate-200 bg-white"
                      } focus:border-red-500 focus:ring-2 focus:ring-red-100`}
                    >
                      <span className={`text-3xl ${bookingDetails.date ? "text-slate-800 font-bold" : "text-slate-300"}`}>
                        {bookingDetails.date || "DD / MM / YYYY"}
                      </span>
                      <svg className={`h-6 w-6 ${bookingDetails.date ? "text-red-500" : "text-slate-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {calendarOpen && (
                        <div className="absolute top-full left-0 right-0 z-[120] mt-2">
                          <CustomCalendar
                            selectedDate={bookingDetails.date}
                            onSelect={(date) => setBookingDetails({ ...bookingDetails, date })}
                            onClose={() => setCalendarOpen(false)}
                          />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
      
                  <div className="relative">
                    <label className="mb-1 block text-lg font-semibold uppercase tracking-wide text-slate-400">
                      Event Time
                    </label>
                    <button
                      onClick={() => setTimePickerOpen(!timePickerOpen)}
                      className={`w-full rounded-xl border-2 px-4 py-3 text-left transition flex items-center justify-between outline-none ${
                        !bookingDetails.time && !timePickerOpen ? "border-red-200 bg-red-50/30" : "border-slate-200 bg-white"
                      } focus:border-red-500 focus:ring-2 focus:ring-red-100`}
                    >
                      <span className={`text-3xl ${bookingDetails.time ? "text-slate-800 font-bold" : "text-slate-300"}`}>
                        {bookingDetails.time || "e.g. 7:00 PM"}
                      </span>
                      <svg className={`h-6 w-6 ${bookingDetails.time ? "text-red-500" : "text-slate-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {timePickerOpen && (
                        <div className="absolute top-full left-0 right-0 z-[120] mt-2">
                          <CustomTimePicker
                            selectedTime={bookingDetails.time}
                            onSelect={(time) => setBookingDetails({ ...bookingDetails, time })}
                            onClose={() => setTimePickerOpen(false)}
                          />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
      
                {/* Guest Count Input */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Number of Guests (Veg)
                  </label>
                
                  <div className="relative">
                    <div className="flex w-full items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-left transition hover:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-200">
                      <div className="flex-1">
                        <p className="text-2xl font-bold text-emerald-600 mb-1">
                          Selected Guests
                        </p>
                        <input
                          type="number"
                          min="10"
                          value={bookingDetails.vegGuests}
                          onChange={(e) => setBookingDetails({ ...bookingDetails, vegGuests: e.target.value })}
                          className="w-full bg-transparent text-3xl font-black text-emerald-900 outline-none placeholder:text-emerald-900/50"
                          placeholder="Min 10"
                        />
                      </div>
                      <div className="text-emerald-600">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    {parseInt(bookingDetails.vegGuests) < 10 && (
                      <p className="text-red-500 text-lg mt-1 font-bold ml-2">Minimum 10 guests required</p>
                    )}
                  </div>
                </div>
      
                <button
                  onClick={handleBookingComplete}
                  disabled={!bookingDetails.date || !bookingDetails.time || parseInt(bookingDetails.vegGuests) < 10}
                  className={`mt-4 flex w-full items-center justify-center rounded-2xl px-6 py-4 text-3xl font-bold text-white shadow-lg transition active:scale-[0.98] ${
                    bookingDetails.date && bookingDetails.time && parseInt(bookingDetails.vegGuests) >= 10
                      ? "bg-red-600 shadow-red-200 hover:bg-red-700" 
                      : "bg-slate-300 shadow-none cursor-not-allowed"
                  }`}
                >
                  Customize & Check Price
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <section className="relative bg-white pt-24 pb-8 overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-red-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-red-600 text-sm md:text-base mb-3 uppercase tracking-widest font-semibold"
            >
              catering
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl py-2 dongle-regular bg-gradient-to-r from-gray-900 via-red-800 to-gray-900 bg-clip-text text-transparent mb-12"
            >
              Best Catering Services
            </motion.h1>
          </motion.div>
        </div>

        {/* Banner Carousel */}
        <div className="w-full mb-16 overflow-hidden relative z-10 px-4 md:px-6 lg:px-8">
          <div className="relative w-full h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBannerIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(event, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x > swipeThreshold) {
                    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
                  } else if (info.offset.x < -swipeThreshold) {
                    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
                  }
                }}
                className="absolute inset-0"
              >
                <Image
                  src={banners[currentBannerIndex]}
                  alt={`Banner ${currentBannerIndex + 1}`}
                  fill
                  className="object-cover select-none"
                  draggable={false}
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Choose Your Occasion Section */}
      <section className="relative bg-gradient-to-b from-gray-50 via-white to-white md:py-6 py-2 px-2 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-2xl md:text-3xl font-bold text-red-800 mb-10 flex items-center gap-4"
          >
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full"
            ></motion.span>
            <span className="tracking-tight text-3xl md:text-5xl">Choose Your Occasion</span>
          </motion.h2>
          
          <div className="relative">
            <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide md:pb-8 pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
              {occasions.map((occasion) => (
                <motion.button
                  key={occasion.id}
                  onClick={() => handleSelection(occasion, 'occasion')}
                  onMouseEnter={() => setHoveredOccasion(occasion.id)}
                  onMouseLeave={() => setHoveredOccasion(null)}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: occasion.id * 0.08,
                    type: "spring",
                    stiffness: 120
                  }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative flex-shrink-0 w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden transition-all duration-500 snap-center shadow-lg hover:shadow-2xl"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={occasion.image}
                      alt={occasion.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredOccasion === occasion.id ? 0.7 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"
                  />
                  <motion.div
                    initial={{ y: 30, opacity: 0, scale: 0.9 }}
                    animate={{ 
                      y: hoveredOccasion === occasion.id ? 0 : 30,
                      opacity: hoveredOccasion === occasion.id ? 1 : 0,
                      scale: hoveredOccasion === occasion.id ? 1 : 0.9
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 z-10"
                  >
                    <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-5 lg:p-6">
                      <span className="text-white font-semibold text-3xl md:text-4xl lg:text-5xl text-center block tracking-tight uppercase drop-shadow-2xl">
                        {occasion.name}
                      </span>
                    </div>
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Services Section */}
      <section className="relative bg-white md:py-6 py-2 px-2 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-2xl md:text-3xl font-bold text-red-800 mb-10 flex items-center gap-4"
          >
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full"
            ></motion.span>
            <span className="tracking-tight text-3xl md:text-5xl">Choose Your Services</span>
          </motion.h2>
          
          <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide md:pb-8 pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => handleSelection(service, 'service')}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: service.id * 0.08,
                  type: "spring",
                  stiffness: 120
                }}
                whileHover={{ scale: 1.08, y: -8 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex-shrink-0 w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden transition-all duration-500 snap-center shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredService === service.id ? 0.7 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"
                />
                <motion.div
                  initial={{ y: 30, opacity: 0, scale: 0.9 }}
                  animate={{ 
                    y: hoveredService === service.id ? 0 : 30,
                    opacity: hoveredService === service.id ? 1 : 0,
                    scale: hoveredService === service.id ? 1 : 0.9
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 z-10"
                >
                  <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-5 lg:p-6">
                    <span className="text-white font-semibold text-3xl md:text-4xl lg:text-5xl text-center block tracking-tight uppercase drop-shadow-2xl">
                      {service.name}
                    </span>
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* SELECT & CUSTOMIZED Package Section */}
      <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 md:py-6 py-2 px-2 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-center mb-16"
          >
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-red-600 text-sm md:text-base mb-4 uppercase tracking-widest font-semibold"
            >
              SELECT & CUSTOMIZED
            </motion.p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-px bg-gradient-to-r from-transparent via-red-600 to-red-800"
              ></motion.div>
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-red-700 via-red-800 to-red-700 bg-clip-text text-transparent"
              >
                Package
              </motion.h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-px bg-gradient-to-l from-transparent via-red-600 to-red-800"
              ></motion.div>
            </div>
          </motion.div>

          {/* Categories Section */}
          <div className="mb-16">
            <motion.h3 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="text-xl md:text-2xl font-bold text-red-800 mb-10 flex items-center gap-4"
            >
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full"
              ></motion.span>
              <span className="tracking-tight text-4xl md:text-5xl">Categories</span>
            </motion.h3>
            
            <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide md:pb-8 pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleSelection(category, 'category')}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: category.id * 0.1,
                    type: "spring",
                    stiffness: 120
                  }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative flex-shrink-0 w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden transition-all duration-500 snap-center shadow-lg hover:shadow-2xl"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCategory === category.id ? 0.7 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"
                  />
                  <motion.div
                    initial={{ y: 30, opacity: 0, scale: 0.9 }}
                    animate={{ 
                      y: hoveredCategory === category.id ? 0 : 30,
                      opacity: hoveredCategory === category.id ? 1 : 0,
                      scale: hoveredCategory === category.id ? 1 : 0.9
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 z-10"
                  >
                    <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-5 lg:p-6">
                      <span className="text-white font-semibold text-3xl md:text-4xl lg:text-5xl text-center block tracking-tight uppercase drop-shadow-2xl">
                        {category.name}
                      </span>
                    </div>
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Filtered Menu Items Cards Section - now uses handleSelection */}
          {(selectedOccasion || selectedCategory) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <motion.h3 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="text-xl md:text-2xl font-bold text-red-800 mb-8 flex items-center gap-4"
              >
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full"
                ></motion.span>
                <span className="tracking-tight">
                  {selectedOccasion && selectedCategory
                    ? `${occasions.find((o) => o.id === selectedOccasion)?.name} - ${categories.find((c) => c.id === selectedCategory)?.name}`
                    : selectedOccasion
                    ? `${occasions.find((o) => o.id === selectedOccasion)?.name} Packages`
                    : `${categories.find((c) => c.id === selectedCategory)?.name} Packages`}
                </span>
              </motion.h3>

              {/* Responsive Card Grid */}
              {filteredMenuItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 px-4 md:px-6">
                  {filteredMenuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group cursor-pointer"
                      onClick={() => handleSelection(item, 'package')}
                    >
                      {/* Card Container */}
                      <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                        {/* Image Section */}
                        <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            unoptimized
                          />
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-md shadow-lg">
                            <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wide">
                              Premium Options
                            </span>
                          </div>
                          <div
                            className={`absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shadow-lg ${
                              item.type === "veg"
                                ? "bg-green-600"
                                : "bg-red-600"
                            }`}
                          >
                            <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white ${
                              item.type === "veg"
                                ? "bg-green-600"
                                : "bg-red-600"
                            }`}></div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 md:p-5 bg-gray-800">
                          <h4 className="text-white font-bold text-base md:text-lg mb-3 group-hover:text-red-400 transition-colors">
                            {item.name}
                          </h4>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-sm md:text-base font-medium">
                                {item.servingSize}
                              </span>
                            </div>
                            <span className="text-white font-bold text-lg md:text-xl">
                              {item.price}
                            </span>
                          </div>
                          <button className="w-full py-2.5 md:py-3 px-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-lg font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/30">
                            Customize
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 px-4"
                >
                  <div className="text-6xl mb-4">🍽️</div>
                  <p className="text-gray-600 text-xl mb-2 font-semibold">No packages found</p>
                  <p className="text-gray-500 text-sm md:text-base">
                    Try selecting a different occasion or category
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Packages Grid - Marketing Cards */}
          <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-10 pt-6 px-6 md:px-8 snap-x snap-mandatory scroll-smooth">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: pkg.id * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05, y: -12 }}
                className="flex-shrink-0 w-72 md:w-80 lg:w-96 snap-center"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-300/30 transition-all duration-500 relative group">
                  <div className="relative h-56 md:h-64 lg:h-72 bg-gray-200 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full h-full"
                    >
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover blur-sm group-hover:blur-none transition-all duration-500"
                        unoptimized
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: pkg.id * 0.1 + 0.2 }}
                        className="text-center"
                      >
                        <h3 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-2 drop-shadow-2xl tracking-tight">
                          {pkg.stat}
                        </h3>
                        <p className="text-white text-xl md:text-2xl lg:text-3xl font-semibold drop-shadow-lg">
                          {pkg.label}
                        </p>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="absolute inset-0 ring-4 ring-red-500/20 rounded-t-3xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </div>
                  <motion.div 
                    className="bg-gradient-to-r from-red-700 to-red-800 h-16 md:h-20 lg:h-24 flex items-center justify-center relative overflow-hidden group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="text-white font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-wide relative z-10 drop-shadow-lg uppercase">
                      {pkg.name}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CateringPage;
