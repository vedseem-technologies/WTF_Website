"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ServicesSkeleton() {
  const router = useRouter();

  const services = [
    {
      id: 1,
      name: "Franchise Model",
      image: "/block-1.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      bgColor: "bg-[#2A2A2A]",
      imagePos: "left",
    },
    {
      id: 2,
      name: "Catering Services",
      image: "/block-2.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      bgColor: "bg-[#351515]",
      imagePos: "right",
    },
    {
      id: 3,
      name: "Food Delivery",
      image: "/block-3.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      bgColor: "bg-[#2A2A2A]",
      imagePos: "left",
    },
    {
      id: 4,
      name: "Dining",
      image: "/block-4.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      bgColor: "bg-[#351515]",
      imagePos: "right",
    },
  ];

  
  return (
    <div className="min-h-screen bg-black py-16 md:py-20 px-4 md:px-8 lg:px-16 flex flex-col items-center">

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="
          z-10 bg-[#f8f0f0]
          px-6 md:px-10
          py-2 md:py-3
          rounded-2xl
          border-2 border-red-800/20
          shadow-xl
          mb-[-20px] md:mb-[-30px]
        "
      >
        <h2 className="text-red-700 text-3xl md:text-4xl font-bold tracking-tight">
          Our Multiple Services
        </h2>
      </motion.div>

      {/* Main Container */}
      <div className="w-full max-w-[95%] bg-[#151515] rounded-[2rem] py-16 md:py-28 border border-white/50 shadow-2xl relative overflow-hidden">

        <div className="flex flex-col gap-24 md:gap-28 mt-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={index === 1 ? "hover" : ""}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={{ hover: { scale: 1.01 } }}
              onClick={() => {
                if (index === 1) router.push("/services/catering");
              }}
              className={`
                relative w-full ${service.bgColor}
                py-6 md:py-0
                px-4 sm:px-6 md:px-10
                flex flex-col md:flex-row
                items-center
                gap-10 md:gap-16
                transition-all duration-300
                ${service.imagePos === "right" ? "md:flex-row-reverse" : ""}
                ${index === 1 ? "cursor-pointer" : ""}
              `}
            >
              {/* IMAGE */}
              <div className="relative w-full max-w-[220px] md:w-[220px] h-[270px] sm:h-[260px] md:h-[300px] flex-shrink-0">
                <div className="absolute -top-1/5 md:-top-1/4 inset-x-0 h-full rounded-2xl overflow-hidden border border-red-600 shadow-2xl">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* TEXT */}
              <div
                className={`
                  flex flex-col gap-2 -mt-10 lg:mt-0 lg:gap-4 flex-grow
                  items-center md:items-${service.imagePos === "right" ? "end" : "start"}
                  text-center md:text-${service.imagePos === "right" ? "right" : "left"}
                `}
              >
                <h3 className="text-[#f1c40f] text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
                  {service.name}
                </h3>

                <p
                  className="
                    text-white
                    text-2xl sm:text-3xl lg:text-4xl
                    leading-relaxed
                    opacity-90
                    max-w-2xl
                  "
                  style={{
                    lineHeight: "0.9",
                  }}
                >
                  {service.description}
                </p>
              </div>


            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesSkeleton;
