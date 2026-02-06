'use client'
import React, { useState, useEffect } from 'react'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import axios from 'axios'

export default function TestimonialsPage() {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [reviewForm, setReviewForm] = useState({
    name: '',
    role: '',
    email: '',
    reviewText: ''
  })

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonials`)
      const data = response.data.data || response.data
      if (Array.isArray(data)) {
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Map frontend form to backend model
    const payload = {
      name: reviewForm.name,
      role: reviewForm.role || 'Customer', // Default if empty
      text: reviewForm.reviewText,
      rating: reviewForm.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),

      // Email is collected but not stored in public testimonial model usually, 
      // or backend doesn't schema it yet. We'll ignore email for the payload 
      // unless backend adds it. The current backend model has: name, role, text, rating, date, image.
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/testimonials`, payload)
      alert('Thank you for your review! It has been submitted.')
      setShowReviewModal(false)
      setReviewForm({ name: '', role: '', email: '', rating: 5, reviewText: '' })
      fetchTestimonials() // Refresh list
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
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
              Customer Testimonials
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700">
              What our valued customers say about us
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center border-2 border-red-200">
              <div className="text-5xl font-bold text-red-800 mb-2">{Math.max(500, testimonials.length)}+</div>
              <div className="text-2xl text-gray-700">Happy Customers</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center border-2 border-red-200">
              <div className="text-5xl font-bold text-red-800 mb-2">4.9/5</div>
              <div className="text-2xl text-gray-700">Average Rating</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center border-2 border-red-200">
              <div className="text-5xl font-bold text-red-800 mb-2">100+</div>
              <div className="text-2xl text-gray-700">Events Catered</div>
            </div>
          </div>

          {/* Testimonials Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-800"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id || testimonial.id}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100"
                >
                  {/* Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-xl text-gray-700 mb-6 italic"
                    style={{ lineHeight: '1.4' }}
                  >
                    "{testimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div className="border-t pt-4">
                    <div className="font-bold text-2xl text-gray-900">{testimonial.name}</div>
                    <div className="text-lg text-red-800">{testimonial.role}</div>
                    <div className="text-lg text-gray-500 mt-1"
                      style={{ lineHeight: '0.9' }}
                    >
                      {testimonial.date}
                    </div>
                  </div>
                </div>
              ))}
              {testimonials.length === 0 && (
                <div className="col-span-full text-center text-gray-500 text-xl">
                  No testimonials found. Be the first to review!
                </div>
              )}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-red-800 to-red-600 text-white p-12 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Share Your Experience</h2>
            <p className="text-2xl mb-6">We'd love to hear from you!</p>
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-10 py-4 bg-white text-red-800 rounded-full text-2xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Write a Review
            </button>
          </div>
        </div>
      </main>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
            >
              ×
            </button>

            {/* Modal Header */}
            <h2 className="text-4xl md:text-5xl font-bold text-red-800 mb-6">
              Write a Review
            </h2>

            {/* Review Form */}
            <form
              onSubmit={handleSubmitReview}
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label className="block text-2xl font-semibold text-gray-900 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  className="w-full px-4 py-3 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-800"
                  placeholder="Enter your name"
                />
              </div>

              {/* Role/Occasion (Added field) */}
              <div>
                <label className="block text-2xl font-semibold text-gray-900 mb-2">
                  Occasion Type <span className="text-gray-500 font-normal text-lg">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={reviewForm.role}
                  onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                  className="w-full px-4 py-3 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-800"
                  placeholder="e.g. Wedding, Birthday"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-2xl font-semibold text-gray-900 mb-2">
                  Email Address <span className="text-gray-500 font-normal text-lg">(Private)</span> *
                </label>
                <input
                  type="email"
                  required
                  value={reviewForm.email}
                  onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                  className="w-full px-4 py-3 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-800"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-2xl font-semibold text-gray-900 mb-2">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-10 h-10 ${star <= reviewForm.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          } transition-colors`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-3 text-xl text-gray-600 self-center">
                    ({reviewForm.rating} star{reviewForm.rating !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-2xl font-semibold text-gray-900 mb-2">
                  Your Review *
                </label>
                <textarea
                  required
                  rows={6}
                  value={reviewForm.reviewText}
                  onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                  className="w-full px-4 py-3 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-800"
                  placeholder="Share your experience with us..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-8 py-4 bg-red-800 text-white rounded-full text-2xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setShowReviewModal(false)}
                  className="px-8 py-4 bg-gray-200 text-gray-700 rounded-full text-2xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
