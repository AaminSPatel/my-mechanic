'use client';

import Link from 'next/link';
import { useSiteContext } from '@/context/SiteContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Clock, 
  ArrowRight 
} from 'lucide-react';

export default function Footer() {
  const { company, social } = useSiteContext();
  const currentYear = new Date().getFullYear();

  return (
    // Changed wrapper to bg-background to match Dark Theme (Black), NOT bg-foreground (White)
    <footer className="bg-background border-t border-border text-muted-foreground font-sans">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-extrabold italic tracking-tighter text-primary">
                {company?.name || "Car Repair"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {company?.tagline || "Your Car Buddy."}
              </p>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {company?.description || "Indore's most trusted car repair service. We provide professional maintenance, diagnostics, and repairs with certified mechanics."}
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: Facebook, href: social?.facebook, label: "Facebook" },
                { icon: Instagram, href: social?.instagram, label: "Instagram" },
                { icon: Twitter, href: social?.twitter, label: "Twitter" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href || "#"}
                  className="bg-secondary p-2 rounded text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={item.label}
                >
                  <item.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold italic text-foreground uppercase mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home Page', href: '/' },
                { label: 'Our Services', href: '/services' },
                { label: 'About Company', href: '/about' },
                { label: 'Latest News', href: '/blogs' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="flex items-center gap-2 hover:text-primary transition-colors group"
                  >
                    <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold italic text-foreground uppercase mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>{company?.location || "Scheme No 54, Vijay Nagar, Indore, MP"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={`tel:${company?.phone}`} className="hover:text-foreground font-bold transition">
                  {company?.phone || "+91 98765 43210"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href={`mailto:${company?.email}`} className="hover:text-foreground transition">
                  {company?.email || "support@carrepair.com"}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h3 className="text-lg font-bold italic text-foreground uppercase mb-6 relative inline-block">
              Opening Hours
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center border-b border-border pb-2">
                <span className="flex items-center gap-2"><Clock size={14} className="text-primary"/> Mon - Sat:</span>
                <span className="text-foreground font-medium">{company?.hours?.weekday || "9:00 - 20:00"}</span>
              </li>
            
              <li className="flex justify-between items-center border-b border-border pb-2">
                <span className="flex items-center gap-2"><Clock size={14} className="text-primary"/> Sunday:</span>
                <span className="text-primary font-bold">{company?.hours?.sunday || "Open (Half Day)"}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium uppercase tracking-wide">
          <p className="opacity-75">
            &copy; {currentYear} <span className="text-foreground">{company?.name}</span>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}