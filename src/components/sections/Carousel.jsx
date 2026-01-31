'use client'
import React from 'react'
import Image from 'next/image'

function Carousel() {
  const images = [
    '/corousel-1.png',
    '/corousel-2.png',
    'https://i.pinimg.com/736x/fa/3a/12/fa3a12f80bcfce27e40f6602dbc0ec4b.jpg',
    'https://i.pinimg.com/736x/30/42/ba/3042baa66f32ac00270e77c8ec8ff8f5.jpg',
    'https://i.pinimg.com/736x/26/24/b4/2624b46fbf64636d9359e8cd7b2251f4.jpg',
  ]

  return (
    <div className="w-full bg-black py-16 overflow-hidden">
      <div 
        className="flex animate-scroll items-center" 
        style={{ animationDuration: '10s' }}
      >
        {[...Array(100)].map((_, idx) => {
          const src = images[idx % images.length];
          return (
            <div
              key={`carousel-item-${idx}`}
              className="shrink-0 mx-2 md:mx-4"
            >
              <div className="ring-1 ring-red-500 rounded-lg overflow-hidden relative">
                <Image
                  src={src}
                  alt={`carousel-${idx + 1}`}
                  width={300}
                  height={200}
                  unoptimized
                  className="
                    object-cover block
                    w-[180px] h-[180px]
                    md:w-[300px] md:h-[300px]
                  "
                />
              </div>
            </div>
          );
        })}

      </div>
    </div>
  )
}

export default Carousel
