'use client';

import { useSiteContext } from '@/context/SiteContext';
import {  Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingContactBar() {
  const { company } = useSiteContext();

  return (
    <div className="fixed bg-pink-400 bottom-4 left-4 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-8 h-7" />
      </a>

      {/* Phone Button */}
      <a
        href={`tel:${company.phone}`}
        className="w-12 h-12 bg-primary hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
