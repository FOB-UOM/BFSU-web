import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  return (
    <button
      onClick={cycleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 border backdrop-blur-md shadow-sm hover:scale-105 active:scale-95 ${
        theme === 'dark'
          ? 'bg-white/10 text-bfsu-gold border-white/20 hover:bg-white/15'
          : theme === 'light'
          ? 'bg-bfsu-primary/5 text-bfsu-primary border-bfsu-primary/15 hover:bg-bfsu-primary/10'
          : 'bg-bfsu-gold/15 text-bfsu-gold border-bfsu-gold/30 hover:bg-bfsu-gold/25'
      } ${className}`}
      title={`Current theme: ${theme.toUpperCase()} (Click to toggle)`}
      aria-label={`Current theme: ${theme}. Click to switch theme`}
    >
      {theme === 'light' && <Sun size={18} className="animate-in spin-in-180 duration-300" />}
      {theme === 'dark' && <Moon size={18} className="animate-in spin-in-180 duration-300" />}
      {theme === 'system' && <Laptop size={18} className="animate-in zoom-in duration-300" />}
    </button>
  );
};
