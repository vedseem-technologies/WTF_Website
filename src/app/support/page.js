'use client'
import React, { useState } from 'react'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('faq')

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'You can place an order through our website by browsing the menu, adding items to cart, and proceeding to checkout. Alternatively, you can call us directly at +91 9818981438.'
    },
    {
      question: 'What are your delivery hours?',
      answer: 'We deliver from 11:00 AM to 11:00 PM daily. For catering services, we can accommodate special timing requirements with advance notice.'
    },
    {
      question: 'Do you cater for large events?',
      answer: 'Yes! We specialize in catering for weddings, corporate events, and large gatherings. Please contact us at least 7 days in advance for events with 50+ guests.'
    },
    {
      question: 'Can I customize my order?',
      answer: 'Absolutely! We offer customization options for most menu items. You can specify your preferences during checkout or call us for special requests.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Orders can be cancelled up to 2 hours before scheduled delivery for a full refund. Catering bookings require 48 hours notice for cancellation.'
    },
    {
      question: 'Do you accommodate dietary restrictions?',
      answer: 'Yes, we can accommodate various dietary needs including vegetarian, vegan, gluten-free, and allergen-free options. Please inform us when placing your order.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-red-800 mb-4">
              Support Center
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700">
              We're here to help you 24/7
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center border-2 border-red-200 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-2xl font-bold text-red-800 mb-2">Call Us</h3>
              <p className="text-xl text-gray-700">+91 9818981438</p>
              <p className="text-lg text-gray-600 mt-2">Available 24/7</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center border-2 border-red-200 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">✉️</div>
              <h3 className="text-2xl font-bold text-red-800 mb-2">Email Us</h3>
              <p className="text-xl text-gray-700">sileenafoods@gmail.com</p>
              <p className="text-lg text-gray-600 mt-2">Response within 24 hours</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center border-2 border-red-200 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-red-800 mb-2">Live Chat</h3>
              <p className="text-xl text-gray-700">Chat with our team</p>
              <button className="mt-2 px-6 py-2 bg-red-800 text-white rounded-full text-lg font-semibold hover:bg-red-700 transition-colors">
                Start Chat
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-8 py-3 rounded-full text-xl font-semibold transition-all ${
                activeTab === 'faq'
                  ? 'bg-red-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-8 py-3 rounded-full text-xl font-semibold transition-all ${
                activeTab === 'contact'
                  ? 'bg-red-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Contact Form
            </button>
          </div>

          {/* FAQ Section */}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-red-800 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-red-300 transition-all group"
                  >
                    <summary className="text-2xl font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                      {faq.question}
                      <svg
                        className="w-6 h-6 text-red-800 transform group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="text-xl text-gray-700 mt-4 pl-4 border-l-4 border-red-800"
                    style={{lineHeight: '0.9'}}
                    >
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Contact Form Section */}
          {activeTab === 'contact' && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-red-800 mb-8 text-center">
                Send Us a Message
              </h2>
              <form className="space-y-6 bg-white p-8 rounded-2xl border-2 border-gray-200">
                <div>
                  <label className="block text-2xl font-semibold text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-800"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-2xl font-semibold text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-800"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-2xl font-semibold text-gray-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-800"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-2xl font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-800"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-red-800 text-white rounded-full text-2xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}

          {/* Quick Links */}
          <div className="mt-16 bg-gray-50 p-12 rounded-3xl">
            <h2 className="text-4xl font-bold text-red-800 mb-8 text-center">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="px-6 py-3 bg-white text-red-800 rounded-xl border-2 border-red-200 hover:bg-red-800 hover:text-white transition-all text-lg font-semibold">
                Track Order
              </button>
              <button className="px-6 py-3 bg-white text-red-800 rounded-xl border-2 border-red-200 hover:bg-red-800 hover:text-white transition-all text-lg font-semibold">
                Return Policy
              </button>
              <button className="px-6 py-3 bg-white text-red-800 rounded-xl border-2 border-red-200 hover:bg-red-800 hover:text-white transition-all text-lg font-semibold">
                Payment Methods
              </button>
              <button className="px-6 py-3 bg-white text-red-800 rounded-xl border-2 border-red-200 hover:bg-red-800 hover:text-white transition-all text-lg font-semibold">
                Feedback
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
