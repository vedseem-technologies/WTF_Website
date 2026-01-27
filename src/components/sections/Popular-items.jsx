'use client'
import React, { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// const itemData = [
//   { 
//     name: 'Gourmet Biriyani', 
//     image: '/images/biriyani.png',
//     description: 'with saffron and aromatic spices',
//     rating: 9.5,
//     price: 15,
//     stars: 5
//   },
//   { 
//     name: 'Kabab Platter', 
//     image: '/images/kabab.png',
//     description: 'with grilled veggies and mint dip',
//     rating: 9.2,
//     price: 12,
//     stars: 5
//   },
//   { 
//     name: 'Napoli Pizza', 
//     image: '/images/pizza.png',
//     description: 'with fresh basil and buffalo mozzarella',
//     rating: 8.8,
//     price: 18,
//     stars: 4
//   },
//   { 
//     name: 'Signature Burger', 
//     image: '/images/burger.png',
//     description: 'with melting cheese and crisp lettuce',
//     rating: 8.5,
//     price: 10,
//     stars: 4
//   },
// ]

const StarIcon = memo(({ filled }) => (
  <svg
    className={`w-3 h-3 md:w-4 md:h-4 ${filled ? "text-red-600" : "text-zinc-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
));
StarIcon.displayName = 'StarIcon';

const PopularItemCard = memo(({ item, index }) => (
  <motion.div
    key={item.name}
    initial={{ opacity: 0, y: 0 }}
    whileInView={{ opacity: 1, y: 30 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ delay: index * 0.05, duration: 0.5 }}
    whileHover={{ y: 10 }}
    className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-[1.5rem] overflow-hidden shadow-2xl flex flex-col group border border-white/20 hover:cursor-pointer will-change-transform"
  >
    {/* Image Container - Taller for mobile */}
    <div className="relative aspect-[4/4] sm:aspect-[4/3] w-full p-2">
      <div className="relative w-full h-full rounded-xl md:rounded-[1.5rem] overflow-hidden shadow-inner">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>

    {/* Info Container - Better alignment for mobile */}
    <div className="px-3 md:px-6 pb-4 md:pb-8 pt-2 flex flex-col h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1 md:mb- md:gap-1">
        <h3 className="text-md md:text-3xl font-black text-zinc-900 tracking-tight leading-tight uppercase break-words">
          {item.name}
        </h3>
        <span className="text-red-600 font-black text-md md:text-2xl leading-none">
          {item.rating}★
        </span>
      </div>
      
      <p className="text-zinc-500 text-[20px] md:text-xl font-medium mb-3 md:mb-6 leading-tight"
         style={{
            lineHeight: "0.9"
         }}
      >
        {item.description}
      </p>

      <div className="mt-auto flex justify-between items-center">
        <div className="flex gap-0.5 md:gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < item.stars} />
          ))}
        </div>
        <span className="text-base md:text-2xl font-black text-zinc-900 leading-none">
          ₹{item.price}
        </span>
      </div>
    </div>
  </motion.div>
));
PopularItemCard.displayName = 'PopularItemCard';


const ServiceCard = memo(({ service, index, isMobile }) => (
  <motion.div
    key={service.label}
    initial={isMobile ? { opacity: 0, scale: 0.9 } : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    className="flex flex-col items-center justify-center border-2 border-red-100 text-center transition-all duration-300 p-6 md:p-8 rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2.5rem] border border-red-100 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:-translate-y-2 will-change-transform"
  >
    <div className="mb-4 flex items-center justify-center md:w-14 w-10 h-10 md:h-14 relative">
      <Image
        src={service.image}
        alt={service.label}
        fill
        sizes="(max-width: 640px) 40px, 56px"
        className="object-contain"
        style={{
          filter: 'brightness(0) saturate(100%) invert(13%) sepia(94%) saturate(5436%) hue-rotate(352deg) brightness(83%) contrast(105%)'
        }}
      />
    </div>
    <p className="dongle-regular uppercase transition-colors text-xl text-wrap md:text-wrap md:text-3xl tracking-widest text-red-800 group-hover:text-red-600"
      style={{ lineHeight: '0.8' }}
    >
      {service.label}
    </p>
  </motion.div>
));
ServiceCard.displayName = 'ServiceCard';

function PopularItems() {
  const [isMobile, setIsMobile] = useState(false)
  const [itemData, setItemData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)');
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [])

  // Fetch popular items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000'
        const response = await fetch(`${API_URL}/api/food`)

        if (!response.ok) throw new Error('Failed to fetch food items')

        const data = await response.json()

        // Map backend data to component format
        const mappedData = data.slice(0, 4).map((item, index) => ({
          name: item.name,
          image: item.image,
          description: item.description || 'Delicious food item',
          rating: (9.5 - index * 0.3).toFixed(1),
          price: item.price,
          stars: item.price > 15 ? 5 : 4,
          isVeg: item.isVeg
        }))

        setItemData(mappedData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching food items:', error)
        setError(error.message)
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col items-center">
      {/* Base Background Layer - Full Height */}
      <div
        className="absolute inset-0 w-full h-full opacity-100 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/bg-union-red.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Content Overlay to manage contrast */}
      <div className={`absolute inset-0 w-full h-full z-[1] transition-opacity duration-500 ${isMobile ? 'bg-black/20' : 'bg-transparent'}`} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 md:px-4 py-12 md:py-24 flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-6 md:mb-6"
        >
          <span className="text-white font-bold tracking-[0.1rem] md:tracking-[0.3rem] uppercase text-2xl md:text-5xl md:mb-4 block">Chef's <span className="text-yellow-400">Top </span>Picks</span>
          {/* <h2 className="text-4xl md:text-8xl font-black text-white tracking- uppercase">
            Most <span className="text-yellow-400">Popular</span> Items
          </h2> */}
          <div className="w-full h-0.5 md:h-1 bg-yellow-400 mx-auto -mt-2 md:-mt-4 rounded-full" />
        </motion.div>

        {/* Product Grid - Improved for Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full mb-24">
          {loading ? (
            // Loading skeleton
            [...Array(4)].map((_, index) => (
              <div key={index} className="bg-white/50 backdrop-blur-md rounded-2xl md:rounded-[1.5rem] overflow-hidden shadow-2xl animate-pulse">
                <div className="aspect-[4/4] sm:aspect-[4/3] bg-gray-300"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-2 lg:col-span-4 text-center py-12">
              <p className="text-white text-xl font-bold">Failed to load popular items</p>
              <p className="text-white/70 mt-2">{error}</p>
            </div>
          ) : itemData.length === 0 ? (
            // Empty state
            <div className="col-span-2 lg:col-span-4 text-center py-12">
              <p className="text-white text-xl font-bold">No popular items yet</p>
              <p className="text-white/70 mt-2">Check back soon!</p>
            </div>
          ) : (
            itemData.map((item, index) => (
              <PopularItemCard key={item.name} item={item} index={index} />
            ))
          )}
        </div>

        {/* Featured Section - Inspired by the bottom part of the provided image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center bg-gray-500/10 md:bg-white/5 backdrop-blur-xl rounded-[3rem] p-6 md:p-6 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        >
          <div className="flex flex-col text-center md:text-left md:px-8">
<<<<<<< HEAD
            <h3 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-6"
                style={{
                    lineHeight: "0.7"
                }}
=======
            <h3 className="text-5xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-6"
              style={{
                lineHeight: "0.7"
              }}
>>>>>>> 211a45d3d9e23baffad708ccaa17bcc347c27775
            >
              Best Potatoes<br />
              <span className="text-yellow-400 ">For French Fries</span>
            </h3>
            <p className="text-white/70 hidden sm:block text-base md:text-2xl font-medium leading-tight max-w-md">
              Russet potatoes have a high starch content and low moisture, making them ideal for creating the perfect, golden-brown French fries with a fluffy interior and crispy exterior.
            </p>
            <motion.button
              whileHover={{ x: 10 }}
              className="mt-10 hidden md:flex items-center gap-4 text-yellow-400 font-black uppercase tracking-widest text-xl group"
            >
              Explore Full Menu
              <div className="w-10 h-10 rounded-full border border-yellow-400/30 flex items-center justify-center transition-all group-hover:bg-yellow-400 group-hover:text-white">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.button>
          </div>

          <div className="relative aspect-square w-full max-w-md mx-auto flex items-center justify-center">
            {/* Ambient glows behind the plate */}
            <div className="absolute inset-8 bg-red-600/40 blur-[90px] rounded-full -z-10" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="relative w-[90%] h-[90%] bg-transparent overflow-hidden will-change-transform"
              style={{ clipPath: 'circle(39%)' }}
            >
              <Image
                src="/images/fries.png"
                alt="Perfect Fries"
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                style={{ mixBlendMode: 'normal' }}
              />
            </motion.div>
          </div>
          <div className="md:hidden">
            <p className="text-white/70 text-2xl font-medium leading-relaxed max-w-md"
              style={{
                lineHeight: "0.9"
              }}
            >
              Russet potatoes have a high starch content and low moisture, making them ideal for creating the perfect, golden-brown French fries with a fluffy interior and crispy exterior.
            </p>
            <Link href="/menu">
              <motion.button
                whileHover={{ x: 10 }}
                className="flex md:hidden items-center gap-4 text-yellow-400 uppercase tracking-widest text-2xl group mt-3"
              >
                Explore Full Menu
                <div className="w-10 h-10 rounded-full border border-yellow-400/30 flex items-center justify-center transition-all group-hover:bg-yellow-400 group-hover:text-white">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Unified Chef Section (Enhanced Mobile UI) */}
      <div className={`w-full relative flex flex-col justify-center items-center mt-4 z-10 transition-all duration-700 ${isMobile ? '-mt-10 pb-0' : 'md:-mt-16 pb-24'} bg-transparent`}>
        <div className="relative group">
          {/* Mobile-only Ambient Glow */}
          {isMobile && (
            <div className="absolute inset-0 bg-red-600/10 blur-[80px] rounded-full scale-125 -z-10 animate-pulse" />
          )}
<<<<<<< HEAD
          <Image 
            src="/chef.png" 
            alt="Chef Master" 
            width={isMobile ? 320 : 600} 
            height={1000} 
            priority={false}
            className={`filter contrast-125 brightness-90 transition-transform duration-700 ${isMobile ? 'scale-100 w-[85vw] h-auto' : 'group-hover:scale-[1.02]'} will-change-transform`} 
=======
          <Image
            src="/chef.png"
            alt="Chef Master"
            width={isMobile ? 380 : 600}
            height={1000}
            priority={false}
            className={`filter contrast-125 brightness-90 transition-transform duration-700 ${isMobile ? 'scale-105' : 'group-hover:scale-[1.02]'} will-change-transform`}
>>>>>>> 211a45d3d9e23baffad708ccaa17bcc347c27775
          />
        </div>

        <div className="w-full max-w-[90%] mx-auto px-6 mt-4 mb-8 md:mt-12 relative z-20">
          <div className="text-center mb-12">
<<<<<<< HEAD
            <h3 className="font-black uppercase tracking-tighter leading-none flex flex-col items-center text-3xl md:text-8xl text-red-800">
               <div className="text-red-800">Multiple {"  "}<span className="text-red-800">{" "}Services</span></div>
=======
            <h3 className="font-black uppercase tracking-tighter leading-none flex flex-col items-center text-4xl md:text-8xl text-red-800">
              <div className="text-red-800">Multiple {"  "}<span className="text-red-800">{" "}Services</span></div>
>>>>>>> 211a45d3d9e23baffad708ccaa17bcc347c27775
            </h3>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'md:grid-cols-2 lg:grid-cols-4 md:gap-16'} max-w-full mx-auto`}>
            {[
              {
                label: 'Franchise Model',
                image: '/images/franchise-model.png'
              },
              { 
                label: 'Fine Dining', 
                image: '/images/dining.png'
              },
              {
                label: 'Food Delivery',
                image: '/images/food-deliver.png'
              },
              {
                label: 'Catering',
                image: '/images/catering.png'
              }
            ].map((service, index) => (
              <ServiceCard key={service.label} service={service} index={index} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularItems
