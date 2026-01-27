'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Event Planner",
    content: "The catering from Where's The Fork was the highlight of our corporate gala. The flavors were authentic, and the presentation was absolutely world-class.",
    rating: 5,
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rahul"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Food Blogger",
    content: "I've tried many places, but the French fries here are out of this world! Perfect crunch and seasoning. A must-visit for every food lover.",
    rating: 5,
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya"
  },
  {
    id: 3,
    name: "Vikram Mehta",
    role: "Business Owner",
    content: "Professional, punctual, and delicious. Their franchise model is so well-structured, it made my entry into the food industry seamless.",
    rating: 5,
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram"
  },
  {
    id: 4,
    name: "Ananya Iyer",
    role: "Frequent Guest",
    content: "The atmosphere and the food together create an experience you can't find elsewhere. The Roll-X variety is simply incredible!",
    rating: 5,
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ananya"
  }
]

const StarIcon = ({ filled }) => (
  <svg 
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-zinc-200"}`} 
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

function TestimonialCard({ testimony, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="bg-white p-8 rounded-[2rem] shadow-xl border border-zinc-100 flex flex-col gap-6 relative"
    >
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017V21H14.017ZM6.01703 21L6.01703 18C6.01703 16.8954 6.91244 16 8.01703 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.01703C7.46475 8 7.01703 8.44772 7.01703 9V12C7.01703 12.5523 6.56932 13 6.01703 13H5.01703V21H6.01703Z" />
        </svg>
      </div>

      <p className="dongle-regular text-2xl md:text-3xl text-zinc-600 italic leading-tight mt-4">
        "{testimony.content}"
      </p>

      <div className="mt-auto flex items-center gap-4 border-t border-zinc-100 pt-6">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-red-100">
          <Image 
            src={testimony.image} 
            alt={testimony.name}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-black text-xl text-zinc-900 uppercase tracking-tight">{testimony.name}</h4>
          <p className="text-red-600 font-bold text-lg leading-none">{testimony.role}</p>
          <div className="flex gap-1 mt-1">
            {[...Array(testimony.rating)].map((_, i) => <StarIcon key={i} filled={true} />)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Banner() {
  return (
    <section className="w-full bg-zinc-50 py-20 md:py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-600 font-bold uppercase tracking-[0.3em] text-lg mb-4"
          >
            Guest Experiences
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-cheddar text-5xl md:text-8xl text-zinc-950 uppercase leading-none mb-6"
          >
            What Our <span className="text-red-600">Guests</span> Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
              className="dongle-regular text-3xl md:text-4xl text-zinc-500 max-w-2xl leading-tight"
          >
            Hear from the people who have experienced the magic of Where's The Fork firsthand.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {testimonials.map((testimony, index) => (
            <TestimonialCard key={testimony.id} testimony={testimony} index={index} />
          ))}
        </div>

        {/* Brand Accent */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          viewport={{ once: true }}
          className="absolute -right-20 md:-right-20 top-40 pointer-events-none select-none overflow-hidden hidden md:block"
        >
          <h2 className="font-cheddar text-[10rem] md:text-[20rem] text-red-600 uppercase leading-none rotate-90 opacity-20">
            TESTIMONY
          </h2>
        </motion.div>
      </div>
    </section>
  )
}

export default Banner