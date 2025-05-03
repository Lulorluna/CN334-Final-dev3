'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { products } from './datatest'; // ปรับ path ตามที่คุณมี

export default function ProductListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { label: 'Raw', icon: '/icons/raw.png' },
    { label: 'Vegetable', icon: '/icons/vegetable.png' },
    { label: 'Fruit', icon: '/icons/fruit.png' },
    { label: 'Seasoning', icon: '/icons/seasoning.png' },
    { label: 'RTE Food', icon: '/icons/rte.png' },
  ];

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleSelectProduct = (productId) => {
    router.push(`/Product-Detail?product=${productId}`);
  };

  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.caption.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/bg.png')" }}>
      
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
            <Link href="/order" className="relative p-2 border rounded-full hover:bg-gray-100 transition-colors">
              🛒
            </Link>
            <Link href="/login" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-4 py-2 rounded-full transition">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <div className="h-20" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 flex-grow">
        
        {/* Sidebar */}
        <aside className="md:w-1/4 w-full bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-4">ค้นหา / หมวดหมู่</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat.label
                    ? 'bg-yellow-400 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Image src={cat.icon} alt={cat.label} width={20} height={20} />
                {cat.label}
              </button>
            ))}

            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-3 text-red-600 text-sm hover:underline"
              >
                ล้างการเลือก
              </button>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <section className="md:w-3/4 w-full">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer flex flex-col justify-between"
                  onClick={() => handleSelectProduct(String(item.id))}
                >
                  <div className="flex justify-center items-center h-32">
                    <Image src={item.image} alt={item.name} width={100} height={100} className="object-contain" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-800 font-semibold text-md">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.caption}</p>
                    <p className="font-bold text-yellow-500 mt-2">฿ {item.price.toLocaleString()}</p>
                  </div>
                  <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-full">
                    เลือกซื้อ
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">ไม่พบสินค้าที่ตรงกับคำค้นหาหรือหมวดหมู่</div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4].map((_, idx) => (
            <span key={idx} className="w-4 h-4 bg-gray-400 rounded-full inline-block"></span>
          ))}
        </div>
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-gray-600">
          <span>About us</span>
          <a href="#" className="hover:underline mt-2 sm:mt-0">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}