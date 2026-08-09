'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
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

  const getPrimaryAction = (project: Project) => {
    if (project.demoLink) {
      return { href: project.demoLink, label: 'View project', external: true };
    }

    if (project.repoLink) {
      return { href: project.repoLink, label: 'View source', external: true };
    }

    return { href: '#contact', label: 'Discuss this work', external: false };
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
            className="etched-border group flex min-h-72 flex-col justify-between overflow-hidden rounded-2xl bg-light/[0.035] p-6 transition-colors duration-300 hover:border-primary/45 sm:p-7"
          >
            <div>
              {project.image && (
                <div className="relative -mx-6 -mt-6 mb-6 aspect-video overflow-hidden border-b border-light/10 bg-obsidian sm:-mx-7 sm:-mt-7">
                  <Image
                    src={project.image.url}
                    alt={project.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    placeholder={project.image.lqip ? 'blur' : 'empty'}
                    blurDataURL={project.image.lqip}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/45 to-transparent" />
                </div>
              )}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">
                    {project.category}
                  </span>
                  {project.featured ? (
                    <span className="rounded-full border border-secondary/35 bg-secondary/10 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-secondary">
                      Featured
                    </span>
                  ) : null}
                </div>
                {(project.repoLink || project.demoLink) && (
                  <div className="flex gap-3 text-light/55">
                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.name} source`}
                        className="transition hover:text-light"
                      >
                        <FaCode aria-hidden />
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noreferrer"
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
              {project.responsibility || project.projectDate ? (
                <p className="mt-4 text-sm leading-6 text-light/55">
                  {project.responsibility}
                  {project.responsibility && project.projectDate ? ' · ' : ''}
                  {project.projectDate
                    ? new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        year: 'numeric',
                      }).format(new Date(project.projectDate))
                    : ''}
                </p>
              ) : null}
            </div>
            {(project.impact || project.technologies.length > 0) && (
              <div className="mt-8">
                {project.impact && (
                  <p className="border-l-2 border-primary/70 pl-3 text-sm leading-6 text-light/55">
                    {project.impact}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div
                    className={`${project.impact ? 'mt-5 ' : ''}flex flex-wrap gap-2`}
                  >
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md bg-light/[0.07] px-2.5 py-1 text-xs text-light/60"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            <a
              href={getPrimaryAction(project).href}
              target={getPrimaryAction(project).external ? '_blank' : undefined}
              rel={
                getPrimaryAction(project).external ? 'noreferrer' : undefined
              }
              className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-secondary transition hover:text-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              {getPrimaryAction(project).label}
              <FaExternalLinkAlt className="size-3" aria-hidden />
            </a>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
};

export default Projects;
