"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('id');
  const [loading, setLoading] = useState(true);

  // You can add logic here to verify status with backend if needed
  // or just show the success message.

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      const isMock = searchParams.get('mock_payment') === 'true';
      const status = searchParams.get('status');
      const paymentId = searchParams.get('payment_id') || `MOCK-${Date.now()}`;

      // Only verify if we have a success indicator
      if (isMock || status === 'success' || status === 'paid') {
        try {
          // Call backend to update status
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: orderId,
              paymentId: paymentId,
              status: 'success' // Force success for mock or if returned status is success
            })
          });
          const result = await response.json();
          if (result.success) {
            console.log("Payment verified successfully");
          }
        } catch (err) {
          console.error("Verification failed", err);
        }
      }
      setLoading(false);
    };

    verifyPayment();
  }, [orderId, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 font-dongle">
      <div className="max-w-md w-full bg-red-50 rounded-3xl p-8 text-center border border-red-100 shadow-xl">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-2 leading-none">Order Placed!</h1>
        <p className="text-2xl text-gray-600 mb-8">
          Thank you for choosing WTF. Your order has been successfully placed.
        </p>

        {orderId && (
          <div className="bg-white rounded-xl p-4 mb-8 border border-gray-100">
            <p className="text-xl text-gray-500 uppercase tracking-wide">Order ID</p>
            <p className="text-3xl font-bold text-gray-900">{orderId}</p>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/orders"
            className="block w-full bg-red-600 text-white rounded-xl py-3 text-2xl font-bold hover:bg-red-700 transition-colors"
          >
            Track Order
          </Link>
          <Link
            href="/"
            className="block w-full bg-white text-gray-600 rounded-xl py-3 text-2xl font-bold border-2 border-transparent hover:border-gray-200 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
