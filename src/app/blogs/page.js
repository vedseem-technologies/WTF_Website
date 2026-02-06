'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import Image from 'next/image'

export default function BlogsPage() {
  const [blogs, setBlogs] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [visibleBlogs, setVisibleBlogs] = React.useState(3)

  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/getblogs`);
        if (response.ok) {
          const result = await response.json();
          const data = result.data || result; // Handle paginated object or direct array

          if (Array.isArray(data)) {
            const mappedBlogs = data.map(blog => ({
              id: blog._id,
              title: blog.title,
              excerpt: blog.description,
              date: new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              image: blog.image,
              category: blog.blogType
            }));
            setBlogs(mappedBlogs);
          }
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [])

  const loadMore = () => {
    setVisibleBlogs(prev => Math.min(prev + 3, blogs.length))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-800"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-red-800 mb-4">
              Our Blogs
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700">
              Stories, recipes, and insights from our kitchen
            </p>
          </div>

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
                      style={{ lineHeight: '1.2' }}
                    >
                      {blog.excerpt}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

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
