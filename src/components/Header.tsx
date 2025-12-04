'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ImMail4 } from 'react-icons/im';
import { MdMenu, MdOutlineClose } from 'react-icons/md';

import OuterClickListener from '@/components/OuterClickListener';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import UnstyledLink from '@/components/UnstyledLink';
import { fadeIn } from '@/utils/motions';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [headerBg, setHeaderBg] = useState('');
  const links = [
    { href: 'https://medium.com/@stefanocw', label: 'Blog' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
  ];

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 23 || window.innerWidth < 768
        ? setHeaderBg('bg-light dark:bg-dark')
        : setHeaderBg('bg-transparent');
    });
  }, []);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.header
      className={`fixed bottom-0 z-50 w-full py-5 md:py-8 md:sticky md:top-0 ${headerBg}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-[69rem] mx-auto w-11/12 flex items-center justify-between">
        <motion.div
          className="relative w-7 h-7 sm:w-12 sm:h-12"
          variants={fadeIn('right', 'spring', 0, 0.5)}
        >
          <Link href="#top">
            <Image
              className="rounded-full"
              src="/logo.svg"
              alt="logo"
              fill={true}
              placeholder="blur"
              blurDataURL="/favicon.ico"
              priority
            />
          </Link>
        </motion.div>

        <motion.ul
          className="flex items-center space-x-4 text-lg sm:text-2xl text-primary"
          variants={fadeIn('right', 'spring', 0, 0.5)}
        >
          <li className="text-lg hidden md:block">Reach out to me:</li>
          <li
            className="hover:text-secondary transition-colors"
            title="stefanowiryana@gmail.com"
          >
            <UnstyledLink
              href="mailto:stefanowiryana@gmail.com"
              aria-label="email"
            >
              <ImMail4 />
            </UnstyledLink>
          </li>
          <li
            className="hover:text-secondary transition-colors"
            title="github.com/stefanc23"
          >
            <UnstyledLink
              href="https://github.com/stefanc23"
              aria-label="github"
            >
              <FaGithub />
            </UnstyledLink>
          </li>
          <li
            className="hover:text-secondary transition-colors"
            title="linkedin.com/in/stefanowiryana"
          >
            <UnstyledLink
              href="https://linkedin.com/in/stefanowiryana"
              aria-label="linkedin"
            >
              <FaLinkedin />
            </UnstyledLink>
          </li>
        </motion.ul>

        <motion.nav variants={fadeIn('left', 'spring', 0, 0.5)}>
          <ul className="flex items-center justify-between space-x-4 md:flex-row flex-row-reverse">
            <li className="md:hidden">
              <button
                className={`${
                  expanded && 'text-primary'
                } ml-auto rounded p-3 outline-none hover:text-primary md:hidden`}
                onClick={handleClick}
                aria-label={expanded ? 'Hide menu' : 'Show menu'}
              >
                <div className="flex items-center text-lg sm:text-2xl text-primary">
                  {expanded ? <MdOutlineClose /> : <MdMenu />}
                </div>
              </button>
            </li>
            <ul className="hidden md:flex md:space-x-4">
              {links.map(({ href, label }) => (
                <li
                  key={`${href}${label}`}
                  className="text-primary hover:text-secondary transition-colors"
                >
                  <UnstyledLink href={href}>{label}</UnstyledLink>
                </li>
              ))}
            </ul>
            <li className="ml-3">
              <ThemeSwitcher />
            </li>
          </ul>

          {expanded && (
            <motion.ul
              className="fixed bottom-20 right-[8%] bg-light dark:bg-dark border-2 border-primary opacity-80 px-3 sm:px-4 py-2 text-right md:hidden"
              variants={fadeIn('up', 'spring', 0, 0.5)}
              initial="hidden"
              whileInView="show"
            >
              <OuterClickListener action={handleClick}>
                {links.map(({ href, label }, index) => (
                  <motion.li
                    key={`${href}${label}`}
                    className="mb-3 last:mb-0 text-sm sm:text-lg text-primary hover:text-secondary transition-colors"
                    variants={fadeIn('up', 'spring', index * 0.1, 0.5)}
                    initial="hidden"
                    whileInView="show"
                  >
                    <UnstyledLink href={href}>{label}</UnstyledLink>
                  </motion.li>
                ))}
              </OuterClickListener>
            </motion.ul>
          )}
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;
