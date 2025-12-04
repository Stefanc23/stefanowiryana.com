'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`flex items-center text-primary hover:text-secondary transition-colors text-sm md:text-xl ${
        !mounted && 'invisible'
      }`}
    >
      {theme === 'dark' && mounted ? (
        <button
          className="border border-primary hover:border-secondary p-1 md:p-2 rounded-lg cursor-pointer"
          onClick={() => setTheme('light')}
          aria-label="Switch to light mode"
        >
          <MdLightMode />
        </button>
      ) : (
        <button
          className="border border-primary hover:border-secondary p-1 md:p-2 rounded-lg cursor-pointer"
          onClick={() => setTheme('dark')}
          aria-label="Switch to dark mode"
        >
          <MdDarkMode />
        </button>
      )}
    </div>
  );
};

export default ThemeSwitcher;
