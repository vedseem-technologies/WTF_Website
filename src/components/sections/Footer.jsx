'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="w-full bg-white pt-10 pb-24 md:pb-0 px-2 md:px-12">
      <div className="max-w-full mx-auto">
        {/* Desktop Layout: Original 5-column grid */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8 md:gap-12">
          {/* Logo and About/Contact Section */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center mb-6">
             <Image src="/Logo.png" alt="logo" width={120} height={50} />
            </div>

            {/* About Us */}
            <div className="mb-6">
              <h3 className="text-red-800 text-5xl font-bold">About Us</h3>
              <p className="text-black text-2xl">We deliver the food where flavor comes first</p>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-red-800 text-3xl font-bold mb-3">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center text-black text-2xl">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2">
                    <path d="M3.5 1C2.67 1 2 1.67 2 2.5V13.5C2 14.33 2.67 15 3.5 15H6.5L8 13.5H10L11.5 15H14.5C15.33 15 16 14.33 16 13.5V2.5C16 1.67 15.33 1 14.5 1H3.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 4H10M6 8H10M6 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>+91 9818981438</span>
                </div>
                <div className="flex items-center text-black text-2xl">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2">
                    <path d="M3 2C2.45 2 2 2.45 2 3V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V3C14 2.45 13.55 2 13 2H3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M2 4L8 9L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>sileenafoods@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-red-800 text-3xl font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-black text-2xl hover:text-red-800">About Us</Link></li>
              <li><Link href="/search" className="text-black text-2xl hover:text-red-800">More Search</Link></li>
              <li><Link href="/blogs" className="text-black text-2xl hover:text-red-800">Blogs</Link></li>
              <li><Link href="/testimonials" className="text-black text-2xl hover:text-red-800">Testimonials</Link></li>
              <li><Link href="/events" className="text-black text-2xl hover:text-red-800">Events</Link></li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h3 className="text-red-800 text-3xl font-bold mb-4">Helpful Links</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-black text-2xl hover:text-red-800">Services</Link></li>
              <li><Link href="/support" className="text-black text-2xl hover:text-red-800">Supports</Link></li>
              <li><Link href="/terms" className="text-black text-2xl hover:text-red-800">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-black text-2xl hover:text-red-800">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-red-800 text-3xl font-bold mb-4">Social links</h3>
            <div className="flex gap-4">
              {/* Instagram */}
              <Link href="https://www.instagram.com/rollx_bywtf?igsh=MW9vaGtjNXJoeHhrNg==" className="text-black hover:text-red-800">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </Link>
              {/* Twitter */}
              <Link href="https://twitter.com" className="text-black hover:text-red-800">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </Link>
              {/* Facebook */}
              <Link href="https://facebook.com" className="text-black hover:text-red-800">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout: Compact Modern Design */}
        <div className="lg:hidden">
          {/* Logo and About Us - Side by Side */}
          <div className="flex items-start justify-start gap-8 mb-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image src="/Logo.png" alt="logo" width={150} height={42} />
            </div>
            
            {/* About Us */}
            <div className="text-left md:text-center my-auto mx-auto">
              <h3 className="text-red-800 text-4xl md:text-5xl font-bold mb-1">About Us</h3>
              <p className="text-black text-2xl md:text-3xl leading-tight max-w-[200px] md:max-w-[550px]"
                 style={{
                   lineHeight: '0.8',
                 }}
              >
                We deliver the food where flavor comes first
              </p>
            </div>
          </div>

          {/* Contact Us - Compact Cards */}
          <div className="mb-4">
            <h3 className="text-red-800 text-4xl font-bold mb-3 text-center">Contact Us</h3>
            <div className="grid grid-cols-1 gap-2">
              {/* Phone */}
              <div className="bg-white rounded-xl p-2 border-2 border-red-50 shadow-sm">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-red-800">
                      <path d="M3.5 1C2.67 1 2 1.67 2 2.5V13.5C2 14.33 2.67 15 3.5 15H6.5L8 13.5H10L11.5 15H14.5C15.33 15 16 14.33 16 13.5V2.5C16 1.67 15.33 1 14.5 1H3.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M6 4H10M6 8H10M6 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-black text-xl font-medium">+91 9818981438</span>
                </div>
              </div>
              
              {/* Email */}
              <div className="bg-white rounded-xl p-2 border-2 border-red-50 shadow-sm">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-red-800">
                      <path d="M3 2C2.45 2 2 2.45 2 3V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V3C14 2.45 13.55 2 13 2H3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M2 4L8 9L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-black text-xl font-medium break-all">sileenafoods@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Links Section - 2 Column Condensed Grid */}
          <div className="grid grid-cols-2 gap-1 mb-4">
            {/* Information Links */}
            <div className="bg-gray-50/50 rounded-xl p-2 border border-gray-100">
              <h3 className="text-red-800 text-3xl font-bold mb-2">Information</h3>
              <ul className="space-y-0">
                <li><Link href="/about" className="text-black text-2xl hover:text-red-800 transition-colors block">About Us</Link></li>
                <li><Link href="/search" className="text-black text-2xl hover:text-red-800 transition-colors block">More Search</Link></li>
                <li><Link href="/blogs" className="text-black text-2xl hover:text-red-800 transition-colors block">Blogs</Link></li>
                <li><Link href="/testimonials" className="text-black text-2xl hover:text-red-800 transition-colors block">Testimonials</Link></li>
              </ul>
            </div>

            {/* Helpful Links */}
            <div className="bg-gray-50/50 rounded-xl p-2 border border-gray-100">
              <h3 className="text-red-800 text-3xl font-bold mb-2">Helpful Links</h3>
              <ul className="space-y-0">
                <li><Link href="/services" className="text-black text-2xl hover:text-red-800 transition-colors block">Services</Link></li>
                <li><Link href="/support" className="text-black text-2xl hover:text-red-800 transition-colors block">Supports</Link></li>
                <li><Link href="/terms" className="text-black text-2xl hover:text-red-800 transition-colors block">Terms</Link></li>
                <li><Link href="/privacy" className="text-black text-2xl hover:text-red-800 transition-colors block">Privacy</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Links - Compact Centered */}
          <div className="mb-">
            <h3 className="text-red-800 text-xl font-bold mb- text-center uppercase tracking-tight">Follow Us</h3>
            <div className="flex justify-center gap-4">
              {/* Instagram */}
              <Link 
                href="https://www.instagram.com/rollx_bywtf?igsh=MW9vaGtjNXJoeHhrNg==" 
                className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-800 hover:bg-red-800 hover:text-white transition-all shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </Link>
              {/* Twitter */}
              <Link 
                href="https://twitter.com" 
                className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-800 hover:bg-red-800 hover:text-white transition-all shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </Link>
              {/* Facebook */}
              <Link 
                href="https://facebook.com" 
                className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-800 hover:bg-red-800 hover:text-white transition-all shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section - Centered at bottom */}
        <div className="border-t border-gray-300 mt-4 pt-4 pb-4">
          <p className="text-center text-gray-600 text-xl md:text-2xl">
            © 2026 WTF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
