import { cache } from 'react';

import { projects as mockProjects } from '@/data/mockContent';
import { isSanityConfigured } from '@/sanity/env';
import { clientFetch } from '@/sanity/lib/client';
import type {
  ProjectApproachStep,
  ProjectCategory,
  ProjectDetail,
  ProjectImage,
  ProjectMetric,
  ProjectSummary,
} from '@/types/content';

interface SanityProjectImage {
  alt?: string;
  caption?: string;
  height?: number;
  lqip?: string;
  url?: string;
  width?: number;
}

interface SanityProjectSummary {
  _updatedAt?: string;
  category?: string;
  coverImage?: SanityProjectImage;
  featured?: boolean;
  projectDate?: string;
  role?: string;
  slug?: string;
  sortOrder?: number;
  summary?: string;
  technologies?: string[];
  title?: string;
}

interface SanityProjectDetail extends SanityProjectSummary {
  approach?: ProjectApproachStep[];
  challenge?: string;
  confidentialityNote?: string;
  duration?: string;
  gallery?: SanityProjectImage[];
  learnings?: string[];
  liveUrl?: string;
  metrics?: ProjectMetric[];
  outcomes?: string[];
  projectContext?: string;
  repositoryUrl?: string;
  solution?: string;
}

interface SanityProjectRoute {
  _updatedAt?: string;
  slug?: string;
}

const projectCategories = new Set<ProjectCategory>([
  'Security',
  'Solution Engineering',
  'Cloud',
  'Web Development',
  'Product',
  'Research',
]);

const projectImageProjection = `{
  alt,
  caption,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`;

const validProjectFilter = `
  _type == "project" &&
  defined(title) &&
  defined(slug.current) &&
  defined(category) &&
  defined(summary) &&
  defined(projectDate) &&
  defined(role) &&
  defined(projectContext) &&
  defined(duration) &&
  count(technologies) > 0 &&
  defined(challenge) &&
  count(approach) > 0 &&
  defined(solution) &&
  count(outcomes) > 0 &&
  count(learnings) > 0
`;

const summaryProjection = `
  _updatedAt,
  title,
  "slug": slug.current,
  category,
  summary,
  projectDate,
  role,
  technologies,
  featured,
  sortOrder,
  "coverImage": coverImage ${projectImageProjection}
`;

const projectSummariesQuery = `
  *[${validProjectFilter}]
  | order(featured desc, sortOrder asc, projectDate desc, title asc) {
    ${summaryProjection}
  }
`;

const projectDetailQuery = `
  *[${validProjectFilter} && slug.current == $slug][0] {
    ${summaryProjection},
    projectContext,
    duration,
    challenge,
    approach[]{title, description},
    solution,
    outcomes,
    metrics[]{value, label},
    learnings,
    confidentialityNote,
    liveUrl,
    repositoryUrl,
    "gallery": gallery[] ${projectImageProjection}
  }
`;

const projectRoutesQuery = `
  *[${validProjectFilter}]
  | order(featured desc, sortOrder asc, projectDate desc, title asc) {
    _updatedAt,
    "slug": slug.current
  }
`;

const toImage = (
  image: SanityProjectImage | undefined,
): ProjectImage | undefined => {
  if (!image?.url || !image.alt || !image.height || !image.width)
    return undefined;

  return {
    alt: image.alt,
    caption: image.caption,
    height: image.height,
    lqip: image.lqip,
    url: image.url,
    width: image.width,
  };
};

const toSummary = (entry: SanityProjectSummary): ProjectSummary | null => {
  if (
    !entry.title ||
    !entry.slug ||
    !entry.category ||
    !projectCategories.has(entry.category as ProjectCategory) ||
    !entry.summary ||
    !entry.projectDate ||
    !entry.role ||
    !entry.technologies?.length
  ) {
    return null;
  }

  return {
    _updatedAt: entry._updatedAt,
    category: entry.category as ProjectCategory,
    coverImage: toImage(entry.coverImage),
    featured: entry.featured ?? false,
    projectDate: entry.projectDate,
    role: entry.role,
    slug: entry.slug,
    sortOrder: entry.sortOrder ?? 100,
    summary: entry.summary,
    technologies: entry.technologies,
    title: entry.title,
  };
};

