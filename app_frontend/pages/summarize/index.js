'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SummarizePage() {
  const [orderData, setOrderData] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

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
      <div className="min-h-screen flex justify-center items-center text-red-500 text-lg animate-fade-in-down">
        ไม่พบข้อมูลคำสั่งซื้อ
      </div>
    );
  }

  const { cart, totalPrice, shipping, address, shippingMethod } = orderData;
  const grandTotal = totalPrice + shipping;

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/wait.png')" }}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#fdf6e3] shadow-md z-50 animate-fade-in-down">
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
      <main className="w-full max-w-6xl mx-auto py-12 px-6 lg:px-10 animate-fade-in-down">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 drop-shadow-md">🎉 สรุปคำสั่งซื้อของคุณ 🎉</h1>

        <div className="bg-white/90 p-10 rounded-xl shadow-2xl backdrop-blur-md space-y-6">
          <div className="text-gray-800 space-y-1 text-lg">
            <p>รหัสคำสั่งซื้อ: <span className="font-bold">{orderId}</span></p>
            <p>วันที่สั่งซื้อ: <span className="font-bold">{orderDate}</span></p>
            <p>สถานะ: <span className="text-red-600 font-bold">กำลังรอชำระเงิน</span></p>
          </div>

          <hr className="border-gray-300" />

          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2 animate-slide-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-600">จำนวน: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p>฿{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray-300" />

          <div className="text-right space-y-1 text-xl font-bold text-gray-900">
            <p>รวมสินค้า: ฿{totalPrice.toLocaleString()}</p>
            <p>ค่าจัดส่ง: ฿{shipping}</p>
            <p className="text-red-600 text-2xl">รวมทั้งหมด: ฿{grandTotal.toLocaleString()}</p>
          </div>

          <hr className="border-gray-300" />

          <div className="text-gray-700 space-y-1 text-base">
            <p><span className="font-bold">ที่อยู่จัดส่ง:</span> {address}</p>
            <p><span className="font-bold">วิธีการจัดส่ง:</span> {shippingMethod}</p>
          </div>

          {/* Payment selection */}
          <div className="space-y-3 pt-4">
            <p className="font-bold text-lg text-gray-800">เลือกวิธีการชำระเงิน:</p>
            <div className="flex flex-wrap gap-4">
              {['บัตรเครดิต', 'บัตรเดบิต', 'ปลายทาง', 'QR Code'].map((method) => (
                <button
                  key={method}
                  className={`px-5 py-2 rounded-full border transition transform duration-300 ${
                    selectedPayment === method
                      ? 'bg-yellow-500 text-white scale-105 shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedPayment(method)}
                >
                  {method}
                </button>
              ))}
            </div>

            {selectedPayment === 'QR Code' && (
              <div className="mt-6 flex justify-center animate-zoom-in">
                <Image src="/images/qrcode.jpg" alt="QR Code" width={220} height={220} className="rounded-lg shadow-xl" />
              </div>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/product-list">
              <button className="bg-yellow-400 hover:bg-yellow-500 transition px-8 py-3 rounded-full text-white text-lg font-bold shadow-lg">
                🛍️ เลือกสินค้าเพิ่ม
              </button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6 w-full mt-auto">
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4].map((_, idx) => (
            <span key={idx} className="w-4 h-4 bg-gray-400 rounded-full inline-block"></span>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-gray-600">
          <span>About us</span>
          <a href="#" className="hover:underline mt-2 sm:mt-0">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}