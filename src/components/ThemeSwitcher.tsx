'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      className={`flex items-center text-primary hover:text-secondary transition-colors ${
        !mounted && 'invisible'
      }`}
    >
      {theme === 'dark' && mounted ? (
        <button
          className="grid size-9 place-items-center rounded-lg border border-primary/55 text-base cursor-pointer hover:border-secondary"
          onClick={() => setTheme('light')}
          aria-label="Switch to light mode"
        >
          <MdLightMode />
        </button>
      ) : (
        <button
          className="grid size-9 place-items-center rounded-lg border border-primary/55 text-base cursor-pointer hover:border-secondary"
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
