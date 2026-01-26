"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/sections/Header";
import { Home, Utensils, Phone, User, Play, Menu, MessageCircle } from "lucide-react";

const YOUTUBE_SHORTS_IDS = [
  "P9ne1Q7oxl0",
  "gmvFXLMDgQA",
  "P9ne1Q7oxl0", // Cycling for demo
  "gmvFXLMDgQA",
];

const API_SCRIPT_ID = "youtube-iframe-api";

/**
 * YouTube Player Component
 */
const YouTubeShort = ({ videoId, isActive }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let player;
    
    const initPlayer = () => {
      player = new window.YT.Player(containerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          mute: 0,
          loop: 1,
          playlist: videoId, // Required for looping
          playsinline: 1,
          iv_load_policy: 3,
          cc_load_policy: 0,
          fs: 0,
          disablekb: 1,
        },
        events: {
          onReady: (event) => {
            playerRef.current = event.target;
            setIsReady(true);
            if (isActive) {
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            // Ensure loop works
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          }
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          initPlayer();
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }

    return () => {
      if (player && player.destroy) {
        player.destroy();
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (isReady && playerRef.current) {
      if (isActive) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isActive, isReady]);

  return (
    <div className="relative aspect-[9/16] h-full max-h-[750px] w-auto overflow-hidden rounded-[2rem] shadow-2xl bg-black transition-transform duration-500 active:scale-100 scale-95 border border-white/5">
         <div ref={containerRef} className="w-full h-full" />
         
         <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/30" />
         
         <div className="absolute inset-0 z-10 cursor-pointer" onClick={() => {
             if (playerRef.current) {
                 if (playerRef.current.isMuted()) {
                     playerRef.current.unMute();
                 } else {
                     playerRef.current.mute();
                 }
             }
         }} />
    </div>
  );
};

export default function ReelsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [reels, setReels] = useState(YOUTUBE_SHORTS_IDS);

  useEffect(() => {
    // Load YouTube API Script
    if (!document.getElementById(API_SCRIPT_ID)) {
      const tag = document.createElement("script");
      tag.id = API_SCRIPT_ID;
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index"));
            setActiveIndex(index);

            // Infinite scroll simulation
            if (index === reels.length - 1) {
                setReels(prev => [...prev, ...YOUTUBE_SHORTS_IDS]);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    const elements = document.querySelectorAll(".short-section");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [reels]);

  return (
    <main className="bg-zinc-950 h-[100dvh] w-full relative overflow-hidden flex flex-col">
  
      {/* Main Header */}
      <Header />
      
      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      >
        {reels.map((id, index) => (
          <div 
            key={`${id}-${index}`} 
            data-index={index} 
            className={`short-section h-[100dvh] w-full snap-start flex items-center justify-center pt-20 md:pt-24 pb-28 md:pb-8 ${index === activeIndex ? 'active' : ''}`}
          >
             <div className="relative w-full max-w-[450px] flex items-center justify-center md:px-4 h-full">
                <YouTubeShort videoId={id} isActive={index === activeIndex} />
             </div>
          </div>
        ))}

        {/* Loading Indicator at Bottom */}
        <div className="h-[100dvh] w-full flex items-center justify-center snap-start bg-zinc-900">
             <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
