'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

function Banner() {
  const processSteps = [
    {
      id: '01',
      title: 'Select Your Menu',
      description: 'Choose from our curated selection of signature dishes or customize your own.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3v0a10.003 10.003 0 0110 10v0c0 5.523-4.477 10-10 10H8.343" />
        </svg>
      )
    },
    {
      id: '02',
      title: 'Chef Collaboration',
      description: 'Our executive chefs work with you to perfect every flavor profile.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      )
    },
    {
      id: '03',
      title: 'Culinary Delivery',
      description: 'We bring the gourmet experience directly to your venue with precision.',
      icon: '/images/food-deliver.png'
    },
    {
      id: '04',
      title: 'Exquisite Event',
      description: 'Watch your vision come to life with professional execution and flair.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      )
    }
  ]

  return (
    <div className='w-full bg-white pt-8 pb-16 overflow-hidden'>
        {/* Main Banner Image - Premium Framed Look */}
        <div className="max-w-full mx-auto px-4 md:px-8 mb-16 md:mb-24">
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className='relative w-full aspect-[21/9] rounded-[0.5rem] md:rounded-[1rem] overflow-hidden shadow-2xl shadow-zinc-200'
            >
                <Image 
                    src="/banner-1.png" 
                    alt="Premium Catering Experience" 
                    fill
                    className="object-cover"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="hidden md:absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-lg">
                    <span className="text-white/60 text-xl md:text-2xl font-bold uppercase tracking-[0.4em] mb-3 block">Grand Excellence</span>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase leading-none">
                        Crafting <span className="text-red-600">Legendary</span> Events
                    </h2>
                </div>
            </motion.div>
        </div>
        
        {/* Process Section - Replaces the old Blocks */}
        <div className='w-full px-4 md:px-8 max-w-7xl mx-auto'>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div className="max-w-xl">
                    <span className="text-red-600 font-bold uppercase tracking-widest text-md mb-2 block">Our Workflow</span>
                    <h3 className="text-4xl md:text-6xl font-black text-zinc-950 uppercase tracking-tighter leading-none">
                        How <span className="text-red-500">Excellence</span> Happens
                    </h3>
                </div>
                <p className="md:hidden text-zinc-400 text-2xl md:text-3xl font-medium max-w-xs md:text-right"
                   style={{lineHeight: '0.9'}}
                >
                    Methodical approach to ensuring your culinary vision is realized with absolute precision.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
                {processSteps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="group relative flex flex-col p-8 rounded-[2.5rem] bg-zinc-50 border-2 border-zinc-200 hover:bg-white hover:border-red-300 transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/5 hover:-translate-y-2"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-600 mb-8 border border-zinc-50 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                            {typeof step.icon === 'string' ? (
                                <Image 
                                    src={step.icon} 
                                    alt={step.title} 
                                    width={24} 
                                    height={24} 
                                    className="transition-all duration-500 [filter:brightness(0)_saturate(100%)_invert(13%)_sepia(94%)_saturate(5436%)_hue-rotate(352deg)_brightness(83%)_contrast(105%)] group-hover:[filter:brightness(0)_invert(1)]"
                                />
                            ) : (
                                step.icon
                            )}
                        </div>
                        
                        <span className="text-4xl font-black text-zinc-500 group-hover:text-red-500 absolute top-8 right-8 transition-colors">
                            {step.id}
                        </span>

                        <h4 className="text-3xl font-black text-zinc-950 uppercase tracking-tighter mb-3 transition-colors group-hover:text-red-600">
                            {step.title}
                        </h4>
                        <p className="text-zinc-500 text-2xl font-medium leading-relaxed"
                           style={{lineHeight: '0.9'}}
                        >
                            {step.description}
                        </p>
                        
                        <div className="mt-8 h-1 w-0 bg-red-600 rounded-full transition-all duration-700 group-hover:w-16" />
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Banner