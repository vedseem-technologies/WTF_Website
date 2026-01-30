"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";

// Full menu data with all available items by category
const fullMenuData = {
  "delivery-only": [
    // Starters
    { name: "Paneer Tikka", image: "/block-1.png", category: "Starters", type: "veg" },
    { name: "Veg Spring Roll", image: "/block-2.png", category: "Starters", type: "veg" },
    { name: "Hara Bhara Kebab", image: "/block-3.png", category: "Starters", type: "veg" },
    { name: "Corn Cheese Balls", image: "/block-1.png", category: "Starters", type: "veg" },
    { name: "Mushroom Tikka", image: "/block-2.png", category: "Starters", type: "veg" },
    { name: "Crispy Veg", image: "/block-3.png", category: "Starters", type: "veg" },
    { name: "Aloo Tikki", image: "/block-1.png", category: "Starters", type: "veg" },
    
    // Mains
    { name: "Dal Makhani", image: "/block-1.png", category: "Mains", type: "veg" },
    { name: "Shahi Paneer", image: "/block-2.png", category: "Mains", type: "veg" },
    { name: "Veg Biryani", image: "/block-3.png", category: "Mains", type: "veg" },
    { name: "Palak Paneer", image: "/block-1.png", category: "Mains", type: "veg" },
    { name: "Kadai Paneer", image: "/block-2.png", category: "Mains", type: "veg" },
    { name: "Malai Kofta", image: "/block-3.png", category: "Mains", type: "veg" },
    { name: "Mix Veg Curry", image: "/block-1.png", category: "Mains", type: "veg" },
    
    // Bread & Rice
    { name: "Naan", image: "/block-1.png", category: "Bread & Rice", type: "veg" },
    { name: "Jeera Rice", image: "/block-2.png", category: "Bread & Rice", type: "veg" },
    { name: "Butter Naan", image: "/block-3.png", category: "Bread & Rice", type: "veg" },
    { name: "Garlic Naan", image: "/block-1.png", category: "Bread & Rice", type: "veg" },
    { name: "Roti", image: "/block-2.png", category: "Bread & Rice", type: "veg" },
    { name: "Pulao", image: "/block-3.png", category: "Bread & Rice", type: "veg" },
    
    // Desserts
    { name: "Gulab Jamun", image: "/block-3.png", category: "Desserts", type: "veg" },
    { name: "Rasgulla", image: "/block-1.png", category: "Desserts", type: "veg" },
    { name: "Kheer", image: "/block-2.png", category: "Desserts", type: "veg" },
    { name: "Jalebi", image: "/block-3.png", category: "Desserts", type: "veg" },
  ],
  "on-site": [
    // Starters
    { name: "Chicken Tikka", image: "/block-1.png", category: "Starters", type: "nonveg" },
    { name: "Fish Amritsari", image: "/block-2.png", category: "Starters", type: "nonveg" },
    { name: "Paneer Tikka", image: "/block-3.png", category: "Starters", type: "veg" },
    { name: "Tandoori Chicken", image: "/block-1.png", category: "Starters", type: "nonveg" },
    { name: "Chicken Wings", image: "/block-2.png", category: "Starters", type: "nonveg" },
    { name: "Prawn Fry", image: "/block-3.png", category: "Starters", type: "nonveg" },
    { name: "Mutton Seekh Kebab", image: "/block-1.png", category: "Starters", type: "nonveg" },
    { name: "Hara Bhara Kebab", image: "/block-2.png", category: "Starters", type: "veg" },
    
    // Mains
    { name: "Butter Chicken", image: "/block-1.png", category: "Mains", type: "nonveg" },
    { name: "Mutton Rogan Josh", image: "/block-2.png", category: "Mains", type: "nonveg" },
    { name: "Dal Makhani", image: "/block-3.png", category: "Mains", type: "veg" },
    { name: "Chicken Curry", image: "/block-1.png", category: "Mains", type: "nonveg" },
    { name: "Fish Curry", image: "/block-2.png", category: "Mains", type: "nonveg" },
    { name: "Paneer Butter Masala", image: "/block-3.png", category: "Mains", type: "veg" },
    { name: "Kadai Chicken", image: "/block-1.png", category: "Mains", type: "nonveg" },
    
    // Bread & Rice
    { name: "Butter Naan", image: "/block-1.png", category: "Bread & Rice", type: "veg" },
    { name: "Biryani", image: "/block-2.png", category: "Bread & Rice", type: "nonveg" },
    { name: "Garlic Naan", image: "/block-3.png", category: "Bread & Rice", type: "veg" },
    { name: "Jeera Rice", image: "/block-1.png", category: "Bread & Rice", type: "veg" },
    { name: "Roti", image: "/block-2.png", category: "Bread & Rice", type: "veg" },
    
    // Desserts
    { name: "Kheer", image: "/block-3.png", category: "Desserts", type: "veg" },
    { name: "Gulab Jamun", image: "/block-1.png", category: "Desserts", type: "veg" },
    { name: "Rasmalai", image: "/block-2.png", category: "Desserts", type: "veg" },
    { name: "Ice Cream", image: "/block-3.png", category: "Desserts", type: "veg" },
  ],
  "full-service": [
    // Starters
    { name: "Tandoori Chicken", image: "/block-1.png", category: "Starters", type: "nonveg" },
    { name: "Seekh Kebab", image: "/block-2.png", category: "Starters", type: "nonveg" },
    { name: "Malai Tikka", image: "/block-3.png", category: "Starters", type: "nonveg" },
    { name: "Fish Tikka", image: "/block-1.png", category: "Starters", type: "nonveg" },
    { name: "Chicken Tikka", image: "/block-2.png", category: "Starters", type: "nonveg" },
    { name: "Paneer Tikka", image: "/block-3.png", category: "Starters", type: "veg" },
    { name: "Mushroom Tikka", image: "/block-1.png", category: "Starters", type: "veg" },
    { name: "Hara Bhara Kebab", image: "/block-2.png", category: "Starters", type: "veg" },
    
    // Mains
    { name: "Paneer Lababdar", image: "/block-1.png", category: "Mains", type: "veg" },
    { name: "Chicken Curry", image: "/block-2.png", category: "Mains", type: "nonveg" },
    { name: "Fish Curry", image: "/block-3.png", category: "Mains", type: "nonveg" },
    { name: "Butter Chicken", image: "/block-1.png", category: "Mains", type: "nonveg" },
    { name: "Mutton Korma", image: "/block-2.png", category: "Mains", type: "nonveg" },
    { name: "Dal Makhani", image: "/block-3.png", category: "Mains", type: "veg" },
    { name: "Shahi Paneer", image: "/block-1.png", category: "Mains", type: "veg" },
    { name: "Kadai Chicken", image: "/block-2.png", category: "Mains", type: "nonveg" },
    
    // Bread & Rice
    { name: "Garlic Naan", image: "/block-1.png", category: "Bread & Rice", type: "veg" },
    { name: "Pulao", image: "/block-2.png", category: "Bread & Rice", type: "veg" },
    { name: "Butter Naan", image: "/block-3.png", category: "Bread & Rice", type: "veg" },
    { name: "Biryani", image: "/block-1.png", category: "Bread & Rice", type: "nonveg" },
    { name: "Jeera Rice", image: "/block-2.png", category: "Bread & Rice", type: "veg" },
    { name: "Roti", image: "/block-3.png", category: "Bread & Rice", type: "veg" },
    
    // Desserts
    { name: "Rasmalai", image: "/block-3.png", category: "Desserts", type: "veg" },
    { name: "Ice Cream", image: "/block-1.png", category: "Desserts", type: "veg" },
    { name: "Gulab Jamun", image: "/block-2.png", category: "Desserts", type: "veg" },
    { name: "Kheer", image: "/block-3.png", category: "Desserts", type: "veg" },
    { name: "Jalebi", image: "/block-1.png", category: "Desserts", type: "veg" },
  ],
  "wedding": [
    // Starters
    { name: "Tandoori Chicken", image: "/block-1.png", category: "Starters", type: "nonveg" },
    { name: "Seekh Kebab", image: "/block-2.png", category: "Starters", type: "nonveg" },
    { name: "Fish Tikka", image: "/block-3.png", category: "Starters", type: "nonveg" },
    { name: "Paneer Tikka", image: "/block-1.png", category: "Starters", type: "veg" },
    { name: "Hara Bhara Kebab", image: "/block-2.png", category: "Starters", type: "veg" },
    { name: "Chicken Wings", image: "/block-3.png", category: "Starters", type: "nonveg" },
    
    // Mains
    { name: "Butter Chicken", image: "/block-1.png", category: "Mains", type: "nonveg" },
    { name: "Mutton Rogan Josh", image: "/block-2.png", category: "Mains", type: "nonveg" },
    { name: "Dal Makhani", image: "/block-3.png", category: "Mains", type: "veg" },
    { name: "Shahi Paneer", image: "/block-1.png", category: "Mains", type: "veg" },
    { name: "Fish Curry", image: "/block-2.png", category: "Mains", type: "nonveg" },
    
    // Bread & Rice
    { name: "Biryani", image: "/block-3.png", category: "Mains", type: "nonveg" },
    { name: "Butter Naan", image: "/block-1.png", category: "Bread & Rice", type: "veg" },
    { name: "Garlic Naan", image: "/block-2.png", category: "Bread & Rice", type: "veg" },
    { name: "Jeera Rice", image: "/block-3.png", category: "Bread & Rice", type: "veg" },
    
    // Desserts
    { name: "Gulab Jamun", image: "/block-1.png", category: "Desserts", type: "veg" },
    { name: "Rasmalai", image: "/block-2.png", category: "Desserts", type: "veg" },
    { name: "Kheer", image: "/block-3.png", category: "Desserts", type: "veg" },
    { name: "Ice Cream", image: "/block-1.png", category: "Desserts", type: "veg" },
  ],
};

