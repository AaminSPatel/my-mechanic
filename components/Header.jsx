'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Search } from 'lucide-react';
import { useSiteContext } from '@/context/SiteContext';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';

export default function Header() {
  const { company } = useSiteContext();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home Page' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/blogs', label: 'Read Blogs' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ================= LOGO (Image Style) ================= */}
          <Link href="/" className="flex items-center gap-1 flex-shrink-0 group">
            <div className="flex flex-col">
              <Image src={'/logo.jpeg'} className='h-16 w-42 rounded-md' height={200} width={400} alt='Doorstep Auto Care Service in Indore'/>
            </div>
             {/* <div className="flex flex-col">
              <h1 className="text-3xl font-extrabold italic tracking-tighter text-primary">
                {company?.name || "Car Repair"}
              </h1>
              
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">
                {company?.tagline || "Service Center"}
              </span>
            </div> */}
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ================= RIGHT SIDE (Call & Toggle) ================= */}
          <div className="flex items-center gap-6">
            
            {/* Call Info (Hidden on Mobile) */}
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                Call Today
              </span>
              <a 
                href={`tel:${company?.phone}`} 
                className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary fill-primary" />
                {company?.phone || "+91 98765 43210"}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              
            
              {/* Hamburger Menu - Mobile Only */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-md text-foreground hover:bg-secondary hover:text-primary transition"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {/* Slide-down animation logic can be added here */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-card absolute w-full left-0 shadow-2xl">
          <nav className="flex flex-col py-6 px-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-foreground hover:bg-primary hover:text-primary-foreground transition-all rounded-lg font-bold uppercase tracking-wide text-sm"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Contact Info */}
            <div className="mt-6 pt-6 border-t border-border px-4">
              <p className="text-muted-foreground text-xs uppercase mb-2">Need Help?</p>
              <a href={`tel:${company?.phone}`} className="flex items-center gap-3 text-lg font-bold text-primary">
                 <Phone size={20} /> {company?.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}