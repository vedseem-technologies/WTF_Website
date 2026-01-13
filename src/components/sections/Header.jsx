"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Menu",
      href: "/menu",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 1) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center px-8 py-2 bg-black/30 border border-white/40 rounded-full mt-4 mx-4">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={80} height={50} />
          </Link>
        </div>
        <div className="flex gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.label}>
                <p
                  className={`px-3 py-1 rounded ${
                    isActive ? "bg-red-500 rounded-full px-4" : ""
                  }`}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="flex gap-8">
          <button>Be a Partner ?</button>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
