'use client';

import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa';

import Section from '@/components/Section';
import type { Project } from '@/types/content';
import { fadeIn } from '@/utils/motions';

interface ProjectsProps {
  data: Project[];
}

const Projects = ({ data }: ProjectsProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = useMemo(
    () => [
      'All',
      ...Array.from(new Set(data.map((project) => project.category))),
    ],
    [data],
  );
  const filteredProjects =
    selectedCategory === 'All'
      ? data
      : data.filter((project) => project.category === selectedCategory);
  const cardTransition = {
    duration: 0.52,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work."
      intro="Security thinking, product clarity, and web craft."
    >
      <motion.div
        className="mb-8 flex gap-2 overflow-x-auto pb-1"
        variants={fadeIn('up', 'spring', 0, 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categories.map((category) => {
          const isSelected = category === selectedCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={isSelected}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${isSelected ? 'bg-light text-dark' : 'border border-light/15 bg-light/[0.035] text-light/65 hover:border-light/35 hover:text-light'}`}
            >
              {category}
            </button>
          );
        })}
      </motion.div>

      <motion.div key={selectedCategory} className="grid gap-4 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cardTransition}
            className="etched-border group flex min-h-72 flex-col justify-between rounded-2xl bg-light/[0.035] p-6 transition-colors duration-300 hover:-translate-y-1 hover:border-primary/45 sm:p-7"
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">
                  {project.category}
                </span>
                {(project.repoLink || project.demoLink) && (
                  <div className="flex gap-3 text-light/55">
                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        aria-label={`View ${project.name} source`}
                        className="transition hover:text-light"
                      >
                        <FaCode aria-hidden />
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        aria-label={`Open ${project.name} demo`}
                        className="transition hover:text-light"
                      >
                        <FaExternalLinkAlt aria-hidden />
                      </a>
                    )}
                  </div>
                )}
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-light sm:text-3xl">
                {project.name}
              </h3>
              <p className="mt-3 max-w-lg leading-7 text-light/65">
                {project.description}
              </p>
            </div>
            <div className="mt-8">
              <p className="border-l-2 border-primary/70 pl-3 text-sm leading-6 text-light/55">
                {project.impact}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md bg-light/[0.07] px-2.5 py-1 text-xs text-light/60"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
};

export default Projects;
