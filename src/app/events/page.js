'use client'
import React from 'react'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import Link from 'next/link'

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Food Festival 2026',
      date: 'February 15-17, 2026',
      location: 'Central Park, Delhi',
      description: 'Join us for a three-day celebration of flavors featuring live cooking demonstrations, food stalls, and culinary competitions.',
      type: 'Festival',
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Chef\'s Special Tasting Menu',
      date: 'January 28, 2026',
      location: 'Our Restaurant',
      description: 'An exclusive evening with our master chef showcasing a 7-course tasting menu featuring seasonal ingredients.',
      type: 'Tasting Event',
      status: 'Limited Seats'
    },
    {
      id: 3,
      title: 'Corporate Catering Showcase',
      date: 'February 5, 2026',
      location: 'Convention Center',
      description: 'Explore our corporate catering services with live menu presentations and customization options.',
      type: 'Showcase',
      status: 'Open for All'
    }
  ]

  const pastEvents = [
    {
      id: 1,
      title: 'New Year Celebration 2026',
      date: 'January 1, 2026',
      description: 'A grand celebration with special menu and live entertainment.',
      attendees: 200
    },
    {
      id: 2,
      title: 'Christmas Special Dinner',
      date: 'December 25, 2025',
      description: 'Traditional Christmas feast with family-style dining.',
      attendees: 150
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
              Events
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700">
              Join us for unforgettable culinary experiences
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-red-800 mb-8">
              Upcoming Events
            </h2>
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-gradient-to-r from-white to-red-50 p-8 rounded-2xl border-2 border-red-200 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                          {event.title}
                        </h3>
                        <span className="px-4 py-1 bg-red-800 text-white rounded-full text-lg font-semibold whitespace-nowrap">
                          {event.status}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center text-xl text-gray-700">
                          <svg className="w-5 h-5 mr-2 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {event.date}
                        </div>
                        <div className="flex items-center text-xl text-gray-700">
                          <svg className="w-5 h-5 mr-2 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                      </div>
                      <p className="text-xl text-gray-700 mb-4">
                        {event.description}
                      </p>
                      <span className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-lg font-semibold">
                        {event.type}
                      </span>
                    </div>
                    {/* <button className="px-8 py-3 bg-red-800 text-white rounded-full text-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap">
                      Register Now
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-red-800 mb-8">
              Past Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:shadow-lg transition-all"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {event.title}
                  </h3>
                  <div className="text-xl text-gray-600 mb-3">{event.date}</div>
                  <p className="text-xl text-gray-700 mb-4">{event.description}</p>
                  <div className="flex items-center text-lg text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    {event.attendees} Attendees
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-red-800 to-red-600 text-white p-12 rounded-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Want to Host an Event?
            </h2>
            <p className="text-2xl mb-6">
              Let us handle the catering for your special occasion
            </p>
            <Link href="/contact">
              <button className="px-10 py-4 bg-white text-red-800 rounded-full text-2xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