const toDetail = (entry: SanityProjectDetail | null): ProjectDetail | null => {
  if (!entry) return null;

  const summary = toSummary(entry);
  if (
    !summary ||
    !entry.projectContext ||
    !entry.duration ||
    !entry.challenge ||
    !entry.approach?.length ||
    !entry.solution ||
    !entry.outcomes?.length ||
    !entry.learnings?.length
  ) {
    return null;
  }

  return {
    ...summary,
    approach: entry.approach,
    challenge: entry.challenge,
    confidentialityNote: entry.confidentialityNote,
    duration: entry.duration,
    gallery: (entry.gallery ?? [])
      .map((image) => toImage(image))
      .filter((image): image is ProjectImage => Boolean(image)),
    learnings: entry.learnings,
    liveUrl: entry.liveUrl,
    metrics: entry.metrics ?? [],
    outcomes: entry.outcomes,
    projectContext: entry.projectContext,
    repositoryUrl: entry.repositoryUrl,
    solution: entry.solution,
  };
};

const toMockSummary = (project: ProjectDetail): ProjectSummary => ({
  _updatedAt: project._updatedAt,
  category: project.category,
  coverImage: project.coverImage,
  featured: project.featured,
  projectDate: project.projectDate,
  role: project.role,
  slug: project.slug,
  sortOrder: project.sortOrder,
  summary: project.summary,
  technologies: project.technologies,
  title: project.title,
});

export const getProjectSummaries = cache(
  async (): Promise<ProjectSummary[]> => {
    if (!isSanityConfigured) return mockProjects.map(toMockSummary);

    try {
      const projects = await clientFetch<SanityProjectSummary[]>(
        projectSummariesQuery,
        { tags: ['sanity-content', 'sanity-projects'] },
      );

      return projects
        .map(toSummary)
        .filter((project): project is ProjectSummary => project !== null);
    } catch (error) {
      console.error('Sanity project summaries could not be loaded.', error);
      return [];
    }
  },
);

export const getProjectBySlug = cache(
  async (slug: string): Promise<ProjectDetail | null> => {
    if (!isSanityConfigured) {
      return mockProjects.find((project) => project.slug === slug) ?? null;
    }

    try {
      const project = await clientFetch<SanityProjectDetail | null>(
        projectDetailQuery,
        {
          params: { slug },
          tags: ['sanity-content', 'sanity-projects', `sanity-project-${slug}`],
        },
      );

      return toDetail(project);
    } catch (error) {
      console.error(`Sanity project “${slug}” could not be loaded.`, error);
      return null;
    }
  },
);

export const getProjectRoutes = cache(
  async (): Promise<Array<{ slug: string; updatedAt?: string }>> => {
    if (!isSanityConfigured) {
      return mockProjects.map((project) => ({
        slug: project.slug,
        updatedAt: project._updatedAt,
      }));
    }

    try {
      const routes = await clientFetch<SanityProjectRoute[]>(
        projectRoutesQuery,
        { tags: ['sanity-content', 'sanity-projects'] },
      );

      return routes
        .filter(
          (
            route,
          ): route is Required<Pick<SanityProjectRoute, 'slug'>> &
            SanityProjectRoute => Boolean(route.slug),
        )
        .map((route) => ({ slug: route.slug, updatedAt: route._updatedAt }));
    } catch (error) {
      console.error('Sanity project routes could not be loaded.', error);
      return [];
    }
  },
);

export const getProjectNavigation = async (slug: string) => {
  const projects = await getProjectSummaries();
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  if (currentIndex < 0) return { next: null, previous: null };

  return {
    next: projects[currentIndex + 1] ?? null,
    previous: projects[currentIndex - 1] ?? null,
  };
};
