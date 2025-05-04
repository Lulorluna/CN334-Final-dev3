'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '../product-list/datatest';

export default function OrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get('product');
  const quantity = parseInt(searchParams.get('quantity') || '1', 10);

  const [cart, setCart] = useState([]);
  const [hasAdded, setHasAdded] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [address, setAddress] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
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

  const handleConfirmOrder = () => {
    if (!agreeTerms) {
      alert("กรุณายอมรับเงื่อนไขก่อนทำการสั่งซื้อ");
      return;
    }

    const orderData = {
      cart: fullProducts,
      totalPrice,
      shipping,
      address,
      shippingMethod,
      paymentMethod
    };

    localStorage.setItem('orderData', JSON.stringify(orderData));
    localStorage.removeItem('cart');
    router.push('/summarize');
  };

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

      {/* Main */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Section */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">🛍️ รายการสินค้าในตะกร้า</h1>
          {fullProducts.length === 0 ? (
            <div className="text-center text-red-500">ไม่มีสินค้าในตะกร้า</div>
          ) : (
            fullProducts.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4 mb-4">
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-lg" />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500">฿{item.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300">−</button>
                  <span className="font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300">+</button>
                </div>
              </div>
            ))
          )}

          {fullProducts.length > 0 && (
            <div className="bg-yellow-50 p-6 rounded-xl shadow mt-6">
              <h3 className="font-bold text-xl mb-4">📦 สรุปคำสั่งซื้อ</h3>
              <div className="space-y-2 text-gray-700">
                <p>ยอดรวมสินค้า: ฿{totalPrice.toLocaleString()}</p>
                <p>ค่าจัดส่ง: ฿{shipping}</p>
                <p className="font-bold text-lg text-yellow-700">ยอดชำระรวม: ฿{(totalPrice + shipping).toLocaleString()}</p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">ยอมรับเงื่อนไขการให้บริการ</label>
              </div>
              <button
                onClick={handleConfirmOrder}
                className={`mt-4 w-full py-3 rounded font-bold text-white ${
                  agreeTerms ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!agreeTerms}
              >
                ✅ ยืนยันคำสั่งซื้อ
              </button>
            </div>
          )}
        </div>

        {/* Address and Payment Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-6 text-gray-800">📮 ข้อมูลการจัดส่ง</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-600">ที่อยู่</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded px-3 py-2" rows={3}></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-600">วิธีจัดส่ง</label>
            <input value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="เช่น ส่งด่วนภายใน 1 วัน" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">วิธีชำระเงิน</label>
            <input value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="เช่น โอนผ่าน QR code, บัตรเครดิต" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <span>© 2025 Meal of Hope. All rights reserved.</span>
          <Link href="#" className="hover:underline mt-2 sm:mt-0">Back to top ↑</Link>
        </div>
      </footer>
    </div>
  );
}