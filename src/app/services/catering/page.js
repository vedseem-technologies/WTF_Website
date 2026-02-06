"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCatering } from "../../../context/CateringContext";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Header from "../../../components/sections/Header";
import Footer from "@/components/sections/Footer";
import { cateringMenuItems, packages } from "@/data/cateringData";
import CateringSummaryView from "../../../components/sections/CateringSummaryView";
import CustomCalendar from "@/components/ui/CustomCalendar";
import CustomTimePicker from "@/components/ui/CustomTimePicker";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function CateringContent() {
  const {
    selectedOccasion,
    setSelectedOccasion,
    selectedService,
    setSelectedService,
    selectedCategory,
    setSelectedCategory,
    selectedCity,
    setSelectedCity,
  } = useCatering();

  const [showCityModal, setShowCityModal] = useState(false);

  // State for dynamic data from backend
  const [occasions, setOccasions] = useState([]);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch occasions, services, and categories from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [occasionsRes, servicesRes, categoriesRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/occasions`),
          fetch(`${BACKEND_URL}/api/services`),
          fetch(`${BACKEND_URL}/api/categories`)
        ]);

        const occasionsResult = await occasionsRes.json();
        const servicesResult = await servicesRes.json();
        const categoriesResult = await categoriesRes.json();

        const occasionsData = occasionsResult.data || [];
        const servicesData = servicesResult.data || [];
        const categoriesData = categoriesResult.data || [];

        // Map backend data to frontend format (add slug from title)
        setOccasions(occasionsData.map((item) => ({
          ...item,
          id: item._id,
          slug: item.title.toLowerCase().replace(/\s+/g, '-'),
          name: item.title,
          image: item.image
        })));

        setServices(servicesData.map((item) => ({
          ...item,
          id: item._id,
          slug: item.title.toLowerCase().replace(/\s+/g, '-'),
          name: item.title,
          image: item.image
        })));

        setCategories(categoriesData.map((item) => ({
          ...item,
          id: item._id,
          slug: item.title.toLowerCase().replace(/\s+/g, '-'),
          name: item.title,
          image: item.image
        })));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching catering data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Small timeout to allow context/localStorage to sync
    const checkCity = () => {
      const savedCity = localStorage.getItem("catering_selected_city");
      if (!savedCity && !selectedCity) {
        setShowCityModal(true);
      } else {
        setShowCityModal(false);
      }
    };

    checkCity();
  }, [selectedCity]);

  const [hoveredOccasion, setHoveredOccasion] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();



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
    "/c1.jpg.jpeg",
    "/c2.jpg.jpeg",
    "/c3.jpg.jpeg",
    "/c4.jpg.jpeg",
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

  // 1. URL-Based State Synchronization (The Source of Truth)
  useEffect(() => {
    if (loading || occasions.length === 0) return; // Wait for data to load

    const occasionSlug = searchParams.get("occasion");
    const serviceSlug = searchParams.get("service");
    const categorySlug = searchParams.get("category");

    const mappedOccasion = occasions.find(o => o.slug === occasionSlug);
    const mappedService = services.find(s => s.slug === serviceSlug);
    const mappedCategory = categories.find(c => c.slug === categorySlug);

    // Update IDs
    if (mappedOccasion) setSelectedOccasion(mappedOccasion.id);
    else setSelectedOccasion(null);

    if (mappedService) setSelectedService(mappedService.id);
    else setSelectedService(null);

    if (mappedCategory) setSelectedCategory(mappedCategory.id);
    else setSelectedCategory(null);

    // 2. Logic to Open Modal (Booking Mode) based on URL presence
    if (mappedOccasion || mappedService || mappedCategory) {

      // Determine Default Package
      const targetIdOccasion = mappedOccasion?.id;
      const targetIdService = mappedService?.id;
      const targetIdCategory = mappedCategory?.id;

      const defaultPackage = cateringMenuItems.find(menuItem => {
        const matchesOccasion = !targetIdOccasion || menuItem.occasions.includes(targetIdOccasion);
        const matchesCategory = !targetIdCategory || menuItem.categories.includes(targetIdCategory);
        const matchesService = !targetIdService || menuItem.services.includes(targetIdService);
        return matchesOccasion && matchesCategory && matchesService;
      }) || cateringMenuItems[0];

      setSelectedContext({
        type: 'package',
        item: defaultPackage,
        slug: defaultPackage.slug,
        trigger: {
          type: mappedOccasion ? 'occasion' : mappedCategory ? 'category' : 'service',
          item: mappedOccasion || mappedCategory || mappedService
        }
      });

      // Only switch to booking if we aren't already there or in summary
      if (viewMode === 'landing') {
        setViewMode("booking");
      }
    } else {
      // No filters -> Landing page
      if (viewMode === 'booking') {
        setViewMode("landing");
        setSelectedContext(null);
      }
    }

  }, [searchParams, viewMode, loading, occasions, services, categories]);

  const handleSelection = (item, type) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === 'occasion') {
      params.delete("service");
      params.delete("category");
      params.set("occasion", item.slug);
    } else if (type === 'service') {
      params.delete("occasion");
      params.delete("category");
      params.set("service", item.slug);
    } else if (type === 'category') {
      params.delete("occasion");
      params.delete("service");
      params.set("category", item.slug);
    }

    params.delete("package");
    params.delete("subcategory");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
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
    // Determine which entity to pass: occasion, service, or category
    const entityItem = selectedContext?.trigger?.item ? {
      ...selectedContext.trigger.item,
      entityType: selectedContext.trigger.type // Add entityType: 'occasion', 'service', or 'category'
    } : null;

    return (
      <CateringSummaryView
        selectedItem={entityItem}
        slug={selectedContext.slug}
        bookingDetails={bookingDetails}
        onBack={() => setViewMode("landing")}
      />
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white font-dongle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-3xl text-gray-600">Loading Catering Options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white font-dongle">

      <AnimatePresence>
        {showCityModal && (
          <CitySelectionModal
            onSelect={(city) => {
              setSelectedCity(city);
              setShowCityModal(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {viewMode === "booking" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 font-dongle"
            onClick={() => {
              // Close modal = Go back to landing, meaning clear params
              router.push(pathname);
              setViewMode("landing");
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
                  onClick={() => {
                    router.push(pathname);
                    setViewMode("landing");
                  }}
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
                    {selectedContext?.trigger?.item?.name || selectedContext?.item?.name}
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
                      className={`w-full rounded-xl border-2 px-4 py-3 text-left transition flex items-center justify-between outline-none ${!bookingDetails.date && !calendarOpen ? "border-red-200 bg-red-50/30" : "border-slate-200 bg-white"
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
                      className={`w-full rounded-xl border-2 px-4 py-3 text-left transition flex items-center justify-between outline-none ${!bookingDetails.time && !timePickerOpen ? "border-red-200 bg-red-50/30" : "border-slate-200 bg-white"
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
                  <label className="mb-2 block text-xl font-bold uppercase tracking-wide text-slate-600">
                    Number of Guests (Veg)
                  </label>

                  <div className="relative">
                    <div className="flex w-full items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-left transition hover:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-200">
                      <div className="flex-1">
                        <input
                          type="number"
                          min="10"
                          value={bookingDetails.vegGuests}
                          onChange={(e) => setBookingDetails({ ...bookingDetails, vegGuests: e.target.value })}
                          className="w-full bg-transparent text-4xl font-black text-emerald-900 outline-none placeholder:text-emerald-900/50"
                          placeholder="10"
                        />
                      </div>
                      <div className="text-emerald-600">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className={`mt-4 flex w-full items-center justify-center rounded-2xl px-6 py-4 text-3xl font-bold text-white shadow-lg transition active:scale-[0.98] ${bookingDetails.date && bookingDetails.time && parseInt(bookingDetails.vegGuests) >= 10
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

      <Header />

      {/* Header Section */}
      <section className="relative bg-white pt-20 md:pt-24 pb-8 overflow-hidden">
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
              className="text-red-600 text-md md:text-xl md:my-3 my-2 uppercase tracking-widest font-semibold"
            >
              catering
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-gray-900 bg-clip-text text-transparent mb-12"
            >
              Best Catering Services
            </motion.h1>
          </motion.div>
        </div>

        {/* Banner Carousel - Minimal UI with Auto-Rotate & Swipe Gestures */}
        <div className="w-full pb-4 md:mb-16 overflow-hidden relative z-10 px-4 md:px-6 lg:px-8">
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
                    // Swipe right - go to previous banner
                    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
                  } else if (info.offset.x < -swipeThreshold) {
                    // Swipe left - go to next banner
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
      <section className="relative bg-gradient-to-b from-gray-50 via-white to-white py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-3xl md:text-5xl font-bold text-red-800 mb-4 md:mb-10 flex items-center gap-4"
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:h-1 h-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-full"
            ></motion.span>
            <span className="tracking-tight text-3xl md:text-5xl">Choose Your Occasion</span>
          </motion.h2>

          {/* Scrollable Occasions Row */}
          <div className="relative">
            <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide md:pb-8 md:pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
              {occasions.map((occasion) => (
                <div key={occasion.id} className="flex flex-col items-center gap-4 flex-shrink-0 snap-center">
                  <motion.button
                    onClick={() => handleSelection(occasion, 'occasion')}
                    onMouseEnter={() => setHoveredOccasion(occasion.id)}
                    onMouseLeave={() => setHoveredOccasion(null)}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: occasions.indexOf(occasion) * 0.08,
                      type: "spring",
                      stiffness: 120
                    }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden transition-all duration-500 shadow-lg group ${selectedOccasion === occasion.id
                      ? "shadow-2xl shadow-red-300/40 ring-4 ring-red-500"
                      : "hover:shadow-2xl"
                      }`}
                  >
                    {/* Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={occasion.image}
                        alt={occasion.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                    </div>

                    {/* Deep red premium gradient overlay - appears on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredOccasion === occasion.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-red-700/90 via-red-600/40 to-transparent flex items-end justify-center pb-8 cursor-pointer"
                    >
                      <motion.span
                        initial={{ y: 10, opacity: 0 }}
                        animate={{
                          y: hoveredOccasion === occasion.id ? 0 : 0,
                          opacity: hoveredOccasion === occasion.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-white text-2xl md:text-3xl drop-shadow-lg"
                      >
                        View Packages
                      </motion.span>
                    </motion.div>
                  </motion.button>

                  {/* Label below */}
                  <span className="text-gray-900 font-semibold text-2xl md:text-4xl tracking-tight">
                    {occasion.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Services Section */}
      <section className="relative bg-white md:py-6 py-4 px-2 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-3xl md:text-5xl font-bold text-red-800 mb-4 md:mb-10 flex items-center gap-4"
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:h-1 h-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-full"
            ></motion.span>
            <span className="tracking-tight">Choose Your Services</span>
          </motion.h2>

          {/* Scrollable Services Row */}
          <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide md:pb-8 md:pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col items-center gap-4 flex-shrink-0 snap-center">
                <motion.button
                  onClick={() => handleSelection(service, 'service')}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: services.indexOf(service) * 0.08,
                    type: "spring",
                    stiffness: 120
                  }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden transition-all duration-500 shadow-lg group ${selectedService === service.id
                    ? "shadow-2xl shadow-red-300/40 ring-4 ring-red-500"
                    : "hover:shadow-2xl"
                    }`}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                  </div>

                  {/* Deep red premium gradient overlay - appears on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredService === service.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-red-700/90 via-red-600/40 to-transparent flex items-end justify-center pb-8 cursor-pointer"
                  >
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: hoveredService === service.id ? 0 : 0,
                        opacity: hoveredService === service.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-white text-2xl md:text-3xl drop-shadow-lg"
                    >
                      View Packages
                    </motion.span>
                  </motion.div>
                </motion.button>

                {/* Label below */}
                <span className="text-gray-900 font-semibold text-2xl md:text-4xl tracking-tight">
                  {service.name}
                </span>
              </div>
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
            className="text-center mb-8 md:mb-16"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-red-600 text-sm md:text-xl md:mb-4 uppercase tracking-widest font-semibold"
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
                className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-700 via-red-800 to-red-700 bg-clip-text text-transparent"
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
              className="text-2xl md:text-4xl font-bold text-red-800 mb-4 md:mb-10 flex items-center gap-4"
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:h-1 h-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-full"
              ></motion.span>
              <span className="tracking-tight">Categories</span>
            </motion.h3>

            {/* Scrollable Categories Row */}
            <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide md:pb-8 md:pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
              {categories.map((category) => (
                <div key={category.id} className="flex flex-col items-center gap-4 flex-shrink-0 snap-center">
                  <motion.button
                    onClick={() => handleSelection(category, 'category')}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: categories.indexOf(category) * 0.1,
                      type: "spring",
                      stiffness: 120
                    }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden transition-all duration-500 shadow-lg group ${selectedCategory === category.id
                      ? "shadow-2xl shadow-red-300/40 ring-4 ring-red-500"
                      : "hover:shadow-2xl"
                      }`}
                  >
                    {/* Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                    </div>

                    {/* Deep red premium gradient overlay - appears on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCategory === category.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-red-700/90 via-red-600/40 to-transparent flex items-end justify-center pb-8 cursor-pointer"
                    >
                      <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: hoveredCategory === category.id ? 0 : 0,
                          opacity: hoveredCategory === category.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-white text-2xl md:text-3xl drop-shadow-lg"
                      >
                        View Packages
                      </motion.span>
                    </motion.div>
                  </motion.button>

                  {/* Label below */}
                  <span className="text-gray-900 font-semibold text-2xl md:text-4xl tracking-tight">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}

const CateringLoading = () => (
  <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white font-dongle flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
      <p className="text-3xl text-gray-600">Loading Catering Options...</p>
    </div>
  </div>
);

function CateringPage() {
  return (
    <Suspense fallback={<CateringLoading />}>
      <CateringContent />
    </Suspense>
  );
}

function CitySelectionModal({ onSelect }) {
  useEffect(() => {
    // Disable background scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable background scroll
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const cities = [
    { name: "Mumbai", icon: "🏙️", description: "The City of Dreams" },
    { name: "Delhi", icon: "🏛️", description: "Heart of the Nation" },
    { name: "Bangalore", icon: "🌱", description: "Silicon Valley of India" },
    { name: "Hyderabad", icon: "🏰", description: "City of Pearls" },
    { name: "Ahmedabad", icon: "🏗️", description: "Manchester of the East" },
    { name: "Chennai", icon: "🌊", description: "Gateway to the South" },
    { name: "Kolkata", icon: "🌉", description: "City of Joy" },
    { name: "Pune", icon: "⛰️", description: "Oxford of the East" },
    { name: "Jaipur", icon: "🕌", description: "The Pink City" },
    { name: "Lucknow", icon: "🏰", description: "City of Nawabs" },
    { name: "Chandigarh", icon: "🌳", description: "The City Beautiful" },
    { name: "Gurgaon", icon: "🏢", description: "Millennium City" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
    >
      {/* Dynamic Background Overlay */}
      <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-md" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 flex flex-col h-[60vh] md:h-auto md:max-h-[85vh]"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <div className="w-32 h-32 bg-red-600 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-10 pointer-events-none">
          <div className="w-32 h-32 bg-red-400 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Modal Header - Sticky */}
        <div className="relative z-20 pt-8 pb-4 px-6 md:px-12 text-center bg-white/80 backdrop-blur-md border-b border-gray-100">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] md:text-sm font-black uppercase tracking-[0.2em] mb-3"
          >
            Location Required
          </motion.div>

          <motion.h2
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-7xl font-black text-gray-900 leading-tight"
          >
            Select Your City
          </motion.h2>

          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-lg md:text-3xl max-w-md mx-auto leading-none mt-1"
          >
            We customize our services based on your location.
          </motion.p>
        </div>



        {/* Modal Body - Scrollable */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6 md:px-12 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
            {cities.map((city, index) => (
              <motion.button
                key={city.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.03 }}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(city.name)}
                className="group relative flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl md:rounded-3xl bg-gray-50 border border-gray-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-red-500/10 hover:border-red-200"
              >
                <div className="text-3xl md:text-5xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
                  {city.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-800 leading-tight transition-colors group-hover:text-red-600">
                  {city.name}
                </h3>

                <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-red-600 opacity-0 group-active:opacity-5 transition-opacity" />
              </motion.button>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 mb-4 text-center text-gray-400 text-lg font-bold">
            Can&apos;t find your city?
            <button className="ml-2 text-red-500 hover:text-red-700 transition-colors border-b-2 border-red-500/20 hover:border-red-500">
              Get in touch
            </button>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fee2e2;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #fecaca;
        }
      `}</style>
    </motion.div>
  );
}

export default CateringPage;
