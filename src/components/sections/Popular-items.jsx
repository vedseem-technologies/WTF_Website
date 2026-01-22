'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

function PopularItems() {
  const items = ['Biriyani', 'Kabab', 'Pizza', 'Burger', 'Biriyani', 'Kabab', 'Pizza', 'Burger', 'Biriyani', 'Kabab', 'Pizza', 'Burger']
  const [itemsPerSlide, setItemsPerSlide] = useState(4)
  const [slideDuration, setSlideDuration] = useState(5000)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setItemsPerSlide(2)
        setSlideDuration(3000) // 3 seconds for mobile
      } else if (width < 768) {
        setItemsPerSlide(3)
        setSlideDuration(4000) // 4 seconds for small tablets
      } else if (width < 1024) {
        setItemsPerSlide(3)
        setSlideDuration(5000)
      } else {
        setItemsPerSlide(4)
        setSlideDuration(5000)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = Math.ceil(items.length / itemsPerSlide)

  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0)
    }
  }, [totalSlides, currentSlide])

  useEffect(() => {
    // Reset progress when slide changes
    setProgress(0)
    
    // Progress bar animation
    const intervalTime = 100
    const increment = 100 / (slideDuration / intervalTime)
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + increment
      })
    }, intervalTime)

    // Auto-slide 
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, slideDuration)

    return () => {
      clearInterval(progressInterval)
      clearInterval(slideInterval)
    }
  }, [currentSlide, totalSlides, slideDuration])

  // Get current items to display
  const currentItems = items.slice(
    currentSlide * itemsPerSlide,
    currentSlide * itemsPerSlide + itemsPerSlide
  )

  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Background (UNCHANGED) */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-top"
        style={{ backgroundImage: 'url(/bg-union-red.png)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-24 md:min-h-screen md:px-6 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Most Popular Items
        </h2>

        {/* Main Red Container */}
        <div
          className="w-full max-w-6xl rounded-3xl lg:px-10 md:px-6 px-2 lg:py-14 md:py-10 py-6 overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at center, #7a2a24 0%, #5a1612 55%, #4a0f0c 100%)',
          }}
        >
          {/* Items - Responsive grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 md:gap-10 py-8 relative overflow-hidden`}>
            {currentItems.map((title, colIdx) => {
              return (
                <div key={`col-${colIdx}`} className="relative h-64">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentSlide}-${title}-${colIdx}`}
                      initial={{ x: '100%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: '-100%', opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        duration: 1,
                        delay: colIdx * 0.05
                      }}
                      className="flex flex-col items-center absolute inset-0"
                    >
                      {/* SINGLE SHAPE */}
                      <div className="relative md:w-40 w-36 flex flex-col items-center">
                        {/* Circle - Absolutely positioned to overlap */}
                        <div className="absolute -top-6 md:w-48 md:h-48 w-44 h-44 rounded-full bg-gray-300 border-[6px] border-gray-400 z-10" />

                        {/* Rectangle - Positioned below with padding for overlap */}
                        <div className="mt-24 bg-gray-200 rounded-2xl px-4 pt-32 pb-6 flex flex-col items-center w-full">
                          <p className="text-red-800 font-semibold text-sm">
                            {title}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-3 mt-8">
          <span className="text-yellow-400 text-xl">‹</span>
          <div className="relative h-1 w-16 bg-gray-400 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-yellow-400 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-yellow-400 text-xl">›</span>
        </div>
      </div>
      <div className="w-full relative flex flex-col justify-center items-center z-10 -mt-16">
        <Image src="/chef.png" alt="popular-items-bg" width={600} height={1000} />
        {/* Multiple Services Section */}
        <div className="w-full max-w-6xl mx-auto px-6 mt-8">
          {/* Title */}
          <div className="text-center mb-8">
            <p className="text-black text-xl md:text-2xl mb-2">We are more than</p>
            <h3 className="text-red-800 text-3xl md:text-5xl font-bold">Multiple Services</h3>
          </div>

          {/* Services Container */}
          <div className="border border-red-800 rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {/* Franchise Model */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-black">
                    {/* Handshake Icon */}
                    <path d="M12 28L16 24L20 28M28 28L32 24L36 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 24C16 20 18 18 22 18C24 18 26 19 26 21C26 19 28 18 30 18C34 18 36 20 36 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 18V14C22 12 24 10 26 10C28 10 30 12 30 14V18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 18V14C18 12 16 10 14 10C12 10 10 12 10 14V18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-red-800 font-semibold text-sm md:text-base">Franchise Model</p>
              </div>

              {/* Dining */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-black">
                    {/* Fork and Knife Crossed Icon */}
                    <path d="M18 6L18 42M18 6C20 6 22 8 22 10V14C22 16 20 18 18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M30 6L30 42M30 6C28 6 26 8 26 10V18C26 20 28 22 30 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 42L22 46M30 42L26 46" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-red-800 font-semibold text-sm md:text-base">Dining</p>
              </div>

              {/* Food Delivery */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-10"></div>
                <p className="text-red-800 font-semibold text-sm md:text-base">Food Delivery</p>
              </div>

              {/* Catering */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-10"></div>
                <p className="text-red-800 font-semibold text-sm md:text-base">Catering</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularItems
