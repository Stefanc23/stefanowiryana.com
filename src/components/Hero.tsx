'use client';

import { motion } from 'motion/react';
import { FaFilePdf } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

import Button from '@/components/Button';
import { fadeIn } from '@/utils/motions';

const Hero = () => {
  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden px-5 py-24 sm:px-8 md:min-h-[calc(100svh-5.25rem)] lg:px-10"
      aria-labelledby="hero-title"
    >
      <div className="relative mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1fr_auto] lg:items-end">
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
          className="hidden w-56 lg:block"
          variants={fadeIn('left', 'spring', 0.2, 0.6)}
          initial="hidden"
          animate="show"
        >
          <div className="relative aspect-square rounded-[2rem] border border-light/10 bg-light/[0.04] p-5">
            <div className="absolute inset-5 rounded-[1.35rem] border border-primary/45" />
            <div className="absolute inset-10 rounded-[1rem] bg-primary/10 blur-xl" />
            <div className="relative flex h-full flex-col justify-between">
              <span className="text-xs font-semibold tracking-[0.2em] text-light/45">
                STFN
              </span>
              <span className="text-5xl font-semibold tracking-tighter text-light">
                /01
              </span>
              <span className="text-xs leading-5 text-light/50">
                Secure by
                <br />
                design.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
