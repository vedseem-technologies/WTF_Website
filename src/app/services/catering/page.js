"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCatering } from "../../../context/CateringContext";
import { useRouter } from "next/navigation";
import Header from "../../../components/sections/Header";
import Footer from "@/components/sections/Footer";


function CateringPage() {
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
  
  useEffect(() => {
    // Show modal if no city is selected
    if (!selectedCity) {
      setShowCityModal(true);
    } else {
      setShowCityModal(false);
    }
  }, [selectedCity]);

  const [hoveredOccasion, setHoveredOccasion] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const router = useRouter();

  const occasions = [
    { id: 1, name: "Birthday", slug: "birthday", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop" },
    { id: 2, name: "Wedding", slug: "wedding", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop" },
    { id: 3, name: "Corporate", slug: "corporate", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop" },
    { id: 4, name: "Anniversary", slug: "anniversary", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop" },
    { id: 5, name: "Graduation", slug: "graduation", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop" },
    { id: 6, name: "Festival", slug: "festival", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop" },
    { id: 7, name: "Other", slug: "other", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop" },
  ];

  const services = [
    { id: 1, name: "Full Service", slug: "full-service", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop" },
    { id: 2, name: "Buffet", slug: "buffet", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop" },
    { id: 3, name: "Plated", slug: "plated", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop" },
    { id: 4, name: "Cocktail Menu", slug: "cocktail-menu", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=400&fit=crop" },
    { id: 5, name: "BBQ", slug: "bbq", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=400&fit=crop" },
    { id: 6, name: "Dessert", slug: "dessert", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop" },
    { id: 7, name: "Beverages", slug: "beverages", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop" },
  ];

  const categories = [
    { id: 1, name: "Delivery only", slug: "delivery-only", image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=400&fit=crop" },
    { id: 2, name: "Delivery + Services", slug: "delivery-services", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop" },
    { id: 3, name: "Live Service", slug: "live-service", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop" },
    { id: 4, name: "Snack Box", slug: "snack-box", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop" },
    { id: 5, name: "Meal Box", slug: "meal-box", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop" },
  ];

  const packages = [
    { id: 1, name: "Multiplex", image: "/block-1.png", stat: "12+", label: "Years Of Excellence" },
    { id: 2, name: "Premium", image: "/block-2.png", stat: "100+", label: "Menu Options" },
    { id: 3, name: "Standard", image: "/block-3.png", stat: "200+", label: "Staff" },
    { id: 4, name: "Basic", image: "/block-4.png", stat: "10K+", label: "Happy Foodies" },
  ];

  // Catering menu items with occasion and category associations
  const cateringMenuItems = [
    {
      id: 1,
      name: "Cocktail Menu",
      slug: "cocktail-menu",
      price: "₹759",
      image: "/block-1.png",
      type: "nonveg",
      servingSize: "8+",
      occasions: [1,2,3,4,5,6,7],
      categories: [1,2,3],
    },
    {
      id: 2,
      name: "Indian DeGustibus",
      slug: "indian-degustibus",
      price: "₹689",
      image: "/block-3.png",
      type: "veg",
      servingSize: "8+",
      occasions: [1,2,4,6],
      categories: [1,2,3],
    },
    {
      id: 11,
      name: "Wedding Feast",
      slug: "wedding-feast",
      price: "₹899",
      image: "/block-3.png",
      type: "nonveg",
      servingSize: "10+",
      occasions: [2],
      categories: [2,3],
    },
  ];


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

  // Filter menu items based on selected occasion and category
  const filteredMenuItems = cateringMenuItems.filter((item) => {
    const matchesOccasion = !selectedOccasion || item.occasions.includes(selectedOccasion);
    const matchesCategory = !selectedCategory || item.categories.includes(selectedCategory);
    return matchesOccasion && matchesCategory;
  });

  return (
    <div className={`min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white font-dongle ${showCityModal ? "overflow-hidden h-screen" : ""}`}>
      
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

      <Header/>

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
              className="text-red-600 text-sm md:text-xl my-3 uppercase tracking-widest font-semibold"
            >
              catering
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-gray-900 bg-clip-text text-transparent mb-12"
              // style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
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
            className="text-3xl md:text-5xl font-bold text-red-800 mb-10 flex items-center gap-4"
          >
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full"
            ></motion.span>
            <span className="tracking-tight">Choose Your Occasion</span>
          </motion.h2>
          
          {/* Scrollable Occasions Row */}
          <div className="relative">
            <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-4 md:pb-8 pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
              {occasions.map((occasion) => (
                <div key={occasion.id} className="flex flex-col items-center gap-4 flex-shrink-0 snap-center">
                  <motion.button
                    onClick={() => router.push(`/services/catering/occasions/${occasion.slug}`)}
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
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden transition-all duration-500 shadow-lg group ${
                      selectedOccasion === occasion.id
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
      <section className="relative bg-white py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-3xl md:text-5xl font-bold text-red-800 mb-10 flex items-center gap-4"
          >
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full"
            ></motion.span>
            <span className="tracking-tight">Choose Your Services</span>
          </motion.h2>
          
          {/* Scrollable Services Row */}
          <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-4 md:pb-8 pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col items-center gap-4 flex-shrink-0 snap-center">
                <motion.button
                  onClick={() => router.push(`/services/catering/services/${service.slug}`)}
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
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden transition-all duration-500 shadow-lg group ${
                    selectedService === service.id
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
      <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-4 md:py-6 px-4 md:px-8">
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
              className="text-red-600 text-sm md:text-xl mb-4 uppercase tracking-widest font-semibold"
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
              className="text-2xl md:text-4xl font-bold text-red-800 mb-10 flex items-center gap-4"
            >
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full"
              ></motion.span>
              <span className="tracking-tight">Categories</span>
            </motion.h3>
            
            {/* Scrollable Categories Row */}
            <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-md:pb-8 pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
              {categories.map((category) => (
                <div key={category.id} className="flex flex-col items-center gap-4 flex-shrink-0 snap-center">
                  <motion.button
                    onClick={() => router.push(`/services/catering/categories/${category.slug}`)}                  
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
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden transition-all duration-500 shadow-lg group ${
                      selectedCategory === category.id
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

          {/* Filtered Menu Items Cards Section */}
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
                className="text-2xl md:text-4xl font-bold text-red-800 mb-8 flex items-center gap-4"
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
                      whileHover={{ y: -6 }}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
                      onClick={() => router.push(`/services/catering/occasions/${item.slug}`)} // Default to occasions for details
                    >
                      {/* Image Section */}
                      <div className="relative w-full h-48 md:h-56 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                        
                        {/* Deep red premium gradient overlay - appears on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-red-700/90 via-red-600/20 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <span className="text-white text-lg drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Details
                          </span>
                        </motion.div>

                        <div
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 backdrop-blur-md ${
                            item.type === "veg"
                              ? "bg-green-50/90 border-green-500"
                              : "bg-red-50/90 border-red-500"
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${
                            item.type === "veg" ? "bg-green-600" : "bg-red-600"
                          }`} />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 space-y-3">
                        <h4 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-red-600 transition-colors line-clamp-1">
                          {item.name}
                        </h4>

                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Starting from</span>
                            <span className="text-2xl font-black text-red-600 leading-none">
                              {item.price}
                            </span>
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Serving</span>
                            <span className="text-base font-semibold text-gray-700">
                              {item.servingSize} People
                            </span>
                          </div>
                        </div>

                        <button
                          className="
                            mt-2 w-full py-2.5
                            text-sm font-bold uppercase tracking-widest
                            rounded-xl
                            border-2 border-red-600
                            text-red-600
                            hover:bg-red-600 hover:text-white
                            transition-all duration-300
                          "
                        >
                          Customize
                        </button>
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

         
        </div>
      </section>
      <Footer/>
    </div>
  );
}

function CitySelectionModal({ onSelect }) {
  const cities = [
    { name: "Mumbai", icon: "🏙️", description: "The City of Dreams" },
    { name: "Delhi", icon: "🏛️", description: "Heart of the Nation" },
    { name: "Bangalore", icon: "🌱", description: "Silicon Valley of India" },
    { name: "Hyderabad", icon: "🏰", description: "City of Pearls" },
    { name: "Ahmedabad", icon: "🏗️", description: "Manchester of the East" },
    { name: "Chennai", icon: "🌊", description: "Gateway to the South" },
    { name: "Kolkata", icon: "🌉", description: "City of Joy" },
    { name: "Pune", icon: "⛰️", description: "Oxford of the East" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-2xl px-4 py-4" />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <div className="w-32 h-32 bg-red-600 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-10">
          <div className="w-32 h-32 bg-red-400 rounded-full blur-3xl animate-pulse" />
        </div>


        {/* SELECT YOUR CITY  */}

        <div className="relative z-10 p-8 md:p-12">
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest mb-4"
            >
              Location Required
            </motion.div>
            <motion.h2
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Select Your City
            </motion.h2>
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-xl max-w-md mx-auto"
            >
              To serve you better, please let us know your location for our catering services.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {cities.map((city, index) => (
              <motion.button
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(city.name)}
                className="group relative flex flex-col items-center justify-center p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {city.icon}
                </div>
                <h3 className="text-xl font-extrabold text-gray-800 mb-1 group-hover:text-red-600 transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {city.description}
                </p>
                
                {/* Active selection glow */}
                <div className="absolute inset-0 rounded-3xl ring-2 ring-red-500 ring-opacity-0 group-hover:ring-opacity-20 transition-all duration-300" />
              </motion.button>
            ))}
          </div>
          
          <div className="mt-12 text-center text-gray-400 text-sm">
            Can't find your city? <button className="text-red-500 font-semibold hover:underline">Contact Support</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CateringPage;
