import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-white rounded-lg p-6 w-full max-w-md relative transform transition-all duration-300 ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">×</button>
        <div className="flex flex-col items-center text-center">
          <Image src={product.image} alt={product.name} width={150} height={150} />
          <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
          <p className="text-gray-600">{product.caption}</p>
          <p className="text-yellow-500 font-bold text-lg mt-2">฿ {product.price}</p>
          <div className="flex items-center gap-4 mt-4">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-gray-200 px-3 py-1 rounded">-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="bg-gray-200 px-3 py-1 rounded">+</button>
          </div>
          <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full">
            ยืนยันสินค้า
          </button>
        </div>
      </div>
    </div>
  );
}