"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCatering } from "../../context/CateringContext";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const occasions = [
    { id: 1, name: "Birthday", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop" },
    { id: 2, name: "Wedding", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop" },
    { id: 3, name: "Corporate", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop" },
    { id: 4, name: "Anniversary", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop" },
    { id: 5, name: "Graduation", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop" },
    { id: 6, name: "Festival", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop" },
    { id: 7, name: "Other", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop" },
  ];

  const services = [
    { id: 1, name: "Full Service", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop" },
    { id: 2, name: "Buffet", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop" },
    { id: 3, name: "Plated", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop" },
    {
      id: 4,
      name: "Cocktail Menu",
      slug: "cocktail-menu",
      price: "₹759",
      image: "/block-1.png",
      type: "nonveg",
      servingSize: "8+",
      occasions: [1,2,3,4,5,6,7],
      categories: [1,2,3],
    },
    { id: 5, name: "BBQ", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=400&fit=crop" },
    { id: 6, name: "Dessert", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop" },
    { id: 7, name: "Beverages", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop" },
  ];

  const categories = [
    { id: 1, name: "Delivery only", image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=400&fit=crop" },
    { id: 2, name: "Delivery + Services", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop" },
    { id: 3, name: "Live Service", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop" },
    { id: 4, name: "Snack Box", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop" },
    { id: 5, name: "Meal Box", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop" },
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white font-dongle">
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
              // style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Best Catering Services
            </motion.h1>
          </motion.div>
        </div>

        {/* Banner Carousel - Minimal UI with Auto-Rotate & Swipe Gestures */}
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
          
          {/* Scrollable Occasions Row */}
          <div className="relative">
            <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-8 pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
              {occasions.map((occasion) => (
                <motion.button
                  key={occasion.id}
                  onClick={() => setSelectedOccasion(selectedOccasion === occasion.id ? null : occasion.id)}
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
                  animate={selectedOccasion === occasion.id ? {
                    boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.3), 0 10px 10px -5px rgba(220, 38, 38, 0.1)"
                  } : {}}
                  className={`relative flex-shrink-0 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden transition-all duration-500 snap-center shadow-lg ${
                    selectedOccasion === occasion.id
                      ? "shadow-2xl shadow-red-300/40 ring-2 ring-red-200"
                      : "hover:shadow-2xl"
                  }`}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={occasion.image}
                      alt={occasion.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  
                  {/* Gradient overlay - appears on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredOccasion === occasion.id ? 0.7 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"
                  />
                  
                  {/* Enhanced Name - appears on hover at bottom */}
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
                  
                  {/* Bottom shadow on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredOccasion === occasion.id ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none"
                  />
                </motion.button>
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
          
          {/* Scrollable Services Row */}
          <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-8 pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
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
                animate={selectedService === service.id ? {
                  boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.3), 0 10px 10px -5px rgba(220, 38, 38, 0.1)"
                } : {}}
                className={`relative flex-shrink-0 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden transition-all duration-500 snap-center shadow-lg ${
                  selectedService === service.id
                    ? "shadow-2xl shadow-red-300/40 ring-2 ring-red-200"
                    : "hover:shadow-2xl"
                }`}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                
                {/* Gradient overlay - appears on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredService === service.id ? 0.7 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"
                />
                
                {/* Enhanced Name - appears on hover at bottom */}
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
                
                {/* Bottom shadow on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredService === service.id ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* SELECT & CUSTOMIZED Package Section */}
      <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-6 px-4 md:px-8">
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
            
            {/* Scrollable Categories Row */}
            <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-8 pt-4 px-4 md:px-6 snap-x snap-mandatory scroll-smooth">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    console.log(category);
                    router.push(`/services/catering/${category.slug}`);
                  }}                  
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
                  animate={selectedCategory === category.id ? {
                    boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.3), 0 10px 10px -5px rgba(220, 38, 38, 0.1)"
                  } : {}}
                  className={`relative flex-shrink-0 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden transition-all duration-500 snap-center shadow-lg ${
                    selectedCategory === category.id
                      ? "shadow-2xl shadow-red-300/40 ring-2 ring-red-200"
                      : "hover:shadow-2xl"
                  }`}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  
                  {/* Gradient overlay - appears on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCategory === category.id ? 0.7 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"
                  />
                  
                  {/* Enhanced Name - appears on hover at bottom */}
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
                  
                  {/* Bottom shadow on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCategory === category.id ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none"
                  />
                </motion.button>
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
                      onClick={() => {
                        console.log(item);
                        router.push(`/services/catering/${item.slug}`);
                      }}
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
                          
                          {/* Premium Options Banner */}
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-md shadow-lg">
                            <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wide">
                              Premium Options
                            </span>
                          </div>

                          {/* Veg/Non-Veg Indicator */}
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

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 md:p-5 bg-gray-800">
                          {/* Title */}
                          <h4 className="text-white font-bold text-base md:text-lg mb-3 group-hover:text-red-400 transition-colors">
                            {item.name}
                          </h4>

                          {/* Serving Size and Price */}
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

                          {/* Customize Button */}
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

          {/* Packages Grid - Scrollable */}
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
                  {/* Image Section */}
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
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
                    
                    {/* Stats overlay */}
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
                    
                    {/* Subtle glow effect on hover */}
                    <motion.div 
                      className="absolute inset-0 ring-4 ring-red-500/20 rounded-t-3xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </div>
                  
                  {/* Footer Section */}
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
