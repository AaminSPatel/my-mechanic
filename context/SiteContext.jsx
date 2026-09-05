'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SiteContext = createContext();

export function SiteProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or system preference
    const stored = localStorage.getItem('theme');
    if (stored) {
      setIsDarkMode(stored === 'dark');
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };
//SalluKhan@123
  const siteData = {
    company: {
      name: 'MyMechanic24',
      fullName: 'MyMechanic24 Auto Care',
      tagline: 'Expert Doorstep Car Repair & Washing in Indore',
      location: 'Nayta Mundla Main Road, Near Palda & Tejaji Nagar, Indore, Madhya Pradesh 452020',
      address: 'Nayta Mundla Main Road, Near Palda & Tejaji Nagar',
      city: 'Indore',
      state: 'Madhya Pradesh',
      postalCode: '452020',
      email: 'mymechanic.in@gmail.com',
      phone: '+91 99778 23169',
      phoneRaw: '+919977823169',
      whatsapp: '+91-9977823169',
      whatsappNumber: '919977823169',
      googleMapUrl: 'https://maps.app.goo.gl/DeuQikRWUgCjJkTU6?g_st=ipc',
      hours: {
        weekday: '8:00 AM - 8:00 PM',
        sunday: '8:00 AM - 2:00 PM',
        emergency: '24/7 Breakdown Assistance Available',
      },
    },
    social: {
      facebook: 'https://facebook.com',
      instagram: 'https://www.instagram.com/my_mechanic__',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
    theme: {
      isDarkMode,
      toggleTheme,
      mounted,
    },
  };

  if (!mounted) return null;

  return (
    <SiteContext.Provider value={siteData}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteContext() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteContext must be used within SiteProvider');
  }
  return context;
}
