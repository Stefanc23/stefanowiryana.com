'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMenuAlt3, HiOutlineMail, HiX } from 'react-icons/hi';

import OuterClickListener from '@/components/OuterClickListener';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { fadeIn } from '@/utils/motions';
import {
  navigateToSection,
  SECTION_NAVIGATION_EVENT,
} from '@/utils/sectionNavigation';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent<boolean>('navigation-menu-change', {
        detail: expanded,
      }),
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent<boolean>('navigation-menu-change', { detail: false }),
      );
    };
  }, [expanded]);

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;

    const updateActiveSection = () => {
      if (window.scrollY < 120) {
        setActiveSection('');
        frame = 0;
        return;
      }

      const viewportAnchor = window.innerWidth >= 768 ? 128 : 104;
      const currentSection = sections.reduce<string>((current, section) => {
        const scrollTarget =
          section.querySelector<HTMLElement>('[data-section-heading]') ??
          section;

        return scrollTarget.getBoundingClientRect().top <= viewportAnchor
          ? `#${section.id}`
          : current;
      }, '');

      setActiveSection(currentSection);
      frame = 0;
    };

    const requestActiveSectionUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    const updateFromNavigation = (event: Event) => {
      setActiveSection((event as CustomEvent<string>).detail);
    };

    requestActiveSectionUpdate();
    window.addEventListener('hashchange', requestActiveSectionUpdate);
    window.addEventListener('popstate', requestActiveSectionUpdate);
    window.addEventListener('resize', requestActiveSectionUpdate);
    window.addEventListener('scroll', requestActiveSectionUpdate, {
      passive: true,
    });
    window.addEventListener(SECTION_NAVIGATION_EVENT, updateFromNavigation);

    return () => {
      window.removeEventListener('hashchange', requestActiveSectionUpdate);
      window.removeEventListener('popstate', requestActiveSectionUpdate);
      window.removeEventListener('resize', requestActiveSectionUpdate);
      window.removeEventListener('scroll', requestActiveSectionUpdate);
      window.removeEventListener(
        SECTION_NAVIGATION_EVENT,
        updateFromNavigation,
      );
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => setExpanded(false);

  return (
    <motion.header
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-light/10 bg-dark/70 px-4 py-3 backdrop-blur-2xl md:sticky md:top-0 md:bottom-auto md:border-t-0 md:border-b md:px-8 md:py-5 ${
        scrolled ? 'shadow-[0_16px_50px_rgba(0,0,0,0.2)]' : ''
      }`}
      initial="hidden"
      animate="show"
      variants={fadeIn('down', 'spring', 0, 0.5)}
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between">
        <motion.div variants={fadeIn('right', 'spring', 0.1, 0.5)}>
          <Link
            href="#top"
            className="group flex items-center gap-3"
            aria-label="Back to top"
            onClick={(event) => {
              event.preventDefault();
              navigateToSection('#top');
            }}
          >
            <Image
              src="/logo.png"
              alt="Stefano Wiryana"
              width={48}
              height={48}
              priority
              className="h-10 w-auto max-w-14 object-contain transition duration-300 group-hover:scale-105 md:h-11"
            />
          </Link>
        </motion.div>

        <motion.nav
          className="absolute left-1/2 hidden -translate-x-1/2 md:block"
          variants={fadeIn('up', 'spring', 0.15, 0.5)}
          aria-label="Primary"
        >
          <ul className="flex items-center gap-1 rounded-xl border border-light/10 bg-light/[0.055] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    activeSection === item.href ? 'location' : undefined
                  }
                  className={`block rounded-lg px-3 py-2 text-sm transition ${
                    activeSection === item.href
                      ? 'bg-light text-dark'
                      : 'text-light/65 hover:bg-light/10 hover:text-light'
                  }`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToSection(item.href);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>

        <motion.div
          className="flex items-center gap-3"
          variants={fadeIn('left', 'spring', 0.1, 0.5)}
        >
          <ul className="flex items-center gap-1 text-light/70">
            <li>
              <a
                href="mailto:stefanowiryana@gmail.com"
                aria-label="Email Stefano"
                className="grid size-9 place-items-center rounded-lg transition hover:bg-light/8 hover:text-primary"
              >
                <HiOutlineMail className="size-4" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/stefanc23"
                aria-label="GitHub"
                className="grid size-9 place-items-center rounded-lg transition hover:bg-light/8 hover:text-primary"
              >
                <FaGithub className="size-4" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/stefanowiryana"
                aria-label="LinkedIn"
                className="grid size-9 place-items-center rounded-lg transition hover:bg-light/8 hover:text-primary"
              >
                <FaLinkedin className="size-4" aria-hidden />
              </a>
            </li>
          </ul>
          <ThemeSwitcher />
          <button
            type="button"
            className="grid size-9 place-items-center rounded-lg border border-light/10 bg-light/[0.06] text-light md:hidden"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls="mobile-navigation"
            aria-label={expanded ? 'Hide menu' : 'Show menu'}
          >
            {expanded ? (
              <HiX className="size-4" aria-hidden />
            ) : (
              <HiMenuAlt3 className="size-4" aria-hidden />
            )}
          </button>
        </motion.div>
      </div>

      {expanded && (
        <motion.nav
          id="mobile-navigation"
          className="absolute bottom-[4.5rem] right-4 w-52 rounded-2xl border border-light/10 bg-dark/70 p-2 shadow-2xl backdrop-blur-2xl md:hidden"
          variants={fadeIn('up', 'spring', 0, 0.35)}
          initial="hidden"
          animate="show"
          aria-label="Mobile"
        >
          <OuterClickListener action={closeMenu}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  activeSection === item.href ? 'location' : undefined
                }
                className={`block rounded-xl px-4 py-3 text-sm transition ${
                  activeSection === item.href
                    ? 'bg-light text-dark'
                    : 'text-light/75 hover:bg-light/10 hover:text-light'
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  navigateToSection(item.href);
                  closeMenu();
                }}
              >
                {item.label}
              </Link>
            ))}
          </OuterClickListener>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Header;
