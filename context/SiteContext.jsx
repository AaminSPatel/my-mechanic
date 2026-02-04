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

  const siteData = {
    company: {
      name: 'MyMachanic',
      tagline: 'Your Car Buddy',
      location: 'Indore, Madhya Pradesh',
      email: 'mymechanic.in@gmail.com',
      phone: '+91-9977823169',
      whatsapp: '+91-9977823169',
      hours: {
        weekday: '9:00 AM - 7:00 PM',
       
        sunday: 'Open (Half Day)',
      },
    },
    social: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      linkedin: '#',
    },
    theme: {
      isDarkMode,
      toggleTheme,
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
