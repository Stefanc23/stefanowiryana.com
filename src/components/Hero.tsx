'use client';

import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

import Button from '@/components/Button';
import HeroCapabilityGraph from '@/components/HeroCapabilityGraph';
import HeroDetailDialog from '@/components/HeroDetailDialog';
import type { HeroContent, HeroNode } from '@/types/content';
import { fadeIn } from '@/utils/motions';

interface HeroProps {
  data: HeroContent;
}

const Hero = ({ data }: HeroProps) => {
  const [selectedNode, setSelectedNode] = useState<HeroNode | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const openDetails = (node: HeroNode, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger;
    setSelectedNode(node);
  };

  const dismissDetails = () => {
    setSelectedNode(null);
    window.requestAnimationFrame(() => lastTrigger.current?.focus());
  };

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden px-5 py-14 sm:px-8 sm:py-18 md:min-h-[calc(100svh-5.25rem)] lg:px-10 xl:py-16"
      aria-labelledby="hero-title"
    >
      <div
        className="pointer-events-none absolute top-[12%] right-[-12rem] size-[34rem] rounded-full bg-primary/8 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 xl:grid-cols-12 xl:items-center xl:gap-8">
        <div className="relative z-20 xl:col-span-5 xl:pr-4">
          <motion.p
            className="text-xs font-semibold tracking-[0.22em] text-primary-200 uppercase"
            variants={fadeIn('up', 'spring', 0, 0.45)}
            initial="hidden"
            animate="show"
          >
            {data.eyebrow}
          </motion.p>
          <motion.h1
            id="hero-title"
            className="mt-6 w-full max-w-5xl text-[clamp(2.5rem,12vw,3.5rem)] leading-[0.94] font-semibold tracking-[-0.055em] text-light"
            variants={fadeIn('up', 'spring', 0.08, 0.5)}
            initial="hidden"
            animate="show"
          >
            <span className="block xl:whitespace-nowrap">
              {data.headlineLead}
            </span>
            <span className="block bg-linear-to-br from-primary via-primary-300 to-secondary bg-clip-text text-transparent xl:whitespace-nowrap">
              {data.headlineAccent}
            </span>
          </motion.h1>
          <motion.p
            className="mt-7 max-w-xl text-pretty text-lg leading-8 text-light/70 sm:text-xl sm:leading-9"
            variants={fadeIn('up', 'spring', 0.16, 0.5)}
            initial="hidden"
            animate="show"
          >
            {data.description}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 xl:flex-row xl:flex-wrap"
            variants={fadeIn('up', 'spring', 0.24, 0.5)}
            initial="hidden"
            animate="show"
          >
            <button
              type="button"
              className="group inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-linear-to-r from-primary-300 to-secondary px-6 text-sm font-semibold text-dark shadow-[0_16px_44px_rgba(245,129,72,0.2)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_20px_52px_rgba(245,129,72,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary xl:w-auto xl:min-w-56"
              aria-haspopup="dialog"
              aria-expanded={selectedNode?.id === data.overview.id}
              onClick={(event) =>
                openDetails(data.overview, event.currentTarget)
              }
            >
              {data.primaryCtaLabel}
              <HiArrowRight
                className="ml-2 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </button>
            <Button
              href="/resume"
              target="_blank"
              rel="noreferrer"
              variant="outline"
              className="group w-full xl:w-auto xl:min-w-48"
            >
              {data.secondaryCtaLabel}
              <FaFilePdf
                className="ml-2 transition-transform group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 mx-auto w-full max-w-[46rem] xl:col-span-7 xl:max-w-none"
          variants={fadeIn('left', 'spring', 0.18, 0.6)}
          initial="hidden"
          animate="show"
        >
          <HeroCapabilityGraph
            data={data}
            activeNodeId={selectedNode?.id}
            onSelect={openDetails}
          />
        </motion.div>
      </div>

      <HeroDetailDialog node={selectedNode} onDismiss={dismissDetails} />
    </section>
  );
};

export default Hero;
