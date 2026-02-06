'use client'
import React, { useState, useEffect } from 'react'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import Link from 'next/link'
import axios from 'axios'

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`)
        const data = response.data.data || response.data
        if (Array.isArray(data)) {
          const events = data
          const upcoming = events.filter(e => e.status !== 'Past')
          const past = events.filter(e => e.status === 'Past')
          setUpcomingEvents(upcoming)
          setPastEvents(past)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming': return 'bg-green-800 text-white'
      case 'Limited Seats': return 'bg-yellow-600 text-white'
      case 'Open for All': return 'bg-blue-600 text-white'
      default: return 'bg-red-800 text-white'
    }
  }

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

          {loading ? (
            <div className="flex justify-center items-center h-64 mb-16">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-800"></div>
            </div>
          ) : (
            <>
              {/* Upcoming Events */}
              <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-red-800 mb-8">
                  Upcoming Events
                </h2>

                {upcomingEvents.length === 0 ? (
                  <p className="text-xl text-gray-600">No upcoming events scheduled at the moment. Stay tuned!</p>
                ) : (
                  <div className="space-y-6">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event._id || event.id}
                        className="bg-gradient-to-r from-white to-red-50 p-8 rounded-2xl border-2 border-red-200 hover:shadow-xl transition-all"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                                {event.title}
                              </h3>
                              <span className={`px-4 py-1 rounded-full text-lg font-semibold whitespace-nowrap ${getStatusColor(event.status)}`}>
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
                              {event.location && (
                                <div className="flex items-center text-xl text-gray-700">
                                  <svg className="w-5 h-5 mr-2 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {event.location}
                                </div>
                              )}
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
                )}
              </div>

              {/* Past Events */}
              <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-red-800 mb-8">
                  Past Events
                </h2>
                {pastEvents.length === 0 ? (
                  <p className="text-xl text-gray-600">No past events to display.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pastEvents.map((event) => (
                      <div
                        key={event._id || event.id}
                        className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:shadow-lg transition-all"
                      >
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                          {event.title}
                        </h3>
                        <div className="text-xl text-gray-600 mb-3">{event.date}</div>
                        <p className="text-xl text-gray-700 mb-4">{event.description}</p>
                        {/* Removed attendees count as it's not in the model */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* CTA Section */}
          {/* <div className="bg-gradient-to-r from-red-800 to-red-600 text-white p-12 rounded-3xl text-center">
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
          </div> */}
        </div>
      </main>

      <Footer />
    </div>
  )
}
