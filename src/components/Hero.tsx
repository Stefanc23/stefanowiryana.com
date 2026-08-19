'use client';

import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { FaFilePdf } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

import Button from '@/components/Button';
import { fadeIn } from '@/utils/motions';
import { navigateToSection } from '@/utils/sectionNavigation';

const VerificationOrbit = dynamic(
  () => import('@/components/VerificationOrbit'),
  {
    ssr: false,
    loading: () => <div className="aspect-square" aria-hidden />,
  },
);

const Hero = () => {
  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden px-5 py-16 sm:px-8 sm:py-20 md:min-h-[calc(100svh-5.25rem)] lg:px-10"
      aria-labelledby="hero-title"
    >
      <div className="relative mx-auto grid w-full max-w-7xl lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-center lg:gap-x-12">
        <motion.p
          className="relative z-10 text-xs font-semibold uppercase tracking-[0.24em] text-primary-200 lg:col-start-1"
          variants={fadeIn('up', 'spring', 0, 0.45)}
          initial="hidden"
          animate="show"
        >
          Cyber Security Consultant
        </motion.p>
        <motion.h1
          id="hero-title"
          className="relative z-10 mt-6 max-w-5xl text-balance text-[clamp(3rem,5.8vw,6.25rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-light lg:col-start-1"
          variants={fadeIn('up', 'spring', 0.08, 0.5)}
          initial="hidden"
          animate="show"
        >
          Hi! I&apos;m{' '}
          <span className="bg-linear-to-br from-primary to-secondary bg-clip-text text-transparent">
            Stefano
          </span>
        </motion.h1>
        <motion.div
          className="mx-auto my-5 w-full max-w-[17rem] sm:max-w-[20rem] lg:col-start-2 lg:row-start-1 lg:row-span-4 lg:my-0 lg:max-w-none"
          variants={fadeIn('left', 'spring', 0.2, 0.6)}
          initial="hidden"
          animate="show"
        >
          <VerificationOrbit />
        </motion.div>
        <motion.p
          className="relative z-10 max-w-2xl text-pretty text-lg leading-8 text-light/70 sm:text-xl sm:leading-9 lg:col-start-1 lg:mt-7"
          variants={fadeIn('up', 'spring', 0.16, 0.5)}
          initial="hidden"
          animate="show"
        >
          I help companies increase their cyber security posture with Zscaler.
          I&apos;m also a passionate software developer and AI enthusiast.
        </motion.p>
        <motion.div
          className="relative z-10 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-start-1"
          variants={fadeIn('up', 'spring', 0.24, 0.5)}
          initial="hidden"
          animate="show"
        >
          <Button
            href="#projects"
            className="group sm:min-w-48"
            onClick={(event) => {
              event.preventDefault();
              navigateToSection('#projects');
            }}
          >
            Explore projects
            <HiArrowRight
              className="ml-2 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Button>
          <Button
            href="/resume"
            target="_blank"
            rel="noreferrer"
            variant="outline"
            className="group sm:min-w-48"
          >
            View résumé
            <FaFilePdf
              className="ml-2 transition-transform group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
