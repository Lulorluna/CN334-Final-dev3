'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    account: { username: '', email: '', fullname: '', dateOfBirth: '', sex: '', telephone: '' },
    address: { receiverName: '', houseNumber: '', district: '', province: '', postcode: '' },
    history: { customer: '', status: '', totalPrice: '', createdAt: '' },
    payment: { method: '', cardNo: '', expired: '', holderName: '' },
  });
  const [backgroundImage, setBackgroundImage] = useState('/images/bg1.jpeg');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted for', activeTab, ':', formData[activeTab]);
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const navLinks = [
    { name: 'Account', href: '/profile', tab: 'account', active: activeTab === 'account' },
    { name: 'Address', href: '/address', tab: 'address', active: activeTab === 'address' },
    { name: 'History', href: '/history', tab: 'history', active: activeTab === 'history' },
    { name: 'Payment', href: '/payment', tab: 'payment', active: activeTab === 'payment' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-200 animate-gradient">
      {/* Background with Custom Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-0"></div>
      </div>

      {/* Background Upload */}
      <div className="relative z-10 p-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundUpload}
          className="bg-white/80 backdrop-blur-md p-2 rounded-lg border-2 border-amber-600 text-amber-800 font-semibold hover:bg-amber-100 transition-all duration-300"
        />
      </div>

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
      <div className="h-24" />

      {/* Main Content */}
      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-xl shadow-2xl rounded-r-3xl p-6 fixed h-[calc(100vh-200px-24px)] top-24 border-r-4 border-gradient-to-r from-yellow-400 to-amber-600 animate-fade-in-left">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-800 mb-8">My Account</h2>
          <nav className="space-y-4">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(link.tab)}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-500 w-full text-left transform hover:scale-105 hover:shadow-lg ${
                  link.active
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-xl'
                    : 'text-gray-700 hover:bg-yellow-100 hover:text-amber-800'
                }`}
              >
                <span className="text-xl">✨</span>
                <span className="font-semibold text-lg">{link.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Form Section */}
        <main className="flex-1 ml-64 p-8 animate-fade-in-right">
          <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border-2 border-gradient-to-r from-yellow-400 to-amber-600 transition-all duration-700 hover:shadow-3xl hover:scale-[1.01]">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-800 mb-10 uppercase tracking-widest">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'account' && (
                <>
                  {/* Username & Telephone (Side by Side) */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Username *</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.account.username}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Telephone *</label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.account.telephone}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Fullname */}
                  <div>
                    <label className="block text-sm text-amber-600 font-semibold mb-1">Fullname *</label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.account.fullname}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                    />
                  </div>

                  {/* Date of Birth & Sex (Side by Side) */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.account.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent appearance-none hover:shadow-md text-gray-800"
                      />
                    </div>
                    <div className="w-1/2 relative">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Sex *</label>
                      <select
                        name="sex"
                        value={formData.account.sex}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent appearance-none hover:shadow-md text-gray-800"
                      >
                        <option value="" disabled></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <span className="absolute right-4 top-12 text-gray-500 pointer-events-none">▼</span>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-amber-600 font-semibold mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.account.email}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                    />
                  </div>
                </>
              )}

              {activeTab === 'address' && (
                <>
                  {/* Receiver Name */}
                  <div>
                    <label className="block text-sm text-amber-600 font-semibold mb-1">Receiver Name *</label>
                    <input
                      type="text"
                      name="receiverName"
                      value={formData.address.receiverName}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                    />
                  </div>

                  {/* House Number & Postcode (Side by Side) */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">House Number *</label>
                      <input
                        type="text"
                        name="houseNumber"
                        value={formData.address.houseNumber}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Postcode *</label>
                      <input
                        type="text"
                        name="postcode"
                        value={formData.address.postcode}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                  </div>

                  {/* District & Province (Side by Side) */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">District *</label>
                      <input
                        type="text"
                        name="district"
                        value={formData.address.district}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Province *</label>
                      <input
                        type="text"
                        name="province"
                        value={formData.address.province}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'history' && (
                <>
                  {/* Customer & Created At (Side by Side) */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Customer *</label>
                      <input
                        type="text"
                        name="customer"
                        value={formData.history.customer}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Created At *</label>
                      <input
                        type="date"
                        name="createdAt"
                        value={formData.history.createdAt}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent appearance-none hover:shadow-md text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Status & Total Price (Side by Side) */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Status *</label>
                      <input
                        type="text"
                        name="status"
                        value={formData.history.status}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Total Price *</label>
                      <input
                        type="text"
                        name="totalPrice"
                        value={formData.history.totalPrice}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'payment' && (
                <>
                  {/* Method & Expired (Side by Side) */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Method *</label>
                      <input
                        type="text"
                        name="method"
                        value={formData.payment.method}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Expired *</label>
                      <input
                        type="month"
                        name="expired"
                        value={formData.payment.expired}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent appearance-none hover:shadow-md text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Card No & Holder Name (Side by Side) */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Card No *</label>
                      <input
                        type="text"
                        name="cardNo"
                        value={formData.payment.cardNo}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-amber-600 font-semibold mb-1">Holder Name *</label>
                      <input
                        type="text"
                        name="holderName"
                        value={formData.payment.holderName}
                        onChange={handleChange}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all duration-500 bg-transparent hover:shadow-md text-gray-800"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Change Password Link (only for Account tab) */}
              {activeTab === 'account' && (
                <div className="text-right">
                  <Link
                    href="/change-password"
                    className="text-amber-600 hover:text-amber-800 relative inline-block group"
                  >
                    Change Password
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-yellow-500 to-amber-600 group-hover:w-full transition-all duration-500"></span>
                  </Link>
                </div>
              )}

              {/* Save Button */}
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:shadow-amber-600/50 transition-all duration-500 transform hover:scale-110 animate-pulse-slow"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* Footer (Unchanged) */}
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
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}