const CateringSummaryView = ({ selectedItem, bookingDetails: initialBookingDetails, onBack, slug, packageSlug }) => {
  const [expandedCategory, setExpandedCategory] = useState("Starter");
  const [items, setItems] = useState(selectedItem?.items || []);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [showDetails, setShowDetails] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authFormData, setAuthFormData] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [authAddresses, setAuthAddresses] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddressInput, setNewAddressInput] = useState('');
  const [showAddMore, setShowAddMore] = useState({});
  
  // Get booking details from sessionStorage or use initial
  const [bookingDetails, setBookingDetails] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('bookingDetails');
      return stored ? JSON.parse(stored) : (initialBookingDetails || { date: "", time: "", vegGuests: "10" });
    }
    return initialBookingDetails || { date: "", time: "", vegGuests: "10" };
  });

  // Get full menu for the selected category
  const categoryFullMenu = slug ? fullMenuData[slug] || [] : [];

  React.useEffect(() => {
    const storedUser = localStorage.getItem('wtf_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.addresses && parsedUser.addresses.length > 0) {
        setSelectedAddress(parsedUser.addresses[0]);
      }
    }
  }, []);

  React.useEffect(() => {
    // Hide bottom bar when this view is active
    window.dispatchEvent(new CustomEvent("hideBottomNavbar", { detail: true }));
    return () => {
      // Show bottom bar when this view is inactive
      window.dispatchEvent(new CustomEvent("hideBottomNavbar", { detail: false }));
    };
  }, []);

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

  const groupedItems = groupItemsByCategory(items);
  const categoriesMap = [
    { label: "Starter", key: "Starters" },
    { label: "Main Course", key: "Mains" },
    { label: "Bread, Rice & Noodles", key: "Bread & Rice" },
    { label: "Dessert", key: "Desserts" },
    { label: "Live Services (Home or Outdoor)", key: "Live Services" },
  ];

  const liveServices = [
    { name: "Live Pizza Party", image: "/pizza-live.png" },
    { name: "Live Momo Party", image: "/momo-live.png" },
    { name: "Live Bread / Starters (Chef + Tandoor)", image: "/bread-live.png" },
    { name: "Live Pasta Party", image: "/pasta-live.png" },
    { name: "Live Chaat Party", image: "/chaat-live.png" },
  ];

  const updateQuantity = (itemName, delta) => {
    // Basic logic for quantity update
    console.log(`Update ${itemName} by ${delta}`);
  };

  const handlePriceCheck = () => {
    setShowPriceBreakup(true);
    setCurrentStep(2);
  };

  const handleProceedToPay = () => {
    setShowPriceBreakup(false);
    setShowDetails(true);
    setCurrentStep(3);
  };

  const handleDetailsComplete = () => {
    if (!selectedAddress) {
      alert("Please select or add an address");
      return;
    }
    setShowPayment(true);
    setCurrentStep(4);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3008';
    
    try {
      const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/signup';
      const body = isLoginMode 
        ? { email: authFormData.email, password: authFormData.password }
        : { ...authFormData, addresses: authAddresses.filter(a => a.trim()) };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        if (isLoginMode) {
          localStorage.setItem('wtf_token', data.token);
          localStorage.setItem('wtf_user', JSON.stringify(data.user));
          setUser(data.user);
          if (data.user.addresses?.length > 0) setSelectedAddress(data.user.addresses[0]);
        } else {
          // Signup might need OTP, but for simplicity here we assume it logs in or user needs to verify
          // If the backend requires OTP, this will need more complex handling.
          // For now, let's assume login works if they already have account or signup is direct for this flow.
          alert("Signup successful! Please login.");
          setIsLoginMode(true);
        }
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewAddress = () => {
    if (!newAddressInput.trim()) return;
    const updatedUser = {
      ...user,
      addresses: [...(user.addresses || []), newAddressInput.trim()]
    };
    setUser(updatedUser);
    localStorage.setItem('wtf_user', JSON.stringify(updatedUser));
    setSelectedAddress(newAddressInput.trim());
    setNewAddressInput('');
    setShowAddAddress(false);
  };

  return (
    <div className="min-h-screen bg-white pb-24 pt-12 overflow-hidden relative font-dongle">
      
      {/* Fixed Progress Bar Section */}
      <div className="max-w-3xl mx-auto px-4 md:px-24 md:mb-8">
        
        <div className="relative flex items-center justify-between mb-8 md:mb-12">
          {/* Base line */}
          <div className="absolute inset-x-5 top-[20px] h-[2px] bg-red-100" />
        
          {/* Active progress line */}
          <motion.div
            className="absolute left-5 top-[20px] h-[2px] bg-red-500 origin-left"
            initial={false}
            animate={{ width: `calc(${(currentStep / 4) * 100}% - ${currentStep === 4 ? '40px' : '20px'})` }}
            transition={{ duration: 0.5 }}
          />
        
          {[
            { label: "Event" },
            { label: "Menu" },
            { label: "Price" },
            { label: "Details" },
            { label: "Pay" },
          ].map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isActive = idx === currentStep;
        
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                <motion.div
                  animate={{
                    backgroundColor: isCompleted || isActive ? "#ef4444" : "#ffffff",
                    color: isCompleted || isActive ? "#ffffff" : "#fecaca",
                    scale: isActive ? 1.1 : 1,
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm border-2 ${
                    isCompleted || isActive ? "border-transparent" : "border-red-100"
                  }`}
                >
                  {isCompleted && idx !== currentStep ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </motion.div>
                <span className={`text-lg font-semibold uppercase tracking-widest transition-colors duration-300 ${
                  isCompleted || isActive ? "text-red-600" : "text-red-200"
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-100" />
      </div>

      {/* Main Content Area with Sliding Animation */}
      <div className="relative max-w-3xl mx-auto px-6 md:px-24 min-h-[400px]">
        <AnimatePresence mode="wait">
          {!showPriceBreakup && !showDetails && !showPayment ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-2">
                Menu Summary
              </h1>
              <p className="text-2xl text-gray-500 mb-8">
                Review and fine-tune your catering selection
              </p>

              {/* Info Box */}
              <div className="bg-white/70 backdrop-blur rounded-2xl p-5 flex gap-4 mb-10 shadow-sm border border-orange-50/50">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">
                  💡
                </div>
                <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                  Quantities are <span className="font-bold text-gray-800">auto-calculated</span> based on your guest count. 
                </p>
              </div>

              {/* Categories List */}
              <div className="space-y-4 pb-12">
                {categoriesMap.map((cat) => {
                  const isExpanded = expandedCategory === cat.label;
                  const categoryItems = groupedItems[cat.key] || [];
                  const isLiveService = cat.label.includes("Live Services");

                  return (
                    <div key={cat.label} className="rounded-3xl bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-all border border-gray-50">
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : cat.label)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold text-gray-900">{cat.label}</span>
                          <span className="text-lg font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                            ({isLiveService ? "0" : categoryItems.length})
                          </span>
                        </div>
                        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} className="text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 border-t border-gray-50 overflow-hidden"
                          >
                            <div className="relative mb-6 pt-6">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 mt-3 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                              </div>
                              <input
                                type="text"
                                placeholder={`Search ${cat.label}`}
                                className="w-full bg-gray-50 text-gray-800 border border-gray-100 rounded-xl py-3.5 pl-12 pr-4 text-2xl font-medium focus:ring-2 focus:ring-red-100 transition-all outline-none"
                              />
                            </div>

                            {isLiveService ? (
                              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                                {liveServices.map((service, idx) => (
                                  <div key={idx} className="flex-shrink-0 w-36 h-44 bg-gray-50 rounded-2xl overflow-hidden relative snap-center border border-gray-100">
                                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <span className="absolute bottom-3 inset-x-3 text-white text-lg font-black uppercase tracking-tight z-20">
                                      {service.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="space-y-3 pb-6">
                                {/* Package Items */}
                                {categoryItems.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                                    <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0">
                                      <Image src={item.image} alt={item.name} width={48} height={48} className="w-full h-full object-cover rounded-xl" unoptimized />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-1.5 font-bold text-3xl text-gray-800">
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                                        {item.name}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {/* Quantity Controls */}
                                      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2 py-1">
                                        <button className="w-7 h-7 flex items-center justify-center rounded bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                                          </svg>
                                        </button>
                                        <span className="text-2xl font-black text-gray-800 min-w-[60px] text-center">20 pcs</span>
                                        <button className="w-7 h-7 flex items-center justify-center rounded bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                {/* Add More Button */}
                                {categoryFullMenu.filter(item => item.category === cat.key).length > 0 && (
                                  <button
                                    onClick={() => setShowAddMore({ ...showAddMore, [cat.key]: !showAddMore[cat.key] })}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl font-bold text-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>{showAddMore[cat.key] ? 'Hide Additional Items' : 'Add More Items'}</span>
                                  </button>
                                )}

                                {/* Additional Menu Items */}
                                <AnimatePresence>
                                  {showAddMore[cat.key] && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="space-y-3 overflow-hidden"
                                    >
                                      <div className="pt-3 border-t-2 border-dashed border-gray-200">
                                        <p className="text-2xl font-bold text-gray-700 mb-3 uppercase tracking-wide">Available {cat.label} Items</p>
                                        {categoryFullMenu
                                          .filter(item => item.category === cat.key)
                                          .map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-red-200 hover:shadow-md transition-all">
                                              <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0">
                                                <Image src={item.image} alt={item.name} width={48} height={48} className="w-full h-full object-cover rounded-xl" unoptimized />
                                              </div>
                                              <div className="flex-1">
                                                <div className="flex items-center gap-1.5 font-bold text-3xl text-gray-800">
                                                  <div className={`w-1.5 h-1.5 rounded-full ${item.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                  {item.name}
                                                </div>
                                              </div>
                                              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-xl transition-all flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Add
                                              </button>
                                            </div>
                                          ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : showPriceBreakup && !showPayment ? (
            <motion.div
              key="price"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="pb-20 pt-6 md:pt-0"
            >
              <div className="flex items-center gap-4 mb-8">
                <div style={{lineHeight: "0.7"}}>
                  <h1 className="text-4xl font-semibold text-gray-900">
                    Price Summary
                  </h1>
                  <p className="text-md text-gray-400 mt-1">
                    Order ID • WTF-{Math.floor(1000 + Math.random() * 9000)}
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl">
                <div className="px-6 py-5 border-b border-gray-100">
                  <div className="flex justify-between items-start" style={{lineHeight: "0.7"}}>
                    <div>
                      <p className="text-2xl font-medium text-gray-900">
                        Standard Catering Package
                      </p>
                      <p className="text-md text-gray-400 mt-1">
                        Vegetarian • {bookingDetails?.vegGuests || 10} Guests
                      </p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">
                      ₹{759 * (bookingDetails?.vegGuests || 10)}
                    </p>
                  </div>
                </div>
              
                <div className="px-6 py-5 md:space-y-3">
                  <div className="flex justify-between text-2xl text-gray-600">
                    <span>Service & Setup</span>
                    <span className="font-medium text-gray-900">₹1,500</span>
                  </div>
                  <div className="flex justify-between text-2xl text-gray-600">
                    <span>Equipment Charges</span>
                    <span className="font-medium text-gray-900">₹0</span>
                  </div>
                  <div className="flex justify-between text-2xl text-gray-600">
                    <span>Live Counters</span>
                    <span className="font-medium text-gray-900">₹0</span>
                  </div>
                </div>
              
                <div className="border-t border-gray-200" />
              
                <div className="px-6 py-5 flex justify-between items-center">
                  <div style={{lineHeight: "0.7"}}>
                    <p className="text-md uppercase tracking-wide text-gray-400">
                      Total Payable
                    </p>
                    <p className="text-md text-gray-400 mt-1">
                      Taxes calculated at checkout
                    </p>
                  </div>
                  <p className="text-2xl font-semibold text-red-600">
                    ₹{759 * (bookingDetails?.vegGuests || 10) + 1500}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex gap-6 text-md text-gray-500" style={{lineHeight: "0.7"}}>
                <span>• FSSAI certified kitchens</span>
                <span>• On-time setup guarantee</span>
              </div>
            </motion.div>
          ) : showDetails && !showPayment ? (
            <motion.div
              key="details"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              className="pb-20 pt-6"
            >
              {!user ? (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">{isLoginMode ? 'Login to Continue' : 'Create Account'}</h1>
                    <p className="text-2xl text-gray-500">Please {isLoginMode ? 'login' : 'sign up'} to proceed with your booking</p>
                  </div>
                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    {!isLoginMode && (
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-3xl text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-500 transition-all"
                          value={authFormData.firstName}
                          onChange={(e) => setAuthFormData({...authFormData, firstName: e.target.value})}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-3xl text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-500 transition-all"
                          value={authFormData.lastName}
                          onChange={(e) => setAuthFormData({...authFormData, lastName: e.target.value})}
                        />
                      </div>
                    )}
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-3xl text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-500 transition-all"
                      value={authFormData.email}
                      onChange={(e) => setAuthFormData({...authFormData, email: e.target.value})}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-3xl text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-500 transition-all"
                      value={authFormData.password}
                      onChange={(e) => setAuthFormData({...authFormData, password: e.target.value})}
                      required
                    />
                    {!isLoginMode && (
                      <div className="space-y-2">
                        <label className="text-xl text-gray-500 block">Addresses</label>
                        {authAddresses.map((addr, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              placeholder={`Address ${idx + 1}`}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-3xl text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-500 transition-all"
                              value={addr}
                              onChange={(e) => {
                                const newAddrs = [...authAddresses];
                                newAddrs[idx] = e.target.value;
                                setAuthAddresses(newAddrs);
                              }}
                              required={idx === 0}
                            />
                            {idx > 0 && (
                              <button type="button" onClick={() => setAuthAddresses(authAddresses.filter((_, i) => i !== idx))} className="text-red-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={() => setAuthAddresses([...authAddresses, ''])} className="text-red-600 font-bold text-xl flex items-center gap-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                          Add Address
                        </button>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-red-600 text-white rounded-xl py-4 text-2xl font-bold hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : (isLoginMode ? 'Login' : 'Sign Up')}
                    </button>
                  </form>
                  <p className="text-center text-xl text-gray-500 mt-4">
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLoginMode(!isLoginMode)} className="ml-2 text-red-600 font-bold underline">
                      {isLoginMode ? 'Sign Up' : 'Login'}
                    </button>
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Delivery Details</h1>
                    <p className="text-2xl text-gray-500">Confirm your details and select delivery address</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">Your Information</h2>
                      <button 
                        onClick={() => {
                          localStorage.removeItem('wtf_token');
                          localStorage.removeItem('wtf_user');
                          setUser(null);
                        }}
                        className="text-red-600 font-bold text-xl uppercase tracking-tighter"
                      >
                        Edit / Logout
                      </button>
                    </div>
                    <p className="text-2xl text-gray-600">{user.firstName} {user.lastName}</p>
                    <p className="text-xl text-gray-500">{user.email}</p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">Select Delivery Address</h2>
                    <div className="space-y-3">
                      {user.addresses?.map((addr, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setSelectedAddress(addr)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === addr ? 'border-red-500 bg-red-50/20' : 'border-gray-100 hover:border-gray-200'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddress === addr ? 'border-red-500 bg-red-500' : 'border-gray-300'}`}>
                              {selectedAddress === addr && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className="text-2xl text-gray-700">{addr}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {showAddAddress ? (
                      <div className="mt-4 flex gap-2">
                        <input
                          type="text"
                          value={newAddressInput}
                          onChange={(e) => setNewAddressInput(e.target.value)}
                          placeholder="Enter new address"
                          className="flex-1 bg-white border border-gray-200 rounded-xl py-2 px-4 text-2xl text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-red-100"
                        />
                        <button 
                          onClick={handleAddNewAddress}
                          className="bg-red-600 text-white px-4 py-2 rounded-xl text-xl font-bold"
                        >
                          Add
                        </button>
                        <button 
                          onClick={() => setShowAddAddress(false)}
                          className="text-gray-400 px-2"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setShowAddAddress(true)}
                        className="flex items-center gap-2 text-red-600 font-bold text-2xl mt-2"
                      >
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                         Add New Address
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="payment"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="pb-20 pt-6"
            >
              <div className="mb-8" style={{lineHeight: "0.5"}}>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Select Payment Method
                </h1>
                <p className="text-md text-gray-400 mt-1">
                  Secure your booking with these options
                </p>
              </div>

              <div className="space-y-4">
                {/* Razorpay Option */}
                <button
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 ${
                    paymentMethod === "razorpay"
                      ? "border-red-500 bg-red-50/20"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h10v2H6zm12-4h2v2h-2zm-4 0h2v2h-2z"/>
                      </svg>
                    </div>
                    <div style={{lineHeight: "0.5"}}>
                      <p className="font-bold text-3xl text-gray-900">Razorpay</p>
                      <p className="text-md text-gray-500">Cards, Netbanking, UPI, Wallets</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    paymentMethod === "razorpay" ? "border-red-500 bg-red-500" : "border-gray-200"
                  }`}>
                    {paymentMethod === "razorpay" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                    )}
                  </div>
                </button>

                {/* COD Option */}
                {/* <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 ${
                    paymentMethod === "cod"
                      ? "border-red-500 bg-red-50/20"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                      </svg>
                    </div>
                    <div style={{lineHeight: "0.5"}}>
                      <p className="font-bold text-3xl text-gray-900">Cash on Delivery</p>
                      <p className="text-md text-gray-500">Pay 100% at the venue</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    paymentMethod === "cod" ? "border-red-500 bg-red-500" : "border-gray-200"
                  }`}>
                    {paymentMethod === "cod" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                    )}
                  </div>
                </button> */}
              </div>

              <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-500 text-2xl">Payable amount now</span>
                  <span className="font-extrabold text-gray-900 text-2xl">₹{paymentMethod === "cod" ? "0" : (759 * (bookingDetails?.vegGuests || 10) + 1500)}</span>
                </div>
                {paymentMethod === "cod" && (
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight">
                    Booking confirmation is subject to verification. 
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 md:p-6 p-4 z-[120]">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 md:px-28">
          <button
            onClick={() => {
              if (showPayment) {
                setShowPayment(false);
                setCurrentStep(3);
              } else if (showDetails) {
                setShowDetails(false);
                setShowPriceBreakup(true);
                setCurrentStep(2);
              } else if (showPriceBreakup) {
                setShowPriceBreakup(false);
                setCurrentStep(1);
              } else {
                onBack();
              }
            }}
            className="py-2.5 px-6 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all outline-none border border-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          {(!showPriceBreakup && !showDetails && !showPayment) ? (
            <button 
              onClick={handlePriceCheck}
              className="flex-1 bg-red-600 text-white rounded-2xl py-3 px-6 text-2xl font-semibold shadow-lg shadow-red-200 active:scale-[0.98] transition-all hover:bg-red-700"
            >
              Check Price
            </button>
          ) : showPriceBreakup ? (
            <button 
              onClick={handleProceedToPay}
              className="flex-1 bg-red-600 text-white rounded-2xl py-3 px-6 text-2xl font-semibold shadow-lg shadow-red-200 active:scale-[0.98] transition-all hover:bg-red-700"
            >
              Proceed to Pay
            </button>
          ) : showDetails ? (
            <button 
              onClick={handleDetailsComplete}
              disabled={!user}
              className="flex-1 bg-red-600 text-white rounded-2xl py-3 px-6 text-2xl font-semibold shadow-lg shadow-red-200 active:scale-[0.98] transition-all hover:bg-red-700 disabled:opacity-50"
            >
              Confirm Details
            </button>
          ) : (
            <button className="flex-1 bg-red-600 text-white rounded-2xl py-3 px-6 text-2xl font-semibold shadow-lg shadow-red-200 active:scale-[0.98] transition-all hover:bg-red-700 uppercase tracking-tight">
              {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CateringSummaryView;
