'use client';

import { useState } from 'react';
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
    <div className="flex flex-col min-h-screen bg-[#fdf6e3] animate-fade-in">
      {/* Background with Custom Image or Gradient */}
      <div
        className="fixed inset-0 bg-cover bg-center transition-opacity duration-300 z-0"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : 'linear-gradient(to bottom, #f4d03f, #fdf6e3)',
        }}
      >
        <div className="absolute inset-0 bg-[#8b4513]/10"></div>
      </div>

      {/* Background Upload */}
      <div className="relative z-10 p-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundUpload}
          className="p-2 border border-[#8b4513] rounded bg-[#fff8e1] text-[#8b4513] file:bg-[#f4d03f] file:text-[#8b4513] file:border-none file:rounded file:px-4 file:py-2"
        />
      </div>

      {/* Navbar */}
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
            <Link href="/order" className="relative p-2 border rounded-full hover:bg-gray-100 transition-colors duration-200 ease-in-out">🛒</Link>
            <Link href="/login" className="bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 ease-in-out text-white font-bold px-4 py-2 rounded-full">Sign In</Link>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="flex flex-1 relative z-10 pt-24 pb-32">
        {/* Sidebar */}
        <aside className="w-64 bg-[#fff8e1] p-6 fixed h-[calc(100vh-6rem)] top-24 border-r border-[#8b4513]/30">
          <h2 className="text-2xl font-semibold text-[#8b4513] mb-6">My Account</h2>
          <nav className="space-y-3">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(link.tab)}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                  link.active
                    ? 'bg-[#f4d03f] text-[#8b4513] font-semibold'
                    : 'text-[#8b4513] hover:bg-[#f4d03f]/50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Form Section */}
        <main className="flex-1 ml-64 p-6">
          <div className="max-w-3xl mx-auto bg-[#fff8e1] p-8 border border-[#8b4513]/30 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-[#8b4513] mb-6">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'account' && (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Username *
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.account.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Telephone *
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.account.telephone}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#8b4513] mb-2">
                      Fullname *
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.account.fullname}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.account.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Sex *
                      </label>
                      <select
                        name="sex"
                        value={formData.account.sex}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      >
                        <option value="" disabled></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#8b4513] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.account.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                    />
                  </div>
                </>
              )}

              {activeTab === 'address' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#8b4513] mb-2">
                      Receiver Name *
                    </label>
                    <input
                      type="text"
                      name="receiverName"
                      value={formData.address.receiverName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        House Number *
                      </label>
                      <input
                        type="text"
                        name="houseNumber"
                        value={formData.address.houseNumber}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Postcode *
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        value={formData.address.postcode}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        District *
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.address.district}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Province *
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={formData.address.province}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'history' && (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Customer *
                      </label>
                      <input
                        type="text"
                        name="customer"
                        value={formData.history.customer}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Created At *
                      </label>
                      <input
                        type="date"
                        name="createdAt"
                        value={formData.history.createdAt}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Status *
                      </label>
                      <input
                        type="text"
                        name="status"
                        value={formData.history.status}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Total Price *
                      </label>
                      <input
                        type="text"
                        name="totalPrice"
                        value={formData.history.totalPrice}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'payment' && (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Method *
                      </label>
                      <input
                        type="text"
                        name="method"
                        value={formData.payment.method}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Expired *
                      </label>
                      <input
                        type="month"
                        name="expired"
                        value={formData.payment.expired}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Card No *
                      </label>
                      <input
                        type="text"
                        name="cardNo"
                        value={formData.payment.cardNo}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#8b4513] mb-2">
                        Holder Name *
                      </label>
                      <input
                        type="text"
                        name="holderName"
                        value={formData.payment.holderName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-[#8b4513]/50 rounded-lg bg-[#fdf6e3] text-[#8b4513] focus:ring-[#f4d03f] focus:border-[#f4d03f]"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'account' && (
                <div className="text-right">
                  <Link
                    href="/change-password"
                    className="text-[#8b4513] hover:text-[#f4d03f] transition-colors duration-200"
                  >
                    Change Password
                  </Link>
                </div>
              )}

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-[#f4d03f] text-[#8b4513] px-6 py-3 rounded-lg hover:bg-[#e6c02f] transition-colors duration-200 font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="relative bg-gray-800/90 py-6 w-full mt-auto border-t-4 border-[#f4d03f] z-10">
  <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-[#f4d03f]/20 to-transparent transform -skew-y-3"></div>
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex flex-col sm:flex-row justify-between items-center text-gray-200 mb-6">
      <span className="text-lg font-semibold">Meal of Hope © 2025</span>
      <div className="flex gap-6 mt-3 sm:mt-0">
        <a href="#" className="text-gray-200 hover:text-[#f4d03f] transition transform hover:scale-125">📘</a>
        <a href="#" className="text-gray-200 hover:text-[#f4d03f] transition transform hover:scale-125">📸</a>
        <a href="#" className="text-gray-200 hover:text-[#f4d03f] transition transform hover:scale-125">🐦</a>
      </div>
    </div>
    <div className="flex justify-center gap-3">
      {[1, 2, 3, 4].map((_, idx) => (
        <span
          key={idx}
          className="w-2.5 h-2.5 bg-[#f4d03f] rounded-full inline-block animate-bounce"
          style={{ animationDelay: `${idx * 0.1}s` }}
        ></span>
      ))}
    </div>
    <div className="text-center mt-4">
      <a href="#" className="text-gray-200 hover:text-[#f4d03f] transition font-semibold">
        Back to top ↑
      </a>
    </div>
  </div>
</footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 0.6s infinite;
        }
      `}</style>
    </div>
  );
}