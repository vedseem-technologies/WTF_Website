"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { label: "Menu", href: "/menu", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label: "Services", href: "/services", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "About", href: "/about", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Catering", href: "/services/catering", icon: "M12 15h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    // { label: "Reels", href: "/reels", icon: "M14.75 6.25L10 9l4.75 2.75V6.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" },
    // { label: "Contact", href: "/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ];

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('wtf_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Hide / show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('wtf_token');
    localStorage.removeItem('wtf_user');
    setUser(null);
    setShowProfileMenu(false);
    window.location.href = '/';
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isVisible ? "lg:translate-y-0" : "lg:-translate-y-full"
          }`}
      >
        {/* Mobile & Tablet Header: Flat, Full-width, Minimal */}
        <div className="lg:hidden w-full px-4 md:px-10 py-2 md:py-2 flex justify-between items-center bg-black/5 backdrop-blur-sm">
          <Link href="/" className="transition-transform active:scale-95">
            <div className="flex items-center gap-3">
              <Image src="/Logo.png" alt="logo" width={100} height={50} className="w-auto h-12 md:h-16 bg-black/10 p-1.5 rounded-xl border border-white/10" />
            </div>
          </Link>

          <button
            className="w-10 h-10 md:w-14 md:h-14 flex flex-col items-center bg-black/20 justify-center border border-white/10 p-3 rounded-full gap-1.5 transition-all hover:bg-black/40"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-5 md:w-7 h-0.5 bg-white" />
            <span className="w-5 md:w-7 h-0.5 bg-white" />
          </button>
        </div>

        {/* Desktop Header: Premium Floating Capsule */}
        <div className="hidden lg:block mx-auto max-w-full mt-6 px-4">
          <div className="relative flex justify-between items-center px-8 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
            {/* Logo */}
            <Link href="/" className="transition-transform active:scale-95">
              <Image src="/Logo.png" alt="logo" width={70} height={40} className="w-auto h-10" />
            </Link>

            {/* Desktop Nav */}
            <div className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link href={item.href} key={item.label}>
                    <p
                      className={`px-5 py-1 rounded-full text-2xl font-semibold transition-all duration-300 ${isActive
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Buttons */}
            <div className="flex items-center gap-6">
              <Link href="https://wtf-foods.vercel.app/">
                <button
                  className="
                  relative text-3xl font-semibold
                  bg-gradient-to-r from-yellow-400 to-red-500
                  bg-clip-text text-transparent
                  transition-all duration-300 ease-out
              
                  hover:text-white
                  hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]
                  hover:scale-[1.05]
                  hover:cursor-pointer
              
                  after:content-['']
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0
                  after:bg-gradient-to-r after:from-yellow-400 after:to-red-500
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
                >
                  Be a Partner ?
                </button>
              </Link>

           
           
              
            </div>
          </div>
        </div>
      </div>

      {/* MINIMAL MOBILE & TABLET DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Cinematic Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
              onClick={() => setIsOpen(false)}
            />

            {/* Professional Minimal Top Drawer */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="fixed top-0 left-0 right-0 w-full bg-zinc-950/95 backdrop-blur-3xl z-[70] flex flex-col overflow-hidden border-b border-white/5 md:h-fit md:rounded-b-[4rem] md:shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            >
              <div className="max-w-7xl mx-auto w-full flex flex-col">
                {/* Header inside Drawer */}
                <div className="px-6 md:px-12 py-2 flex items-center justify-between border-b border-white/5">
                  <Image src="/Logo.png" alt="logo" width={60} height={35} className="w-auto h-10 md:h-12" />
                  <button
                    className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full text-white/50 hover:text-white transition-all active:scale-95"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-8 md:h-8">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Minimal Navigation List */}
                <div className="flex flex-col px-6 md:px-12 py-6 md:py-8">
                  {navItems
                    .filter(item => !["Home", "Menu", "Catering", "Reels"].includes(item.label))
                    .map((item, index) => {
                      const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between py-2 md:py-4 border-b border-white/[0.03] group"
                        >
                          <span className={`text-3xl md:text-4xl dongle-regular tracking-tight transition-colors ${isActive ? "text-red-600" : "text-white/60 group-hover:text-white"
                            }`}>
                            {item.label}
                          </span>
                          {isActive && (
                            <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 bg-red-600 rounded-full" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Primary Actions Footer */}
                <div className="p-6 md:px-12 md:pt-4 md:pb-8 pt-2 pb-4 md:gap-8 grid grid-cols-2 gap-4">
                  {/* <Link className="bg-white text-black py-2 md:py-3 rounded-xl text-2xl md:text-3xl text-center dongle-regular uppercase tracking-[0.1em] active:scale-95 transition-all" href="/login">
                    Login
                  </Link> */}
                  <Link className="bg-gradient-to-r from-yellow-400 to-red-500 text-center text-white py-2 md:py-3 rounded-xl text-2xl md:text-3xl dongle-regular uppercase tracking-[0.1em] border border-white/5 active:scale-95 transition-all" href="/partner">
                    Partner
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
