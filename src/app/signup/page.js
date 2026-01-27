'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Toast from '../../components/Toast';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    addresses: [''], // Initialize with one empty address
  });
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000';

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, value) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index] = value;
    setFormData({ ...formData, addresses: newAddresses });
  };

  const handleAddAddress = () => {
    if (formData.addresses.length < 3) {
      setFormData({ ...formData, addresses: [...formData.addresses, ''] });
    }
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = formData.addresses.filter((_, i) => i !== index);
    setFormData({ ...formData, addresses: newAddresses });
  };
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName || !formData.email || !formData.password) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          addresses: formData.addresses.filter(addr => addr.trim() !== ''),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto-login after signup (Email verification disabled)
        localStorage.setItem('wtf_token', data.token);
        localStorage.setItem('wtf_user', JSON.stringify(data.user));
        showToast('Account created successfully! 🎉', 'success');
        setTimeout(() => {
          router.push('/');
        }, 1500);

        // OTP FLOW (COMMENTED OUT)
        // setUserId(data.userId);
        // setStep(2);
        // showToast('OTP sent to your email!', 'success');
      } else {
        showToast(data.message || 'Signup failed', 'error');
      }
    } catch (error) {
      showToast('Network error. Please try again', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      showToast('Please enter a valid 6-digit OTP', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('wtf_token', data.token);
        localStorage.setItem('wtf_user', JSON.stringify(data.user));
        showToast('Email verified successfully! 🎉', 'success');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        showToast(data.message || 'Invalid OTP', 'error');
      }
    } catch (error) {
      showToast('Network error. Please try again', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast('OTP resent successfully!', 'success');
      } else {
        showToast(data.message || 'Failed to resend OTP', 'error');
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
          <p className="text-gray-600 font-bold text-lg">
            {step === 1 ? 'Create your account' : 'Verify your email'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
          {step === 1 ? (
            // Signup Form
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xl md:text-md text-gray-500 uppercase mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none placeholder:text-gray-400"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xl md:text-md text-gray-500 uppercase mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none placeholder:text-gray-400"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xl md:text-md text-gray-500 uppercase mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none placeholder:text-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-xl md:text-md text-gray-500 uppercase mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none placeholder:text-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>



              {/* Dynamic Address Fields */}
              <div className="space-y-3">
                <label className="block text-xl md:text-md text-gray-500 uppercase mb-2">
                  Addresses (Max 3)
                </label>
                {formData.addresses.map((address, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => handleAddressChange(index, e.target.value)}
                      className="w-full px-4 py-3 text-gray-500 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
                      placeholder={`Address ${index + 1}`}
                      required
                    />

                    {formData.addresses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAddress(index)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-bold text-xl"
                        title="Remove address"
                      >
                        ✕
                      </button>
                    )}

                    {index === formData.addresses.length - 1 && formData.addresses.length < 3 && (
                      <button
                        type="button"
                        onClick={handleAddAddress}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors font-bold text-xl"
                        title="Add another address"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white text-md rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          ) : (
            // OTP Verification Form
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">
                  We've sent a 6-digit code to
                  <br />
                  <span className="font-black text-gray-900">{formData.email}</span>
                </p>
              </div>

              <div>
                <label className="block text-gray-500 uppercase mb-2 text-center">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none font-black text-2xl text-center tracking-widest text-gray-800 placeholder:text-gray-400"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-lg rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="w-full py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-all"
              >
                Resend OTP
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-3 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition-all"
              >
                ← Back to Signup
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-red-600 font-black hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
