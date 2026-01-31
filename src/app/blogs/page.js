'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
      image: '/images/biriyani.png',
      category: 'Recipes'
    },
    {
      id: 2,
      title: 'Catering Tips for Large Events',
      excerpt: 'Essential tips for planning and executing successful catering for weddings and corporate events.',
      date: 'January 15, 2026',
      image: 'https://i.pinimg.com/736x/85/9e/b5/859eb5992d2f74621fa57362531edeb0.jpg',
      category: 'Catering'
    },
    {
      id: 3,
      title: 'Street Food Culture in India',
      excerpt: 'Exploring the rich and diverse street food culture across different regions of India.',
      date: 'January 10, 2026',
      image: '/images/kabab.png',
      category: 'Food Culture'
    },
    {
      id: 4,
      title: 'Perfect Pizza Making Guide',
      excerpt: 'Learn how to make the perfect Italian pizza crust with our chef special recipe guide.',
      date: 'January 05, 2026',
      image: '/images/pizza.png',
      category: 'Recipes'
    },
    {
      id: 5,
      title: 'Healthy Dining Options',
      excerpt: 'Exploring healthy yet delicious dining options for fitness enthusiasts.',
      date: 'January 01, 2026',
      image: 'https://i.pinimg.com/1200x/36/03/42/3603429c48a30794ff2e3ad27278f4e8.jpg',
      category: 'Lifestyle'
    },
    {
      id: 6,
      title: 'The Franchise Model Success',
      excerpt: 'Understanding the key elements that make a food franchise successful in today market.',
      date: 'December 28, 2025',
      image: '/franshise-model.jpg',
      category: 'Business'
    }
  ]

  const [visibleBlogs, setVisibleBlogs] = React.useState(3)

  const loadMore = () => {
    setVisibleBlogs(prev => Math.min(prev + 3, blogs.length))
  }

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
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {blogs.slice(0, visibleBlogs).map((blog) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={blog.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 group cursor-pointer flex flex-col"
                >
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-4 py-1 bg-red-100 text-red-800 rounded-full text-lg font-semibold">
                        {blog.category}
                      </span>
                      <span className="text-gray-500 text-lg">{blog.date}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-red-800 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-xl text-gray-700 mb-4 line-clamp-3"
                       style={{lineHeight: '1.2'}}
                    >
                      {blog.excerpt}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {visibleBlogs < blogs.length && (
            <div className="text-center mt-12">
              <button 
                onClick={loadMore}
                className="px-10 py-4 bg-red-800 text-white rounded-full text-2xl font-semibold hover:bg-red-700 transition-colors shadow-lg active:scale-95 transform"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
