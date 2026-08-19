'use client';

import { motion } from 'motion/react';
import { FaCode } from 'react-icons/fa';

import Section from '@/components/Section';
import { fadeIn } from '@/utils/motions';

const Projects = () => {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work is taking shape."
      intro="The next set of case studies is being curated with the same care as the work itself."
    >
      <motion.article
        className="etched-border relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-light/[0.06] via-light/[0.025] to-primary/[0.1] p-6 sm:p-10 lg:p-14"
        variants={fadeIn('up', 'spring', 0, 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          className="absolute -right-20 -top-24 -z-10 size-72 rounded-full bg-primary/15 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-28 -left-16 -z-10 size-64 rounded-full bg-secondary/10 blur-3xl"
          aria-hidden
        />

        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="grid size-16 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary-200 shadow-[0_0_36px_rgba(245,129,72,0.16)] sm:size-20">
            <FaCode className="size-7 sm:size-8" aria-hidden />
          </span>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.24em] text-primary-200">
            Work in progress
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-light sm:text-4xl">
            The project shelf is being rebuilt.
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-8 text-light/65 sm:text-lg">
            I&apos;m turning selected security, solution engineering, and web
            work into concise case studies with the context, decisions, and
            outcomes behind each project.
          </p>

          <div
            className="mt-8 grid w-full gap-3 text-left sm:grid-cols-3"
            aria-label="Project collection status"
          >
            {[
              ['Research', 'Gathering source material'],
              ['Structure', 'Shaping the case studies'],
              ['Publish', 'Coming to this space soon'],
            ].map(([label, detail], index) => (
              <div
                key={label}
                className="rounded-2xl border border-light/10 bg-dark/25 p-4"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`size-2 rounded-full ${index === 2 ? 'bg-light/25' : 'bg-secondary'}`}
                    aria-hidden
                  />
                  <span className="text-sm font-semibold text-light/85">
                    {label}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-light/50">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.article>
    </Section>
  );
};

export default Projects;
