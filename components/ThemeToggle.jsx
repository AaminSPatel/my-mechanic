'use client';

import { useSiteContext } from '@/context/SiteContext';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme } = useSiteContext();

  return (
    <button
      onClick={theme.toggleTheme}
      className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      {theme.isDarkMode ? (
        <Sun className="w-5 h-5 text-primary" />
      ) : (
        <Moon className="w-5 h-5 text-primary" />
      )}
    </button>
  );
}
