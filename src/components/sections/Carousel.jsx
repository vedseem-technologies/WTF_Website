'use client'
import React from 'react'
import Image from 'next/image'

function Carousel() {
  const images = [
    '/corousel-1.png',
    '/corousel-2.png',
    '/corousel-1.png',
    '/corousel-2.png',
    '/corousel-1.png',
    '/corousel-2.png',
  ]

  return (
    <div className="w-full bg-black py-16 overflow-hidden">
      <div className="flex animate-scroll items-center">
        {/* First set */}
        {images.map((src, index) => (
          <div
            key={`first-${index}`}
            className="shrink-0 mx-2 md:mx-4"
          >
            <div className="rounded-lg overflow-hidden">
              <Image
                src={src}
                alt={`carousel-${index + 1}`}
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
        ))}

        {/* Duplicate set */}
        {images.map((src, index) => (
          <div
            key={`second-${index}`}
            className="shrink-0 mx-2 md:mx-4"
          >
            <div className="border-4 border-red-500 rounded-lg overflow-hidden">
              <Image
                src={src}
                alt={`carousel-${index + 1}`}
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
        ))}
      </div>
    </div>
  )
}

export default Carousel
