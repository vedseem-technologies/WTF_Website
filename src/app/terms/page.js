'use client'
import React from 'react'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-red-800 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: January 23, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                By accessing and using our services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">2. Use of Services</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4"
                 style={{lineHeight: '0.9'}}
              >
                Our services include food delivery, catering, and event planning. You agree to:
              </p>
              <ul className="space-y-2 text-xl text-gray-700"
                 style={{lineHeight: '0.9'}}
              >
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  Provide accurate and complete information when placing orders
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  Use our services only for lawful purposes
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  Not misuse or attempt to gain unauthorized access to our systems
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  Comply with all applicable laws and regulations
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">3. Orders and Payment</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4"
                 style={{lineHeight: '0.9'}}
              >
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason.
              </p>
              <ul className="space-y-2 text-xl text-gray-700"
                 style={{lineHeight: '0.9'}}
              >
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  Prices are subject to change without notice
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  Payment must be made at the time of order or delivery as specified
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  We accept various payment methods including cash, cards, and digital wallets
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  All transactions are processed securely
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">4. Delivery and Catering</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4"
                 style={{lineHeight: '0.9'}}
              >
                Delivery times are estimates and may vary based on traffic, weather, and other factors.
              </p>
              <ul className="space-y-2 text-xl text-gray-700"
                 style={{lineHeight: '0.9'}}
              >
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  Delivery charges may apply based on distance and order value
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  Catering services require advance booking (minimum 7 days for large events)
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  Special dietary requirements must be communicated at the time of booking
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  Setup and cleanup services are available for catering events
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">5. Cancellation and Refunds</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4"
                 style={{lineHeight: '0.9'}}
              >
                Cancellation and refund policies vary based on the type of service:
              </p>
              <ul className="space-y-2 text-xl text-gray-700"
                 style={{lineHeight: '0.9'}}
              >
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Delivery Orders:</strong> Can be cancelled up to 2 hours before scheduled delivery for full refund
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Catering Bookings:</strong> Require 48 hours notice for full refund
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Partial Refunds:</strong> May be issued for late cancellations at our discretion
                </li>
                <li className="flex items-start">
                  <span className="text-red-800 mr-2">•</span>
                  Refunds will be processed within 7-10 business days
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">6. Food Safety and Quality</h2>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                We maintain the highest standards of food safety and hygiene. All our food is prepared in certified kitchens following strict quality control measures. However, we cannot guarantee that our food will be suitable for individuals with specific allergies or dietary restrictions unless specifically discussed and confirmed.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">7. Liability</h2>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                While we strive to provide the best service, we are not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the specific order or service in question.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">8. Privacy and Data Protection</h2>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                We respect your privacy and protect your personal information. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your data.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">9. Modifications to Terms</h2>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">10. Contact Information</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4"
                 style={{lineHeight: '0.9'}}
              >
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="space-y-2 text-xl text-gray-700"
                 style={{lineHeight: '0.9'}}
              >
                <p><strong>Email:</strong> sileenafoods@gmail.com</p>
                <p><strong>Phone:</strong> +91 9818981438</p>
              </div>
            </div>
          </div>

          {/* Agreement Box */}
          <div className="mt-12 p-8 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border-2 border-red-200">
            <p className="text-xl text-gray-700 text-center"
               style={{lineHeight: '0.9'}}
            >
              By using our services, you acknowledge that you have read and understood these Terms & Conditions and agree to be bound by them.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
