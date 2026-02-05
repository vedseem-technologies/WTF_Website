"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/sections/Header";
import { Play } from "lucide-react";

/**
 * Robust helper to extract YouTube Video ID from various URL formats.
 * Handles:
 * - youtube.com/shorts/ID
 * - youtu.be/ID
 * - youtube.com/watch?v=ID
 * - youtube.com/embed/ID
 */
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

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

    // Safety check: if no videoId, don't attempt to init
    if (!videoId) return;

    const initPlayer = () => {
      // Prevent multiple initializations for same container
      if (playerRef.current) return;

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
      // Proper cleanup
      if (playerRef.current) {
        // We can't easily destroy the player instance if it's not exposed, 
        // but we can clear the ref. 
        // Note: YT.Player.destroy() might be available on player instance.
        try {
          // Check if destroy method exists on the player object if we kept a reference to it
          // usually playerRef.current is the internal iframe or object, the actual player instance 'player' variable inside closure
          if (player && typeof player.destroy === 'function') {
            player.destroy();
          }
        } catch (e) {
          console.error("Error destroying player", e);
        }
        playerRef.current = null;
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (isReady && playerRef.current && typeof playerRef.current.playVideo === 'function') {
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
        if (playerRef.current && typeof playerRef.current.isMuted === 'function') {
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

  // State Management as per Strict Requirements
  const [sourceReels, setSourceReels] = useState([]); // Unique list from API
  const [reels, setReels] = useState([]); // Growing list for infinite scroll
  const [loading, setLoading] = useState(true);

  // 1. Load YouTube API
  useEffect(() => {
    if (!document.getElementById(API_SCRIPT_ID)) {
      const tag = document.createElement("script");
      tag.id = API_SCRIPT_ID;
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // 2. Data Fetching
  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/youtube`);
        if (response.ok) {
          const data = await response.json();
          // Extract IDs and filter valid ones
          const extractedIds = data
            .map(item => getYouTubeVideoId(item.url))
            .filter(id => id !== null); // Remove nulls in case of bad URLs

          // Remove duplicates just in case API returns them, though requirements say unique list from API
          const uniqueIds = [...new Set(extractedIds)];

          if (uniqueIds.length > 0) {
            setSourceReels(uniqueIds);
            setReels(uniqueIds); // Initial populate
          }
        }
      } catch (error) {
        console.error("Failed to fetch reels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []); // Run ONCE

  // 3. Infinite Scroll Observer
  useEffect(() => {
    if (reels.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index"));
            setActiveIndex(index);

            // Infinite scroll logic: When reaching the last item
            if (index === reels.length - 1 && sourceReels.length > 0) {
              // Append original source list to the end
              setReels(prev => [...prev, ...sourceReels]);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    const elements = document.querySelectorAll(".short-section");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [reels, sourceReels]); // Re-attach when reels change (grown)

  return (
    <main className="bg-zinc-950 h-[100dvh] w-full relative overflow-hidden flex flex-col">

      {/* Main Header */}
      <Header />

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      >
        {loading ? (
          <div className="h-full w-full flex items-center justify-center bg-zinc-900">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
          </div>
        ) : reels.length === 0 ? (
          <div className="h-full w-full flex flex-col items-center justify-center bg-zinc-900 text-white gap-4">
            <Play className="w-16 h-16 text-zinc-700" />
            <p className="text-zinc-500 font-mono text-xl">No reels available</p>
          </div>
        ) : (
          <>
            {reels.map((id, index) => (
              <div
                key={`${id}-${index}`}
                data-index={index}
                className={`short-section h-[100dvh] w-full snap-start flex items-center justify-center pt-20 md:pt-24 pb-28 md:pb-8 ${index === activeIndex ? 'active' : ''}`}
              >
                <div className="relative w-full max-w-[450px] flex items-center justify-center md:px-4 h-full">
                  {/* Only render the player if it's close to active to save resources, but keep DOM node */}
                  {Math.abs(activeIndex - index) <= 2 && (
                    <YouTubeShort videoId={id} isActive={index === activeIndex} />
                  )}
                </div>
              </div>
            ))}
            {/* Loading Indicator at Bottom for infinite loop */}
            <div className="h-20 w-full flex items-center justify-center snap-start bg-transparent">
              <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          </>
        )}
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
