'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';

import { navigateToSection } from '@/utils/sectionNavigation';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 520);

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    const updateMenuState = (event: Event) =>
      setMenuExpanded(Boolean((event as CustomEvent<boolean>).detail));
    window.addEventListener('navigation-menu-change', updateMenuState);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('navigation-menu-change', updateMenuState);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !menuExpanded && (
        <motion.button
          type="button"
          className="fixed bottom-20 right-5 z-40 grid size-10 place-items-center rounded-full border border-light/15 bg-dark/70 text-light/75 shadow-lg backdrop-blur transition hover:border-primary hover:text-primary md:bottom-5"
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          transition={{ duration: 0.2 }}
          onClick={() => navigateToSection('#top')}
          aria-label="Back to top"
        >
          <HiArrowUp className="size-4" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
