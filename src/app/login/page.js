'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Toast from '../../components/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000';

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showToast('Please fill all fields', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('wtf_token', data.token);
        localStorage.setItem('wtf_user', JSON.stringify(data.user));
        showToast(`Welcome back, ${data.user.firstName}! 🎉`, 'success');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        if (data.needsVerification) {
          showToast('Please verify your email first', 'error');
          setTimeout(() => {
            router.push('/signup');
          }, 2000);
        } else {
          showToast(data.message || 'Login failed', 'error');
        }
      }
    } catch (error) {
      showToast('Network error. Please try again', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-white hover:shadow-lg transition-all active:scale-95 group"
      >
        <svg
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </button>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 italic mb-2">
            WTF
          </h1>
          <p className="text-gray-600 font-bold text-lg">Welcome back!</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-md text-gray-500 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-600 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none font-bold"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-md text-gray-500 uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-600 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none font-bold"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-2 border-gray-300 text-red-600 focus:ring-2 focus:ring-red-500"
                />
                <span className="text-xl text-gray-600">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-medium">
              Don't have an account?{' '}
              <Link href="/signup" className="text-red-600 font-black hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
