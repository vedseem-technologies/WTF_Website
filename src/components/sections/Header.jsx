"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navIcons = {
  Home: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M3 10L12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" fill="currentColor" />
    </svg>
  ),
  Menu: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  "Who We Are": (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <circle cx="12" cy="7" r="4" fill="currentColor" />
      <path d="M4 21c1-4 6-6 8-6s7 2 8 6" fill="currentColor" />
    </svg>
  ),
  Services: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" fill="currentColor" />
    </svg>
  ),
  Catering: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M4 6h16M6 6v14M18 6v14" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

const navButtonClass = (isActive) =>
  `relative z-10 flex items-center h-14 rounded-xl gap-4
   transition-colors duration-300 cursor-pointer
   ${isActive
    ? "bg-red-600 text-white shadow-xl shadow-red-600/30 scale-[1.03]"
    : "bg-white text-red-700 hover:bg-red-600 hover:text-white shadow-sm"
  }`;


function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // expanded / collapsed
  const [isHovering, setIsHovering] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    // { label: "Locations", href: "#locations" },
    { label: "Menu", href: "/menu" },
    { label: "Who We Are", href: "/about" },
    // { label: "Instagram", href: "https://instagram.com" },
    { label: "Services", href: "/services" },
    { label: "Catering", href: "/services/catering" },
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

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      if (y > lastY + 12) setSidebarOpen(false);
      if (y < lastY - 12) setSidebarOpen(true);

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      >

        {/* Mobile & Tablet Header */}
        <div className="lg:hidden w-full px-4 md:px-10 py-2 flex justify-between items-center bg-transparent backdrop-blur-sm">
          <Link href="/" className="transition-transform active:scale-95">
            <div className="flex items-center gap-3">
              <Image src="/Logo.png" alt="logo" width={80} height={40} className="w-auto h-12" style={{ width: "auto" }} />
            </div>
          </Link>

          <div className="flex items-center gap-4 ">
            {/* Mobile Social Icons */}
            <div className="flex gap-2 mr-2 absolute right-4 top-24">
              <Link href="#" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white active:scale-90 shadow-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white active:scale-90 shadow-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.134l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link href="https://www.instagram.com/rollx_bywtf" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white active:scale-90 shadow-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </Link>
            </div>

            <button
              className="w-10 h-10 flex flex-col items-center justify-center p-2 gap-1.5 border border-gray-500 rounded-full transition-all text"
              onClick={() => setIsOpen(true)}
            >
              <span className="w-5 h-0.5 bg-gray-500" />
              <span className="w-5 h-0.5 bg-gray-500" />
            </button>
          </div>
        </div>

        {/* Desktop Header Content (Logo & Socials) */}
        <div className="hidden lg:flex justify-between items-start px-12 py-6 pointer-events-none">
          {/* Logo */}
          <Link href="/" className="pointer-events-auto transition-transform active:scale-95">
            <Image src="/Logo.png" alt="logo" width={100} height={60} className="w-auto h-16"  />
          </Link>

          {/* Social Icons */}
          <div className="flex gap-4 pointer-events-auto">
            <Link href="#" className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-red-600 transition-all hover:scale-110 shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-red-600 transition-all hover:scale-110 shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.134l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link href="https://www.instagram.com/rollx_bywtf" className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-red-600 transition-all hover:scale-110 shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </Link>
          </div>
        </div>

        {/* AUTO COLLAPSING SIDEBAR – DESKTOP */}
        <motion.aside
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          animate={{
            width: sidebarOpen || isHovering ? 240 : 68,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 rounded-xs p-2 overflow-hidden"
        >
          <div className="relative flex flex-col gap-2 w-full">

            {/* ACTIVE ROUTE INDICATOR */}
            {/* <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-2 right-2 h-12 bg-red-600 rounded-2xl z-0"
              style={{
                top:
                  navItems.findIndex(i => i.href === pathname) * 52 + 12 || 12,
              }}
            /> */}

            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isExpanded = sidebarOpen || isHovering;

              return (
                <Link href={item.href} key={item.label}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.04 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`${navButtonClass(isActive)} transition-none ${isExpanded ? 'px-5 justify-start' : 'px-3 justify-center'}`}
                  >
                    {/* ICON BOX */}
                    <div
                      className={`w-9 h-9 p-2 flex items-center justify-center rounded-lg min-w-[36px]
                        ${isActive ? "bg-white/20" : "bg-red-50 text-red-600"}
                      `}
                    >
                      {navIcons[item.label]}
                    </div>

                    {/* LABEL */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xl font-bold font-mono tracking-tighter whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              );
            })}

            {/* PARTNER CTA */}
            <motion.a
              href="/partner"
              target="_blank"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 mt-4 bg-gradient-to-r from-yellow-400 to-red-600
                         text-white text-center py-3 rounded-2xl font-bold flex items-center justify-center"
            >
              {(sidebarOpen || isHovering) ? "Be a Partner" : "🤝"}
            </motion.a>
          </div>
        </motion.aside>

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
                  <Image src="/Logo.png" alt="logo" width={60} height={35} className="w-auto h-10 md:h-12 hover:cursor-pointer"/>
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
                <div className="p-6 md:px-12 md:pt-4 md:pb-8 pt-2 pb-4 flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Link className="bg-gradient-to-r from-yellow-400 to-red-500 text-center text-white py-2 md:py-3 rounded-xl text-2xl md:text-3xl dongle-regular uppercase tracking-[0.1em] border border-white/5 active:scale-95 transition-all" href="/partner">
                      Partner
                    </Link>
                  </div>
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
