import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import {
  HiArrowLeft,
  HiArrowRight,
  HiArrowTopRightOnSquare,
  HiOutlineLockClosed,
} from 'react-icons/hi2';

import {
  getProjectBySlug,
  getProjectNavigation,
  getProjectRoutes,
} from '@/data/projectContent';
import type { ProjectDetail } from '@/types/content';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const baseUrl = 'https://stefanowiryana.com';

const formatProjectDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));

export const dynamicParams = true;

export async function generateStaticParams() {
  const routes = await getProjectRoutes();
  return routes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      metadataBase: new URL(baseUrl),
      title: 'Project not found',
      robots: { follow: false, index: false },
    };
  }

  const canonical = `${baseUrl}/projects/${project.slug}`;
  const socialImages = project.coverImage
    ? [
        {
          alt: project.coverImage.alt,
          height: project.coverImage.height,
          url: project.coverImage.url,
          width: project.coverImage.width,
        },
      ]
    : [];

  return {
    metadataBase: new URL(baseUrl),
    title: project.title,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      description: project.summary,
      images: socialImages,
      title: project.title,
      type: 'article',
      url: canonical,
    },
    twitter: {
      card: project.coverImage ? 'summary_large_image' : 'summary',
      description: project.summary,
      images: socialImages,
      title: project.title,
    },
  };
}

const SectionHeading = ({
  id,
  index,
  title,
}: {
  id: string;
  index: string;
  title: string;
}) => (
  <div className="mb-7 flex items-center gap-4">
    <span className="text-xs font-semibold tracking-[0.2em] text-primary-200">
      {index}
    </span>
    <span className="h-px w-10 bg-primary/45" aria-hidden="true" />
    <h2
      id={id}
      className="text-2xl font-semibold tracking-tight text-light sm:text-3xl"
    >
      {title}
    </h2>
  </div>
);

