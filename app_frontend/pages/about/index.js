'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

export default function AboutPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = ['/images/ba1.jpg', '/images/ba2.jpg', '/images/ba3.jpg'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token && !isTokenExpired(token));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-[-1]">
        {bgImages.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Background ${idx}`}
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              idx === bgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 w-full bg-white/70 backdrop-blur-md shadow-lg z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/images/logo.png" width={48} height={48} alt="Meal of Hope Logo" />
            <h1 className="text-2xl font-extrabold text-yellow-600 tracking-wide">
              Meal of Hope
            </h1>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {[
              { text: 'หน้าหลัก', href: '/' },
              { text: 'เกี่ยวกับเรา', href: '/aboutus' },
              { text: 'สินค้า', href: '/product-list' }
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="relative text-gray-800 font-medium hover:text-yellow-500 transition-colors group"
              >
                <span className="inline-block px-1 relative">
                  {item.text}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/order" className="p-2 text-xl hover:text-yellow-600 transition-colors">
              🛒
            </Link>
            {isLoggedIn ? (
              <Link href="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500 hover:scale-105 transform transition">
                <Image src="/images/user-profile.jpg" alt="Profile" width={40} height={40} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all"
              >
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28">
        {/* Section: About */}
        <section className="container mx-auto px-6 py-16 bg-white/80 rounded-xl shadow-lg">
          <h2 className="text-5xl font-extrabold text-yellow-700 text-center mb-10">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
            <strong className="text-yellow-600">Meal of Hope</strong> คือแพลตฟอร์มขายอาหารใกล้หมดอายุและผักผลไม้มีตำหนิที่ยังคงคุณค่าทางโภชนาการ <strong className="text-yellow-600">ถูกกว่า 50%!</strong> ทุกการซื้อช่วยลดขยะอาหารและสร้างพลังบวกให้สังคม
          </p>

          {/* HOPE */}
          <div className="mt-16 flex justify-center flex-wrap gap-10">
  {[
    { letter: 'H', title: 'Human', desc: 'มื้ออาหารสำหรับมนุษย์' },
    { letter: 'O', title: 'Opportunity', desc: 'มื้ออาหารเพื่อสร้างโอกาส' },
    { letter: 'P', title: 'Preservation', desc: 'มื้ออาหารเพื่อการอนุรักษ์' },
    { letter: 'E', title: 'Earth', desc: 'มื้ออาหารเพื่อโลก' }
  ].map((item, idx) => (
    <div key={idx} className="relative group cursor-pointer">
      {/* วงกลมหลัก */}
      <div className="w-36 h-36 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-5xl font-extrabold text-white shadow-2xl border-4 border-white transition-transform duration-300 group-hover:scale-105">
        {item.letter}
      </div>

      {/* Popup Hover */}
      <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-60 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 z-20">
        <div className="relative bg-white rounded-xl shadow-xl px-4 py-3 text-center text-gray-800">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-sm"></div>
          <h4 className="font-bold text-yellow-600">{item.title}</h4>
          <p className="text-sm mt-1">{item.desc}</p>
        </div>
      </div>
    </div>
  ))}
</div>
        </section>

        {/* Section: Mission */}
        <section className="bg-yellow-50/80 py-16 mt-12">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
            <div>
              <h3 className="text-4xl font-bold text-yellow-600 mb-4">
                Our Mission
              </h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
                <li>ทุกมื้อของคุณคือการช่วยโลก – ลดขยะอาหารอย่างยั่งยืน</li>
                <li>ส่งมอบอาหารคุณภาพราคาประหยัดให้ผู้ขาดแคลนเข้าถึงได้ง่ายขึ้น</li>
                <li>สร้างรายได้และเสริมความเข้มแข็งให้กับเกษตรกรและชุมชนท้องถิ่น</li>
                <li>รีไซเคิลเศษอาหารเป็นปุ๋ยและพลังงานสะอาดอย่างยั่งยืน</li>
              </ul>
            </div>
            <div className="w-full h-72 relative rounded-xl overflow-hidden shadow-xl">
              <Image src="/images/mission.jpg" alt="พันธกิจของเรา" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* Section: Testimonials */}
        <section className="bg-white/90 py-12 mt-12">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-yellow-700 mb-6">เสียงจากผู้ใช้งาน</h3>
            <p className="text-gray-700 max-w-xl mx-auto italic">
              “ประหยัดเงินได้เยอะ อาหารคุณภาพดี แถมยังรู้สึกดีที่ได้ช่วยลดขยะอาหาร”
            </p>
            <p className="text-sm text-gray-500 mt-2">— ผู้ใช้งานจริงจากอนาคต</p>
          </div>
        </section>

        {/* Section: Team */}
        <section className="container mx-auto px-6 py-16 bg-yellow-50/80 mt-12 rounded-xl shadow-md">
          <h3 className="text-4xl font-extrabold text-yellow-700 text-center mb-8">
            ทีมงานของเรา
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: 'ธนศักดิ์ ชนม์เรืองฉาย', id: '6610742410', role: 'System Analyst / Backend Developer' },
              { name: 'ณัฏชนน วสุธวัช', id: '6610742279', role: 'Business Analyst / Backend Developer' },
              { name: 'ธนภัทร์ แย้มบู่', id: '6610742113', role: 'Frontend Developer' }
            ].map((member, idx) => (
              <div
                key={idx}
                className="w-72 bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transform hover:-translate-y-2 transition"
              >
                <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden border-4 border-yellow-400">
                  <Image src="/images/user-profile.jpg" alt={member.name} fill className="object-cover" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
                <p className="text-sm text-gray-500 mb-1">รหัส: {member.id}</p>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}