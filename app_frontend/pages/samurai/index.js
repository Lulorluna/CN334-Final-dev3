'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SummarizePage() {
  const [orderData, setOrderData] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('orderData') || 'null');
    setOrderData(data);

    const id = `MOH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);

    const today = new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setOrderDate(today);
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-3xl font-bold animate-fade-in-down bg-[url('/images/bd.jpg')] bg-cover bg-center bg-fixed bg-no-repeat">
        <div className="bg-white/80 p-6 rounded-lg shadow-lg backdrop-blur-md">
          ไม่พบข้อมูลคำสั่งซื้อ
        </div>
      </div>
    );
  }

  const { cart, totalPrice, shipping, address, shippingMethod } = orderData;
  const grandTotal = totalPrice + shipping;

  return (
    <div className="relative flex flex-col min-h-screen bg-[url('/images/bd.jpg')] bg-cover bg-center bg-fixed bg-no-repeat">
      {/* Full-screen overlay */}
      <div className="fixed inset-0 bg-white/60 backdrop-blur-md z-0"></div>

      {/* Navbar (Unchanged) */}
      <header className="fixed top-0 w-full bg-[#fdf6e3] shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" width={40} height={40} alt="Logo" />
            <span className="font-bold text-gray-800">Meal of Hope</span>
          </Link>
          <nav className="flex gap-6">
            {['Home', 'About Us', 'Product'].map((text, idx) => {
              const href = text === 'Home' ? '/' : text === 'About Us' ? '/about' : '/product-list';
              return (
                <Link key={idx} href={href} className="relative text-gray-800 font-semibold group">
                  <span className="relative inline-block px-1">
                    {text}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              );
            })}
          </nav>
          <div className="flex gap-4">
            <Link href="/order" className="relative p-2 border rounded-full hover:bg-gray-100 transition">🛒</Link>
            <Link href="/login" className="bg-yellow-400 hover:bg-yellow-500 transition text-white font-bold px-4 py-2 rounded-full">Sign In</Link>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-20" />

      {/* Main content */}
      <main className="relative w-full max-w-6xl mx-auto py-16 px-8 animate-fade-in-down z-10">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-900 drop-shadow-lg tracking-tight">📦 ติดตามคำสั่งซื้อของคุณ</h1>

        {/* Order Info */}
        <div className="bg-white/90 p-10 rounded-3xl shadow-xl backdrop-blur-lg border border-white/40 space-y-10 transition-all duration-500 hover:shadow-2xl">
          <div className="text-gray-900 text-xl space-y-4">
            <p>รหัสคำสั่งซื้อ: <span className="font-bold text-yellow-600">{orderId}</span></p>
            <p>วันที่สั่งซื้อ: <span className="font-bold text-yellow-600">{orderDate}</span></p>
          </div>

          {/* Order Status Timeline */}
          <div className="relative flex items-center justify-between gap-6 mt-8">
            {[
              { label: 'ชำระเงินแล้ว', icon: '💳' },
              { label: 'เตรียมสินค้า', icon: '📦' },
              { label: 'จัดส่งแล้ว', icon: '🚚' },
              { label: 'สำเร็จ', icon: '✅' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center text-sm text-gray-800 relative z-10 group">
                <div className={`w-20 h-20 flex items-center justify-center rounded-full text-3xl font-bold transition-all duration-500 ${idx <= 1 ? 'bg-yellow-500 text-white shadow-md' : 'bg-gray-200 text-gray-600'} group-hover:scale-110`}>
                  {step.icon}
                </div>
                <span className="mt-4 font-semibold">{step.label}</span>
              </div>
            ))}
            <div className="absolute top-10 left-20 right-20 h-2 bg-gray-200/50 rounded-full">
              <div className="h-full bg-yellow-500 rounded-full w-1/2 transition-all duration-1000 ease-in-out"></div>
            </div>
          </div>

          <hr className="border-gray-200/50" />

          {/* Cart Details */}
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white/95 p-5 rounded-xl shadow-md border border-gray-100/50 transition-all duration-300 hover:bg-yellow-100/30 hover:shadow-lg hover:scale-[1.02]"
              >
                <Image
                  src={`/images/product-${item.id || index + 1}.jpg`}
                  width={100}
                  height={100}
                  alt={item.name}
                  className="rounded-2xl object-cover transition-transform duration-500 hover:scale-110 shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-xl">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm text-gray-600 font-medium">จำนวน:</span>
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-500 text-white text-sm font-bold rounded-full shadow">{item.quantity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-semibold text-xl">฿{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="text-right space-y-3 text-xl font-bold text-gray-900 pt-8 bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-xl shadow-inner">
            <p>รวมสินค้า: <span className="text-yellow-600">฿{totalPrice.toLocaleString()}</span></p>
            <p>ค่าจัดส่ง: <span className="text-yellow-600">฿{shipping}</span></p>
            <p className="text-3xl text-red-500">รวมทั้งหมด: ฿{grandTotal.toLocaleString()}</p>
          </div>

          <hr className="border-gray-200/50" />

          {/* Shipping Info */}
          <div className="text-gray-900 space-y-3 text-base">
            <p><span className="font-bold text-yellow-600">ที่อยู่จัดส่ง:</span> {address}</p>
            <p><span className="font-bold text-yellow-600">วิธีการจัดส่ง:</span> {shippingMethod}</p>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-12">
            <Link href="/product-list">
              <button className="bg-yellow-500 hover:bg-yellow-600 transition px-12 py-4 rounded-full text-white text-xl font-bold shadow-lg hover:shadow-yellow-600/50 transform hover:scale-105 animate-pulse-slow">
                🛍️ เลือกสินค้าเพิ่ม
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-800/90 py-10 w-full mt-auto border-t-4 border-yellow-500 z-10">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-yellow-500/20 to-transparent transform -skew-y-3"></div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-200 mb-8">
            <span className="text-lg font-semibold">Meal of Hope © 2025</span>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-200 hover:text-yellow-500 transition transform hover:scale-125">📘</a>
              <a href="#"운동 className="text-gray-200 hover:text-yellow-500 transition transform hover:scale-125">📸</a>
              <a href="#" className="text-gray-200 hover:text-yellow-500 transition transform hover:scale-125">🐦</a>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4].map((_, idx) => (
              <span key={idx} className="w-3 h-3 bg-yellow-500 rounded-full inline-block animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}></span>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="#" className="text-gray-200 hover:text-yellow-500 transition font-semibold">Back to top ↑</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}