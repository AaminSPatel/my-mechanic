'use client';

import { useEffect, useState } from 'react';
import { useSiteContext } from '@/context/SiteContext';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingContactBar() {
  const { company } = useSiteContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show buttons only after scrolling past the hero header (approx 280px)
      // This prevents the fixed buttons from blocking any hero inputs on mobile
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 flex flex-col gap-3 transition-all duration-500 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
          'Hi MyMechanic24, I need car service or doorstep repair/wash in Indore.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/30 transition-all hover:scale-110 active:scale-95 ring-2 ring-white/20"
        aria-label="Chat with MyMechanic24 on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>

      {/* Phone Button */}
      <a
        href={`tel:${company.phone}`}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-primary hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/30 transition-all hover:scale-110 active:scale-95 ring-2 ring-white/20"
        aria-label="Call MyMechanic24"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>
    </div>
  );
}
