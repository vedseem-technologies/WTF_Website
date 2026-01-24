'use client'
import React from 'react'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-red-800 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: January 23, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">1. Introduction</h2>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                Welcome to our Privacy Policy. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website or use our services and tell you about your privacy rights.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">2. Information We Collect</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4" 
                 style={{lineHeight: '0.9'}}
              >
                We may collect, use, store and transfer different kinds of personal data about you:
              </p>
              <ul className="space-y-2 text-xl text-gray-700"
                 style={{lineHeight: '0.9'}}
              >
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Identity Data:</strong> Name, date of birth, gender
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Contact Data:</strong> Email address, telephone number, delivery address
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Transaction Data:</strong> Details about payments and orders
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Technical Data:</strong> IP address, browser type, device information
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Usage Data:</strong> Information about how you use our website and services
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Marketing Data:</strong> Your preferences for receiving marketing communications
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">3. How We Use Your Information</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4"
                 style={{lineHeight: '0.9'}}
              >
                We use your personal data for the following purposes:
              </p>
              <ul className="space-y-2 text-xl text-gray-700"
                 style={{lineHeight: '0.9'}}
              >
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  To process and deliver your orders
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  To manage payments, fees, and charges
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  To communicate with you about your orders and services
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  To improve our website and services
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  To send you marketing communications (with your consent)
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  To comply with legal obligations
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">4. Data Security</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4"
                 style={{lineHeight: '0.9'}}
              >
                We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                We use industry-standard encryption methods to protect sensitive data during transmission and storage.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">5. Data Retention</h2>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. Order and transaction data is typically retained for 7 years to comply with tax and legal obligations.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">6. Your Legal Rights</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4"
                 style={{lineHeight: '0.9'}}
              >
                Under data protection laws, you have the following rights:
              </p>
              <ul className="space-y-2 text-xl text-gray-700"
                 style={{lineHeight: '0.9'}}
              >
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Right to Access:</strong> Request access to your personal data
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Right to Correction:</strong> Request correction of inaccurate data
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Right to Erasure:</strong> Request deletion of your personal data
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Right to Object:</strong> Object to processing of your personal data
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Right to Restrict:</strong> Request restriction of processing
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Right to Data Portability:</strong> Request transfer of your data
                </li>
                <li className="flex items-start"
                   style={{lineHeight: '0.9'}}
                >
                  <span className="text-red-800 mr-2">•</span>
                  <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">7. Cookies</h2>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                Our website uses cookies to distinguish you from other users and to provide you with a better experience. Cookies are small text files that are placed on your device when you visit our website. You can set your browser to refuse all or some cookies, or to alert you when websites set or access cookies.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">8. Third-Party Links</h2>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">9. Children's Privacy</h2>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal data from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">10. Changes to Privacy Policy</h2>
              <p className="text-xl text-gray-700 leading-relaxed"
                 style={{lineHeight: '0.9'}}
              >
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date. You are advised to review this privacy policy periodically for any changes.
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4">11. Contact Us</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-4"
                 style={{lineHeight: '0.9'}}
              >
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-2 text-xl text-gray-700"
                 style={{lineHeight: '0.9'}}
              >
                <p><strong>Email:</strong> sileenafoods@gmail.com</p>
                <p><strong>Phone:</strong> +91 9818981438</p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-12 p-8 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border-2 border-red-200">
            <div className="flex items-start">
              <svg className="w-8 h-8 text-red-800 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-xl text-gray-700"
                 style={{lineHeight: '0.9'}}
              >
                Your privacy is important to us. We are committed to protecting your personal information and being transparent about how we use it. If you have any concerns, please don't hesitate to reach out to us.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
