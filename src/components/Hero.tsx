'use client';

import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { FaFilePdf } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

import Button from '@/components/Button';
import { fadeIn } from '@/utils/motions';

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
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden px-5 py-20 sm:px-8 md:min-h-[calc(100svh-5.25rem)] lg:px-10"
      aria-labelledby="hero-title"
    >
      <div className="relative mx-auto grid w-full max-w-7xl gap-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div className="max-w-4xl">
          <motion.p
            className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary-200"
            variants={fadeIn('up', 'spring', 0, 0.45)}
            initial="hidden"
            animate="show"
          >
            Security Solution Engineer / Web Developer
          </motion.p>
          <motion.h1
            id="hero-title"
            className="text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-light sm:text-7xl lg:text-8xl"
            variants={fadeIn('up', 'spring', 0.08, 0.5)}
            initial="hidden"
            animate="show"
          >
            Make security clear.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-pretty text-lg leading-8 text-light/65 sm:text-xl"
            variants={fadeIn('up', 'spring', 0.16, 0.5)}
            initial="hidden"
            animate="show"
          >
            Architecture, discovery, and software built for trust.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            variants={fadeIn('up', 'spring', 0.24, 0.5)}
            initial="hidden"
            animate="show"
          >
            <Button href="#projects">
              View work <HiArrowRight className="ml-2" aria-hidden />
            </Button>
            <Button
              href="/resume"
              target="_blank"
              rel="noreferrer"
              variant="outline"
            >
              See resume <FaFilePdf className="ml-2" aria-hidden />
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto w-full max-w-[18rem] sm:max-w-[21rem] lg:mx-0 lg:w-[25rem] lg:max-w-none"
          variants={fadeIn('left', 'spring', 0.2, 0.6)}
          initial="hidden"
          animate="show"
        >
          <VerificationOrbit />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
