'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

function Carousel() {
  const [images, setImages] = useState([
    '/corousel-1.png',
    '/corousel-2.png',
    'https://i.pinimg.com/736x/fa/3a/12/fa3a12f80bcfce27e40f6602dbc0ec4b.jpg',
    'https://i.pinimg.com/736x/30/42/ba/3042baa66f32ac00270e77c8ec8ff8f5.jpg',
    'https://i.pinimg.com/736x/26/24/b4/2624b46fbf64636d9359e8cd7b2251f4.jpg',
  ]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/carousel`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setImages(data.map(item => item.image));
          }
        }
      } catch (error) {
        console.error("Failed to fetch carousel images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="w-full bg-black py-16 overflow-hidden">
      <div
        className="flex animate-scroll items-center space-x-4 md:space-x-8"
        style={{ animationDuration: '5s' }}
      >
        {/* Render images twice to create seamless loop effect */}
        {[...images, ...images].map((src, idx) => (
          <div
            key={`carousel-item-${idx}`}
            className="shrink-0"
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
        ))}
      </div>
    </div>
  )
}

export default Carousel
