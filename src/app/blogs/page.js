'use client'
import React from 'react'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import Image from 'next/image'

export default function BlogsPage() {
  const blogs = [
    {
      id: 1,
      title: 'The Art of Perfect Biryani',
      excerpt: 'Discover the secrets behind making the perfect biryani with authentic spices and techniques.',
      date: 'January 20, 2026',
      image: '/placeholder-blog1.jpg',
      category: 'Recipes'
    },
    {
      id: 2,
      title: 'Catering Tips for Large Events',
      excerpt: 'Essential tips for planning and executing successful catering for weddings and corporate events.',
      date: 'January 15, 2026',
      image: '/placeholder-blog2.jpg',
      category: 'Catering'
    },
    {
      id: 3,
      title: 'Street Food Culture in India',
      excerpt: 'Exploring the rich and diverse street food culture across different regions of India.',
      date: 'January 10, 2026',
      image: '/placeholder-blog3.jpg',
      category: 'Food Culture'
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
              Our Blogs
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700">
              Stories, recipes, and insights from our kitchen
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 group cursor-pointer"
              >
                <div className="relative h-64 bg-gradient-to-br from-red-100 to-red-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-red-800 text-xl font-semibold">
                    Blog Image
                  </div>
                  <div className="absolute inset-0 bg-red-800/0 group-hover:bg-red-800/10 transition-all"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-4 py-1 bg-red-100 text-red-800 rounded-full text-lg font-semibold">
                      {blog.category}
                    </span>
                    <span className="text-gray-500 text-lg">{blog.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-red-800 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-xl text-gray-700 mb-4"
                     style={{lineHeight: '0.9'}}
                  >
                    {blog.excerpt}
                  </p>
                  <button className="text-red-800 font-semibold text-xl hover:underline">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-10 py-4 bg-red-800 text-white rounded-full text-2xl font-semibold hover:bg-red-700 transition-colors shadow-lg">
              Load More Articles
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
