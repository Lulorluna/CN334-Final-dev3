'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { products } from '../product-list/datatest';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('product');
  const product = products.find(p => String(p.id) === productId);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (product) {
      setQuantity(product.inStock ? 1 : 0);
    }
  }, [product]);

  const handleConfirm = () => {
    if (product && product.inStock) {
      sessionStorage.setItem('addingProduct', 'true');
      router.push(`/order?product=${product.id}&quantity=${quantity}`);
    }
  };

  if (!product) return <div className="p-10 text-center text-red-500">ไม่พบสินค้า</div>;

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      {/* Header */}
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

      {/* Spacer */}
      <div className="h-20" />
      {/* Main Content */}
      <main className="flex-grow pt-28 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
          <div className="flex justify-center items-center w-full md:w-1/2">
            <Image src={product.image} alt={product.name} width={300} height={300} className="rounded-lg" />
          </div>
          <div className="flex flex-col space-y-4 w-full md:w-1/2">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="bg-gray-100 p-4 rounded-lg text-center">{product.caption}</p>
            <p>Exp: <span>{product.exp}</span></p>
            <p className={`font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'มีสินค้า' : 'สินค้าหมด'}
            </p>
            <p className="text-red-600 font-bold text-xl">฿ {product.price.toLocaleString()}</p>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-4">
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={!product.inStock || quantity <= 1}
              >-</button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setQuantity(q => q + 1)}
                disabled={!product.inStock}
              >+</button>
            </div>

            {/* Checkbox (non-functional for now) */}
            <label className="inline-flex items-center mt-2 space-x-2">
              <input type="checkbox" className="form-checkbox" disabled={!product.inStock} />
              <span>Add to Cart</span>
            </label>

            {/* Confirm Button */}
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-full font-bold disabled:opacity-50"
              onClick={handleConfirm}
              disabled={!product.inStock}
            >
              ยืนยันสินค้า
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-10 py-6 text-center text-sm text-gray-600">
        <div className="flex justify-center space-x-2 mb-3">
          {[1, 2, 3, 4].map(i => (
            <span key={i} className="w-4 h-4 bg-gray-400 rounded-full inline-block"></span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <span>About us</span>
          <a href="#" className="hover:underline">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}