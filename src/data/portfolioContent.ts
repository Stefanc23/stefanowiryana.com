import {
  about as mockAbout,
  experiences as mockExperiences,
} from '@/data/mockContent';
import { isSanityConfigured } from '@/sanity/env';
import { clientFetch } from '@/sanity/lib/client';
import type {
  AboutContent,
  Experience,
  PortfolioImage,
  Skill,
} from '@/types/content';

interface SanityImageAsset {
  metadata?: {
    dimensions?: {
      height?: number;
      width?: number;
    };
    lqip?: string;
  };
  url?: string;
}

interface SanityAbout {
  bio?: string;
  displayName?: string;
  profileImage?: SanityImageAsset;
  resumeUrl?: string;
  skills?: Skill[];
  tagline?: string;
}

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

interface SanityPortfolioResponse {
  about?: SanityAbout;
  experiences?: SanityExperience[];
}

const portfolioQuery = `{
  "about": *[_type == "about"][0]{
    displayName,
    tagline,
    bio,
    skills[]{name, category},
    "profileImage": profileImage.asset->{url, metadata{dimensions, lqip}},
    "resumeUrl": resumeFile.asset->url
  },
  "experiences": (*[_type == "experience"] | order(startDate desc)){
    role,
    company,
    startDate,
    endDate,
    location,
    employmentType,
    description,
    summary,
    highlights,
    focusAreas
  }
}`;

const toImage = (
  asset: SanityImageAsset | undefined,
  alt: string,
): PortfolioImage | undefined => {
  const height = asset?.metadata?.dimensions?.height;
  const width = asset?.metadata?.dimensions?.width;

  if (!asset?.url || !height || !width) return undefined;

  return {
    alt,
    height,
    lqip: asset.metadata?.lqip,
    url: asset.url,
    width,
  };
};

const toAbout = (entry?: SanityAbout): AboutContent => {
  if (!entry) return mockAbout;

  const displayName = entry.displayName?.trim() || mockAbout.displayName;
  const skills = entry.skills?.filter((skill) => skill.name && skill.category);

  return {
    bio: entry.bio?.trim() || mockAbout.bio,
    displayName,
    profileImage:
      toImage(entry.profileImage, displayName) ?? mockAbout.profileImage,
    resumeUrl: entry.resumeUrl,
    skills: skills?.length ? skills : mockAbout.skills,
    tagline: entry.tagline?.trim() || mockAbout.tagline,
  };
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

export const getPortfolioContent = async (): Promise<{
  about: AboutContent;
  experiences: Experience[];
}> => {
  if (!isSanityConfigured) {
    return {
      about: mockAbout,
      experiences: mockExperiences,
    };
  }

  try {
    const sanityContent =
      await clientFetch<SanityPortfolioResponse>(portfolioQuery);
    const experiences = (sanityContent.experiences ?? [])
      .map(toExperience)
      .filter((entry): entry is Experience => entry !== null);
    return {
      about: toAbout(sanityContent.about),
      experiences: experiences.length > 0 ? experiences : mockExperiences,
    };
  } catch (error) {
    console.error('Sanity content fetch failed; using local fallback.', error);
    return {
      about: mockAbout,
      experiences: mockExperiences,
    };
  }
};
