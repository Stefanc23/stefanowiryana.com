import {
  experiences as mockExperiences,
  projects as mockProjects,
} from '@/data/mockContent';
import { isSanityConfigured } from '@/sanity/env';
import type { Experience, Project } from '@/types/content';
import { fetchExperienceData } from '@/utils/fetchExperienceData';
import { fetchProjectData } from '@/utils/fetchProjectData';

interface SanityExperience {
  company?: string;
  description?: string;
  employmentType?: string;
  endDate?: string;
  focusAreas?: string[];
  highlights?: string[];
  location?: string;
  role?: string;
  startDate?: string;
  summary?: string;
}

interface SanityProject {
  category?: string;
  demoLink?: string;
  description?: string;
  impact?: string;
  name?: string;
  repoLink?: string;
  technologies?: string[];
}

const projectCategories: Record<string, Project['category']> = {
  Cloud: 'Cloud',
  Mobile: 'Product',
  Other: 'Product',
  Product: 'Product',
  Security: 'Security',
  Web: 'Web',
};

const toExperience = (entry: SanityExperience): Experience | null => {
  if (!entry.company || !entry.role || !entry.startDate) return null;

  const summary = entry.summary ?? entry.description;
  if (!summary) return null;

  return {
    company: entry.company,
    employmentType: entry.employmentType ?? 'Professional experience',
    endDate: entry.endDate,
    focusAreas: entry.focusAreas ?? [],
    highlights: entry.highlights ?? [],
    location: entry.location ?? 'Remote',
    role: entry.role,
    startDate: entry.startDate,
    summary,
  };
};

const toProject = (entry: SanityProject): Project | null => {
  if (!entry.name || !entry.description) return null;

  return {
    category: projectCategories[entry.category ?? ''] ?? 'Product',
    demoLink: entry.demoLink,
    description: entry.description,
    impact: entry.impact ?? 'Details available on request.',
    name: entry.name,
    repoLink: entry.repoLink,
    technologies: entry.technologies ?? [],
  };
};

export const getPortfolioContent = async (): Promise<{
  experiences: Experience[];
  projects: Project[];
}> => {
  if (!isSanityConfigured) {
    return { experiences: mockExperiences, projects: mockProjects };
  }

  try {
    const [sanityExperiences, sanityProjects] = await Promise.all([
      fetchExperienceData(),
      fetchProjectData(),
    ]);
    const experiences = (sanityExperiences as SanityExperience[])
      .map(toExperience)
      .filter((entry): entry is Experience => entry !== null);
    const projects = (sanityProjects as SanityProject[])
      .map(toProject)
      .filter((entry): entry is Project => entry !== null);

    return {
      experiences: experiences.length > 0 ? experiences : mockExperiences,
      projects: projects.length > 0 ? projects : mockProjects,
    };
  } catch {
    return { experiences: mockExperiences, projects: mockProjects };
  }
};
