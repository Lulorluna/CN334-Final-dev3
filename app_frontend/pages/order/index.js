'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '../product-list/datatest';

export default function OrderPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const quantity = parseInt(searchParams.get('quantity') || '1', 10);

  const [cart, setCart] = useState([]);
  const [hasAdded, setHasAdded] = useState(false);

  useEffect(() => {
    let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    // เฉพาะตอนมาจากหน้า product-detail พร้อม flag sessionStorage
    const addingProduct = sessionStorage.getItem('addingProduct');
    if (productId && addingProduct === 'true' && !hasAdded) {
      const index = existingCart.findIndex(item => item.id === Number(productId));
      if (index >= 0) {
        existingCart[index].quantity += quantity;
      } else {
        existingCart.push({ id: Number(productId), quantity });
      }
      localStorage.setItem('cart', JSON.stringify(existingCart));
      sessionStorage.removeItem('addingProduct');
      setHasAdded(true);
    }

    setCart(existingCart);
  }, [productId, quantity, hasAdded]);

  const updateQuantity = (id, newQty) => {
    let updatedCart;
    if (newQty <= 0) {
      updatedCart = cart.filter(item => item.id !== id);
    } else {
      updatedCart = cart.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      );
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const fullProducts = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean);

  const totalPrice = fullProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shipping = 30;

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.png')" }}>
      {/* Navbar */}
      <header className="bg-[#fdf6e3] shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" width={40} height={40} alt="Logo" />
            <span className="font-bold text-gray-800">Meal of Hope</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="relative text-gray-800 font-semibold group">
              <span className="relative inline-block px-1">
                Home
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <Link href="/about" className="relative text-gray-800 font-semibold group">
              <span className="relative inline-block px-1">
                About Us
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <Link href="/product-list" className="relative text-gray-800 font-semibold group">
              <span className="relative inline-block px-1">
                Product
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link
              href="/order"
              className="relative p-2 border rounded-full hover:bg-gray-100 transition-colors duration-200 ease-in-out"
            >
              🛒
            </Link>
            <Link href="/login" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-4 py-2 rounded-full">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto p-4 w-full flex flex-col lg:flex-row gap-8 bg-white/90 rounded-lg shadow mt-6">
        <div className="flex-1">
          {fullProducts.length === 0 ? (
            <div className="text-center text-red-500">ไม่มีสินค้าในตะกร้า</div>
          ) : (
            fullProducts.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 mb-4 border rounded bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.name} width={60} height={60} />
                  <div>
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p className="text-gray-600">฿{item.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 border rounded hover:bg-gray-100">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 border rounded hover:bg-gray-100">+</button>
                </div>
              </div>
            ))
          )}

          {fullProducts.length > 0 && (
            <div className="bg-white p-4 rounded shadow mt-6">
              <h3 className="font-bold text-lg mb-2">สรุปคำสั่งซื้อ</h3>
              <p>รวม: ฿{totalPrice.toLocaleString()}</p>
              <p>ค่าจัดส่ง: ฿{shipping}</p>
              <p className="font-bold mt-2">ทั้งหมด: ฿{(totalPrice + shipping).toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms" className="text-sm">ยอมรับเงื่อนไขการให้บริการ</label>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold w-full mt-4 py-2 rounded">
                ยืนยันคำสั่งซื้อ
              </button>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/3 bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-4">ข้อมูลการจัดส่ง</h3>
          <div className="mb-4">
            <label className="block font-medium mb-1">ที่อยู่</label>
            <textarea className="w-full border rounded px-3 py-2" rows={4}></textarea>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">การจัดส่ง</label>
            <input className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">การชำระเงิน</label>
            <input className="w-full border rounded px-3 py-2" />
          </div>
        </div>
      </main>

      {/* Footer ติดล่างเสมอ */}
      <footer className="bg-gray-100 py-6 mt-auto text-center">
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