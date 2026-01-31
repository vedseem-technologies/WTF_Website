"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { notFound, useRouter } from "next/navigation";
import CustomCalendar from "@/components/ui/CustomCalendar";
import CustomTimePicker from "@/components/ui/CustomTimePicker";

// Menu items data with occasion associations and package details
import { cateringMenuItems, occasions } from "@/data/cateringData";

export default function OccasionPage({ params }) {
  const { slug } = React.use(params);
  const router = useRouter();
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const [bookingDetails, setBookingDetails] = React.useState({
    date: "",
    time: "",
    vegGuests: "10",
  });
  const [guestDropdownOpen, setGuestDropdownOpen] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [timePickerOpen, setTimePickerOpen] = React.useState(false);
  
  // Find the occasion
  const occasion = occasions.find((o) => o.slug === slug);
  
  if (!occasion) {
    notFound();
  }

  // Filter menu items for this occasion
  const filteredItems = cateringMenuItems.filter((item) =>
    item.occasions?.includes(occasion.id)
  );

  // Group items by category for modal
  const groupItemsByCategory = (items) => {
    const grouped = {};
    items?.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };

  React.useEffect(() => {
    if (selectedItem || isBookingModalOpen) {
      window.dispatchEvent(new CustomEvent("hideBottomNavbar", { detail: true }));
    } else {
      window.dispatchEvent(new CustomEvent("hideBottomNavbar", { detail: false }));
    }
  }, [selectedItem, isBookingModalOpen]);

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      {/* Mesh Gradient Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[5%] -left-[5%] w-[60%] h-[60%] rounded-full bg-red-100/70 blur-[120px]" />
        <div className="absolute top-[10%] left-[25%] w-[40%] h-[40%] rounded-full bg-rose-50/60 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-red-50/80 blur-[100px]" />
        <div className="absolute -bottom-[15%] left-[10%] w-[70%] h-[70%] rounded-full bg-red-100/40 blur-[150px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[40%] h-[40%] rounded-full bg-rose-100/30 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Navigation - Top Left */}
        <div className="absolute top-8 left-4 md:left-8">
          <Link
            href="/services/catering"
            className="group flex items-center gap-2 text-gray-400 hover:text-red-600 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-red-50 group-hover:scale-110 transition-all font-bold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-bold text-[10px] md:text-sm tracking-widest uppercase">Back</span>
          </Link>
        </div>

        {/* Header - Centered */}
        <section className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center flex flex-col items-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-1.5 mb-4 rounded-full bg-red-50 border border-red-100"
              >
                <span className="text-red-600 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                  {occasion.name} Catering
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-2 md:mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {occasion.name} <span className="text-red-700">Packages</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100px" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-0.5 md:h-1.5 bg-red-600 rounded-full md:mx-0 mx-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* Menu Items Grid */}
        <section className="pb-24 px-2 md:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-8">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -12 }}
                    className="group"
                  >
                    <div className="relative aspect-[3/5] md:aspect-[4/5] rounded-[0.8rem] md:rounded-[1.2rem] lg:rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:shadow-[0_30px_60px_rgba(220,38,38,0.15)] transition-all duration-500">
                      {/* Background Image */}
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />

                      {/* Top Badges */}
                      <div className="absolute md:top-4 top-2 left-2 md:left-4 z-20">
                        <div className="bg-white/90 backdrop-blur-md md:px-3 px-2 md:py-1.5 py-1 rounded-full shadow-lg border border-white/20">
                          <span className="text-red-600 text-[20px] font-black uppercase tracking-wider">Premium</span>
                        </div>
                      </div>

                      <div className="absolute md:top-4 top-2 right-2 md:right-4 z-20">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg border-2 ${
                          item.type === "veg" ? "bg-green-50/90 border-green-500" : "bg-red-50/90 border-red-500"
                        }`}>
                          <div className={`w-3 h-3 rounded-full ${
                            item.type === "veg" ? "bg-green-600" : "bg-red-600"
                          }`} />
                        </div>
                      </div>

                      {/* Gradient Overlays */}
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                      <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/10 transition-colors duration-500 z-10" />

                      {/* Content Overlay */}
                      <div className="absolute inset-0 z-20 flex flex-col justify-end md:p-6 p-4 pb-8">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex items-center gap-2 mb-1 md:mb-2 text-white/70 text-xs font-bold uppercase tracking-widest">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {item.servingSize} People
                          </div>
                          
                          <h4 className="text-white font-semibold md:font-bold md:text-3xl text-xl mb-1 leading-tight group-hover:text-red-200 transition-colors">
                            {item.name}
                          </h4>
                          
                          <div className="flex items-center justify-between md:mt-4 mt-2">
                            <div className="text-white">
                              <span className="text-sm text-white/60 block uppercase font-bold tracking-tighter">Starting from</span>
                              <span className="md:text-3xl text-xl font-semibold md:font-black">{item.price}</span>
                            </div>
                            
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(item);
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white p-2 md:p-3 rounded-2xl shadow-lg shadow-red-900/40 transition-all duration-300"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-8xl mb-6 opacity-20">🍽️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No packages currently available</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We're currently curating the best {occasion.name} packages for you. Check back soon!
                </p>
                <Link href="/services/catering" className="inline-block mt-8 text-red-600 font-bold border-b-2 border-red-600 pb-1">
                  View other services
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      {/* Enhanced Customize Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-6 font-dongle"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-50">
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-1">{selectedItem.name}</h2>
                  <div className="flex items-center gap-2 md:gap-4 text-gray-500 font-bold text-2xl uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {selectedItem.servingSize} People
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-red-600">Starting from</span>
                      <span className="text-gray-900">{selectedItem.price}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="md:w-12 md:h-12 w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-900 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content - Items Only */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 md:pt-4 scroll-smooth">
                {Object.entries(groupItemsByCategory(selectedItem.items)).map(([category, items], catIdx) => (
                  <div key={category} className="mb-10 last:mb-0">
                    <div className="flex items-center gap-2 md:gap-4 mb-6 bg-white/80 backdrop-blur-sm py-2 z-10">
                      <span className="text-gray-200 text-2xl md:text-3xl font-black">0{catIdx + 1}</span>
                      <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">{category}</h3>
                      <div className="h-px bg-gray-100 flex-1" />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 md:gap-3">
                      {items.map((foodItem, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                          className="flex items-center gap-4 p-3 rounded-2xl bg-[#f8f9fa] hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 group/item"
                        >
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100">
                            <Image src={foodItem.image} alt={foodItem.name} fill className="object-cover group-hover/item:scale-110 transition-transform duration-500" unoptimized />
                          </div>
                          <div className="flex-1">
                            <span className="text-gray-800 font-bold text-3xl block mb-0.5">{foodItem.name}</span>
                            <div className="flex items-center gap-1.5">
                              <div className={`w-1.5 h-1.5 rounded-full ${selectedItem.type === "veg" ? "bg-green-500" : "bg-red-500"}`} />
                              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{selectedItem.type}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 md:p-8 border-t border-gray-100 bg-gray-50/50">
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white md:py-4 py-3 px-5 md:px-10 rounded-[0.7rem] md:rounded-[1.5rem] font-bold text-3xl tracking-tight transition-all duration-300 shadow-xl shadow-red-200 flex items-center justify-center gap-3 group"
                >
                  <span>Customize & Check Price</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Details Modal (Step 2) */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 font-dongle"
            onClick={() => {
              setIsBookingModalOpen(false);
              setSelectedItem(null);
            }}
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
                  onClick={() => setIsBookingModalOpen(false)}
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
                    Selected Service
                  </label>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-3xl text-slate-800">
                    {occasion.name}
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
                        !bookingDetails.date && !calendarOpen ? "border-red-200 bg-red-50/30" : "border-slate-200 bg-white"
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
      
                {/* Guest Count */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Number of Guests (Veg)
                  </label>
                
                  <div className="relative">
                    {/* Selected Value */}
                    <button
                      onClick={() => setGuestDropdownOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-left transition hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                      <div>
                        <p className="text-2xl font-bold text-emerald-600">
                          Selected Guests
                        </p>
                        <p className="text-3xl font-black text-emerald-900">
                          {bookingDetails.vegGuests} People
                        </p>
                      </div>
                
                      <motion.span
                        animate={{ rotate: guestDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-emerald-600"
                      >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.span>
                    </button>
                
                    {/* Dropdown */}
                    <AnimatePresence>
                      {guestDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="absolute z-20 mt-3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                        >
                          <div className="max-h-48 md:max-h-56 overflow-y-auto py-2">
                            {[10, 20, 30, 40, 50, 75, 100].map((num) => (
                              <button
                                key={num}
                                onClick={() => {
                                  setBookingDetails({ ...bookingDetails, vegGuests: num });
                                  setGuestDropdownOpen(false);
                                }}
                                className={`flex w-full items-center justify-between px-6 py-3 text-left text-2xl transition
                                  ${
                                    bookingDetails.vegGuests === num
                                      ? "bg-emerald-50 text-emerald-700 font-bold"
                                      : "text-slate-700 hover:bg-slate-50"
                                  }
                                `}
                              >
                                <span>{num} Guests</span>
                
                                {bookingDetails.vegGuests === num && (
                                  <svg
                                    className="h-5 w-5 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
      
                {/* CTA */}
                <button
                  onClick={() => {
                    if (bookingDetails.date && bookingDetails.time) {
                      // Store booking details in sessionStorage
                      sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
                      // Navigate to package-specific URL
                      router.push(`/services/catering/occasions/${slug}/${selectedItem.slug}`);
                    }
                  }}
                  disabled={!bookingDetails.date || !bookingDetails.time}
                  className={`mt-4 flex w-full items-center justify-center rounded-2xl px-6 py-4 text-3xl font-bold text-white shadow-lg transition active:scale-[0.98] ${
                    bookingDetails.date && bookingDetails.time 
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

    </div>
  );
}
