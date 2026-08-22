import Image from 'next/image';
import Link from 'next/link';
import { HiArrowUpRight } from 'react-icons/hi2';

import Section from '@/components/Section';
import type { ProjectCategory, ProjectSummary } from '@/types/content';

interface ProjectsProps {
  data: ProjectSummary[];
}

const categoryTheme: Record<
  ProjectCategory,
  { glow: string; label: string; line: string }
> = {
  Security: {
    glow: 'from-primary/35 via-blood/15 to-transparent',
    label: 'text-primary-200',
    line: 'bg-primary',
  },
  'Solution Engineering': {
    glow: 'from-secondary/30 via-primary/10 to-transparent',
    label: 'text-secondary',
    line: 'bg-secondary',
  },
  Cloud: {
    glow: 'from-steel/25 via-primary/10 to-transparent',
    label: 'text-steel',
    line: 'bg-steel',
  },
  'Web Development': {
    glow: 'from-primary/25 via-secondary/10 to-transparent',
    label: 'text-primary-200',
    line: 'bg-primary-300',
  },
  Product: {
    glow: 'from-secondary/25 via-blood/10 to-transparent',
    label: 'text-secondary',
    line: 'bg-secondary-300',
  },
  Research: {
    glow: 'from-steel/25 via-secondary/10 to-transparent',
    label: 'text-steel',
    line: 'bg-steel',
  },
};

const formatProjectDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
    new Date(`${date}T00:00:00`),
  );

const ProjectVisual = ({
  index,
  project,
}: {
  index: number;
  project: ProjectSummary;
}) => {
  const theme = categoryTheme[project.category];

  if (project.coverImage) {
    return (
      <div className="relative min-h-64 w-full min-w-0 overflow-hidden bg-obsidian lg:min-h-full">
        <Image
          src={project.coverImage.url}
          alt={project.coverImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 46vw"
          className="object-cover transition duration-700 group-hover:scale-[1.025]"
          placeholder={project.coverImage.lqip ? 'blur' : 'empty'}
          blurDataURL={project.coverImage.lqip}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-dark/10" />
        <span className="absolute bottom-5 right-6 text-xs font-semibold tracking-[0.22em] text-light/65">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-56 w-full min-w-0 overflow-hidden bg-gradient-to-br ${theme.glow} lg:min-h-full`}
      aria-hidden="true"
    >
      <div className="absolute inset-5 rounded-2xl border border-light/10" />
      <div className="absolute left-8 top-8 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-light/55">
        <span className={`h-px w-8 ${theme.line}`} />
        Project file
      </div>
      <span className="absolute -bottom-8 right-0 text-[9rem] font-semibold leading-none tracking-[-0.08em] text-light/[0.055] sm:text-[11rem]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="absolute bottom-8 left-8 right-8">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.label}`}
        >
          {project.category}
        </p>
        <p className="mt-3 max-w-xs break-words text-sm leading-6 text-light/50">
          {project.role} · {formatProjectDate(project.projectDate)}
        </p>
      </div>
    </div>
  );
};

const Projects = ({ data }: ProjectsProps) => {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Work built to make complex things clearer."
      intro="Security, solution engineering, and web projects—documented through the decisions, tradeoffs, and outcomes behind them."
    >
      {data.length === 0 ? (
        <div className="etched-border rounded-3xl bg-light/[0.035] px-6 py-14 text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
            Case studies in progress
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-light sm:text-3xl">
            The next project stories are being prepared.
          </h3>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-light/65">
            Selected work will return here with the context, decisions, and
            outcomes behind each project.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((project, index) => {
            const isLead = index === 0 && project.featured;
            const theme = categoryTheme[project.category];

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`etched-border group relative isolate min-w-0 overflow-hidden rounded-3xl bg-light/[0.035] outline-none transition duration-300 hover:-translate-y-1 hover:border-primary/45 focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-4 focus-visible:ring-offset-dark ${
                  isLead ? 'md:col-span-2' : ''
                }`}
                aria-label={`Read the ${project.title} case study`}
              >
                <article
                  className={
                    isLead
                      ? 'grid min-h-[30rem] min-w-0 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'
                      : 'flex h-full min-h-[31rem] min-w-0 flex-col'
                  }
                >
                  <div
                    className={`relative flex flex-1 flex-col p-6 sm:p-8 ${
                      isLead ? 'lg:p-10' : ''
                    }`}
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${theme.glow} opacity-45`}
                      aria-hidden="true"
                    />
                    <div className="relative flex items-start justify-between gap-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`text-xs font-semibold uppercase tracking-[0.2em] ${theme.label}`}
                        >
                          {project.category}
                        </span>
                        {isLead ? (
                          <span className="rounded-full border border-secondary/30 bg-secondary/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-secondary">
                            Featured
                          </span>
                        ) : null}
                      </div>
                      <span className="text-xs tracking-[0.18em] text-light/45">
                        {formatProjectDate(project.projectDate)}
                      </span>
                    </div>

                    <div className="relative mt-14">
                      <p className="text-sm font-medium text-light/55">
                        {project.role}
                      </p>
                      <h3
                        className={`mt-4 max-w-3xl font-semibold leading-[1.06] tracking-[-0.035em] text-light ${
                          isLead
                            ? 'text-4xl sm:text-5xl lg:text-6xl'
                            : 'text-3xl sm:text-4xl'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={`mt-5 leading-8 text-light/68 ${
                          isLead ? 'max-w-2xl text-lg' : 'max-w-xl'
                        }`}
                      >
                        {project.summary}
                      </p>
                    </div>

                    <div className="relative mt-auto pt-10">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies
                          .slice(0, isLead ? 4 : 3)
                          .map((item) => (
                            <span
                              key={item}
                              className="rounded-lg border border-light/8 bg-dark/25 px-2.5 py-1.5 text-xs text-light/55"
                            >
                              {item}
                            </span>
                          ))}
                      </div>
                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition group-hover:text-light">
                        View case study
                        <HiArrowUpRight
                          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>

                  <ProjectVisual index={index} project={project} />
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </Section>
  );
};

export default Projects;
