"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  // Handle Mock Payment or Direct Success Redirects
  useEffect(() => {
    const checkPaymentRedirect = async () => {
      const isMock = searchParams.get('mock_payment') === 'true';
      const statusParam = searchParams.get('status');

      // If valid success indicator is present
      if ((isMock || statusParam === 'success' || statusParam === 'paid') && orderId) {
        console.log("💳 Payment Redirect Detected:", { isMock, statusParam, orderId });

        try {
          // Call backend to Confirm Payment
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: orderId,
              paymentId: isMock ? `MOCK-${Date.now()}` : searchParams.get('payment_id'),
              status: 'success'
            })
          });

          const result = await response.json();
          console.log("✅ Verification Response:", result);

          if (result.success) {
            // Refresh order status immediately
            fetchOrder();
          }
        } catch (error) {
          console.error("❌ Verification Request Failed:", error);
        }
      }
    };

    if (orderId) {
      checkPaymentRedirect();
    }
  }, [orderId, searchParams]);

  const fetchOrder = async () => {
    if (!orderId) {
      console.log("⚠️ No Order ID found in URL");
      setError('No Order ID found');
      setLoading(false);
      return;
    }

    try {
      // setLoading(true); // Don't reset loading on poll to avoid flicker
      console.log(`🔄 Fetching Order Status: ${orderId}...`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${orderId}`);
      const data = await response.json();

      console.log("📦 Order Data Received:", data);

      if (data.success) {
        setOrder(data.data);
      } else {
        console.error("❌ Failed to fetch order:", data.message);
        setError(data.message || 'Failed to fetch order');
      }
    } catch (err) {
      console.error("❌ Network Error fetching order:", err);
      setError('Network error while checking order status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // Poll every 5 seconds if status is pending
    const interval = setInterval(() => {
      if (order && (order.paymentStatus === 'pending' || order.status === 'pending')) {
        console.log("⏳ Order still pending, polling again...");
        fetchOrder();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [orderId]); // Dependency on orderId only triggers initial fetch, interval handles updates

  const retryPayment = async () => {
    // Redirect to backend initiate endpoint again or similar logic
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/payment/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderId })
      });
      const data = await response.json();
      if (data.success && data.data.paymentLink) {
        window.location.href = data.data.paymentLink;
      } else {
        alert("Failed to retry payment");
      }
    } catch (e) {
      alert("Error retrying payment");
    }
  }


  if (loading && !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-dongle">
        <p className="text-3xl text-gray-500 animate-pulse">Checking order status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 font-dongle">
        <div className="text-center p-8 bg-red-50 rounded-3xl border border-red-100">
          <h1 className="text-4xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-2xl text-gray-600 mb-6">{error}</p>
          <Link href="/" className="px-6 py-2 bg-gray-800 text-white rounded-xl text-xl">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const isPaid = order?.paymentStatus === 'paid';
  const isFailed = order?.paymentStatus === 'failed';
  const isPending = order?.paymentStatus === 'pending';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 font-dongle">
      <div className={`max-w-md w-full rounded-3xl p-8 text-center border shadow-xl ${isPaid ? 'bg-green-50 border-green-100' : isFailed ? 'bg-red-50 border-red-100' : 'bg-yellow-50 border-yellow-100'
        }`}>

        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${isPaid ? 'bg-green-100 text-green-600' : isFailed ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
          }`}>
          {isPaid ? (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : isFailed ? (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-12 h-12 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
        </div>

        <h1 className={`text-5xl font-bold mb-2 leading-none ${isPaid ? 'text-green-800' : isFailed ? 'text-red-800' : 'text-yellow-800'
          }`}>
          {isPaid ? 'Order Placed!' : isFailed ? 'Payment Failed' : 'Processing...'}
        </h1>

        <p className="text-2xl text-gray-600 mb-8">
          {isPaid
            ? "Your payment was successful and your order is confirmed."
            : isFailed
              ? "We couldn't process your payment. Please try again."
              : "We are verifying your payment. Please wait."}
        </p>

        {order && (
          <div className="bg-white/60 rounded-xl p-4 mb-8 border border-gray-200/50 text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-xl text-gray-500 font-bold">Order ID</span>
              <span className="text-xl font-bold text-gray-900">{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl text-gray-500 font-bold">Amount</span>
              <span className="text-xl font-bold text-gray-900">₹{order.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl text-gray-500 font-bold">Status</span>
              <span className={`text-xl font-bold capitalize ${isPaid ? 'text-green-600' : isFailed ? 'text-red-600' : 'text-yellow-600'
                }`}>{order.paymentStatus}</span>
            </div>
            {order.paymentMethod && (
              <div className="flex justify-between">
                <span className="text-xl text-gray-500 font-bold">Payment Method</span>
                <span className="text-xl font-bold text-gray-900 capitalize">{order.paymentMethod}</span>
              </div>
            )}
            {order.zohoPaymentId && (
              <div className="flex justify-between">
                <span className="text-xl text-gray-500 font-bold">Payment ID</span>
                <span className="text-xl font-bold text-gray-900 text-sm">{order.zohoPaymentId}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-xl text-gray-500 font-bold">Date</span>
              <span className="text-xl font-bold text-gray-900">
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {isFailed && (
            <button
              onClick={retryPayment}
              className="block w-full bg-red-600 text-white rounded-xl py-3 text-2xl font-bold hover:bg-red-700 transition-colors"
            >
              Retry Payment
            </button>
          )}

          {/* {(isPaid || isPending) && (
            <Link
              href="/orders"
              className="block w-full bg-red-600 text-white rounded-xl py-3 text-2xl font-bold hover:bg-red-700 transition-colors"
            >
              Track Order
            </Link>
          )} */}

          <div className="flex gap-2">
            <button
              onClick={fetchOrder}
              className="flex-1 bg-gray-100 text-gray-600 rounded-xl py-3 text-2xl font-bold hover:bg-gray-200 transition-colors"
            >
              Refresh
            </button>
            <Link
              href="/"
              className="flex-1 bg-white text-gray-600 rounded-xl py-3 text-2xl font-bold border-2 border-transparent hover:border-gray-200 transition-colors text-center"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