const ProjectMarker = ({ project }: { project: ProjectDetail }) => (
  <div
    className="relative min-h-72 overflow-hidden rounded-3xl border border-light/10 bg-gradient-to-br from-primary/25 via-secondary/10 to-obsidian sm:min-h-96"
    aria-hidden="true"
  >
    <div className="absolute inset-7 rounded-2xl border border-light/10" />
    <div className="absolute left-10 top-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
      <span className="h-px w-10 bg-secondary" />
      Project case study
    </div>
    <p className="absolute bottom-10 left-10 max-w-sm text-2xl font-semibold tracking-tight text-light/75 sm:text-3xl">
      {project.category}
    </p>
    <span className="absolute -bottom-8 right-0 text-[9rem] font-semibold leading-none tracking-[-0.08em] text-light/[0.055] sm:-bottom-10 sm:text-[15rem]">
      SW
    </span>
  </div>
);

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, navigation] = await Promise.all([
    getProjectBySlug(slug),
    getProjectNavigation(slug),
  ]);

  if (!project) notFound();

  const { next, previous } = navigation;

  return (
    <article className="relative pb-24 sm:pb-28">
      <header className="mx-auto w-full max-w-7xl px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-10 lg:pt-24">
        <Link
          href="/dev"
          className="inline-flex items-center gap-2 text-sm font-semibold text-light/58 transition hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        >
          <HiArrowLeft className="size-4" aria-hidden="true" />
          Back to projects
        </Link>

        <div className="mt-14 grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em]">
              <span className="text-primary-200">{project.category}</span>
              <span
                className="size-1 rounded-full bg-light/25"
                aria-hidden="true"
              />
              <span className="text-light/50">
                {formatProjectDate(project.projectDate)}
              </span>
            </div>
            <h1 className="mt-7 max-w-5xl text-balance text-[clamp(2.5rem,7vw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-light">
              {project.title}
            </h1>
            <p className="mt-8 max-w-3xl text-pretty text-lg leading-8 text-light/68 sm:text-xl sm:leading-9">
              {project.summary}
            </p>
          </div>

          <dl className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-5 gap-y-6 border-l border-light/10 pl-6 lg:grid-cols-1">
            <div className="min-w-0">
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary">
                Role
              </dt>
              <dd className="mt-2 break-words text-sm leading-6 text-light/70">
                {project.role}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary">
                Duration
              </dt>
              <dd className="mt-2 break-words text-sm leading-6 text-light/70">
                {project.duration}
              </dd>
            </div>
          </dl>
        </div>

        {(project.liveUrl || project.repositoryUrl) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-light px-4 py-3 text-sm font-semibold text-dark transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
              >
                View live project
                <HiArrowTopRightOnSquare
                  className="size-4"
                  aria-hidden="true"
                />
              </a>
            ) : null}
            {project.repositoryUrl ? (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-light/15 bg-light/[0.045] px-4 py-3 text-sm font-semibold text-light transition hover:border-secondary/50 hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
              >
                <FaGithub className="size-4" aria-hidden="true" />
                View repository
              </a>
            ) : null}
          </div>
        )}
      </header>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {project.coverImage ? (
          <figure>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-light/10 bg-obsidian shadow-[0_22px_70px_rgba(0,0,0,0.3)]">
              <Image
                src={project.coverImage.url}
                alt={project.coverImage.alt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                placeholder={project.coverImage.lqip ? 'blur' : 'empty'}
                blurDataURL={project.coverImage.lqip}
              />
            </div>
            {project.coverImage.caption ? (
              <figcaption className="mt-3 text-sm leading-6 text-light/50">
                {project.coverImage.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : (
          <ProjectMarker project={project} />
        )}
      </div>

      <div className="mx-auto mt-20 grid w-full max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20 lg:px-10">
        <div className="space-y-20">
          <section aria-labelledby="context-title">
            <SectionHeading
              id="context-title"
              index="01"
              title="Project context"
            />
            <p className="max-w-3xl whitespace-pre-line text-lg leading-9 text-light/70">
              {project.projectContext}
            </p>
            {project.confidentialityNote ? (
              <div className="mt-7 flex max-w-3xl gap-3 rounded-2xl border border-secondary/20 bg-secondary/[0.06] p-4 text-sm leading-6 text-light/65">
                <HiOutlineLockClosed
                  className="mt-1 size-4 shrink-0 text-secondary"
                  aria-hidden="true"
                />
                <p>{project.confidentialityNote}</p>
              </div>
            ) : null}
          </section>

          <section aria-labelledby="challenge-title">
            <SectionHeading
              id="challenge-title"
              index="02"
              title="The challenge"
            />
            <p className="max-w-3xl whitespace-pre-line text-lg leading-9 text-light/70">
              {project.challenge}
            </p>
          </section>

          <section aria-labelledby="approach-title">
            <SectionHeading
              id="approach-title"
              index="03"
              title="The approach"
            />
            <ol className="grid gap-4 sm:grid-cols-2">
              {project.approach.map((step, index) => (
                <li
                  key={`${step.title}-${index}`}
                  className="etched-border rounded-2xl bg-light/[0.035] p-6"
                >
                  <span className="text-xs font-semibold tracking-[0.18em] text-primary-200">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-light">
                    {step.title}
                  </h3>
                  <p className="mt-3 whitespace-pre-line leading-7 text-light/62">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="solution-title">
            <SectionHeading
              id="solution-title"
              index="04"
              title="The solution"
            />
            <p className="max-w-3xl whitespace-pre-line text-lg leading-9 text-light/70">
              {project.solution}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-lg border border-light/10 bg-light/[0.04] px-3 py-2 text-sm text-light/62"
                >
                  {technology}
                </span>
              ))}
            </div>
          </section>

          {project.gallery.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <figure
                  key={`${image.url}-${index}`}
                  className={index === 0 ? 'sm:col-span-2' : ''}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-light/10 bg-obsidian">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes={
                        index === 0
                          ? '(max-width: 1024px) 100vw, 900px'
                          : '(max-width: 640px) 100vw, 450px'
                      }
                      className="object-cover"
                      placeholder={image.lqip ? 'blur' : 'empty'}
                      blurDataURL={image.lqip}
                    />
                  </div>
                  {image.caption ? (
                    <figcaption className="mt-3 text-sm leading-6 text-light/50">
                      {image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : null}

          <section aria-labelledby="outcomes-title">
            <SectionHeading id="outcomes-title" index="05" title="Outcomes" />
            {project.metrics.length > 0 ? (
              <dl className="mb-8 grid gap-3 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div
                    key={`${metric.value}-${metric.label}`}
                    className="rounded-2xl border border-primary/20 bg-primary/[0.065] p-5"
                  >
                    <dd className="text-3xl font-semibold tracking-tight text-light">
                      {metric.value}
                    </dd>
                    <dt className="mt-2 text-sm leading-6 text-light/58">
                      {metric.label}
                    </dt>
                  </div>
                ))}
              </dl>
            ) : null}
            <ul className="space-y-4">
              {project.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex max-w-3xl gap-4 text-lg leading-8 text-light/70"
                >
                  <span className="mt-3 size-1.5 shrink-0 rounded-full bg-secondary" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="learnings-title">
            <SectionHeading id="learnings-title" index="06" title="Learnings" />
            <ul className="space-y-4">
              {project.learnings.map((learning) => (
                <li
                  key={learning}
                  className="etched-border max-w-3xl rounded-2xl bg-light/[0.025] p-5 leading-7 text-light/65"
                >
                  {learning}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-light/10 bg-light/[0.03] p-5 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Project file
          </p>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-xs text-light/45">Category</dt>
              <dd className="mt-1 text-sm leading-6 text-light/75">
                {project.category}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-light/45">Role</dt>
              <dd className="mt-1 text-sm leading-6 text-light/75">
                {project.role}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-light/45">Timeline</dt>
              <dd className="mt-1 text-sm leading-6 text-light/75">
                {project.duration}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className="mx-auto mt-24 w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="etched-border rounded-3xl bg-gradient-to-br from-light/[0.055] to-primary/10 p-7 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Continue the conversation
          </p>
          <div className="mt-5 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-light sm:text-4xl">
                Have a similar problem worth making clearer?
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-light/62">
                I work across security architecture, technical discovery, and
                practical software delivery.
              </p>
            </div>
            <a
              href="mailto:stefanowiryana@gmail.com"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-light px-5 py-3 text-sm font-semibold text-dark transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              Start a conversation
            </a>
          </div>
        </div>
      </section>

      {(previous || next) && (
        <nav
          className="mx-auto mt-6 grid w-full max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:px-10"
          aria-label="More project case studies"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group rounded-2xl border border-light/10 bg-light/[0.025] p-5 transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-light/45">
                <HiArrowLeft className="size-4" aria-hidden="true" /> Previous
              </span>
              <span className="mt-3 block text-lg font-semibold text-light transition group-hover:text-secondary">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group rounded-2xl border border-light/10 bg-light/[0.025] p-5 text-right transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              <span className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-light/45">
                Next <HiArrowRight className="size-4" aria-hidden="true" />
              </span>
              <span className="mt-3 block text-lg font-semibold text-light transition group-hover:text-secondary">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      )}
    </article>
  );
}
