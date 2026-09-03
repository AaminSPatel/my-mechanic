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
import Image from 'next/image';

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
             {/*  <h2 className="text-2xl font-extrabold italic tracking-tighter text-primary">
                {company?.name || "MyMechanic"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {company?.tagline || "Your Car Buddy"}
              </p> */}
               <div className="flex flex-col">
                            <Image src={'/logo.jpeg'} className='h-18 w-44 rounded-md' height={200} width={400} alt='MyMechanic24 Auto Care Service in Indore'/>
                          </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {company?.description || "Indore's trusted auto garage & doorstep car repair partner. We provide certified mechanical repairs, computerized OBD-II diagnostics, genuine OEM parts, and high-pressure foam washing at your home or office."}
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
                { label: 'Doorstep & Garage Services', href: '/services' },
                { label: 'About MyMechanic24', href: '/about' },
                { label: 'Car Maintenance Blogs', href: '/blogs' },
                { label: 'Contact & Location', href: '/contact' },
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
                <a 
                  href={company?.googleMapUrl || "https://maps.app.goo.gl/DeuQikRWUgCjJkTU6?g_st=ipc"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-foreground transition leading-relaxed"
                >
                  Nayta Mundla Main Road, Near Palda & Tejaji Nagar, Indore, MP 452020
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={`tel:${company?.phoneRaw || "+919977823169"}`} className="hover:text-foreground font-bold transition">
                  {company?.phone || "+91 99778 23169"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href={`mailto:${company?.email || "mymechanic.in@gmail.com"}`} className="hover:text-foreground transition">
                  {company?.email || "mymechanic.in@gmail.com"}
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
                <span className="text-foreground font-medium">{company?.hours?.weekday || "8:00 AM - 8:00 PM"}</span>
              </li>
            
              <li className="flex justify-between items-center border-b border-border pb-2">
                <span className="flex items-center gap-2"><Clock size={14} className="text-primary"/> Sunday:</span>
                <span className="text-foreground font-medium">{company?.hours?.sunday || "8:00 AM - 2:00 PM"}</span>
              </li>

              <li className="flex justify-between items-center pt-1">
                <span className="flex items-center gap-2"><Clock size={14} className="text-emerald-500"/> Emergency:</span>
                <span className="text-emerald-500 font-bold text-xs">24/7 Breakdown Assistance</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium tracking-wide">
          <p className="opacity-75">
            &copy; {currentYear} <span className="text-foreground font-semibold">MyMechanic24</span>. All rights reserved.
          </p>
          
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 normal-case">
            Created with <span className="text-red-500 text-sm">❤️</span> by{" "}
            <a
              href="https://business-sathi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-bold hover:text-primary transition-colors underline underline-offset-4"
            >
              Business Sathi
            </a>
          </p>

          <div className="flex items-center gap-6 uppercase text-xs">
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