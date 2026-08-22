import { hero as mockHero } from '@/data/heroContent';
import {
  about as mockAbout,
  experiences as mockExperiences,
} from '@/data/mockContent';
import { isSanityConfigured } from '@/sanity/env';
import { clientFetch } from '@/sanity/lib/client';
import type {
  AboutContent,
  Experience,
  HeroContent,
  HeroEvidence,
  HeroNode,
  HeroNodeSlot,
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
  hero?: SanityHero;
  profileImage?: SanityImageAsset;
  resumeUrl?: string;
  skills?: Skill[];
  tagline?: string;
}

interface SanityHeroEvidence {
  label?: string;
  value?: string;
}

interface SanityHeroNode {
  _key?: string;
  body?: string;
  category?: string;
  evidence?: SanityHeroEvidence[];
  slot?: string;
  subtitle?: string;
  tags?: string[];
  title?: string;
}

interface SanityHero {
  description?: string;
  eyebrow?: string;
  headlineAccent?: string;
  headlineLead?: string;
  nodes?: SanityHeroNode[];
  overview?: SanityHeroNode;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
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
    hero{
      eyebrow,
      headlineLead,
      headlineAccent,
      description,
      primaryCtaLabel,
      secondaryCtaLabel,
      overview{
        category,
        title,
        subtitle,
        body,
        evidence[]{value, label},
        tags
      },
      nodes[]{
        _key,
        slot,
        category,
        title,
        subtitle,
        body,
        evidence[]{value, label},
        tags
      }
    },
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

const heroNodeSlots = new Set<HeroNodeSlot>([
  'inner-north',
  'inner-east',
  'inner-south',
  'inner-west',
  'outer-northwest',
  'outer-northeast',
  'outer-southeast',
  'outer-southwest',
]);

const isHeroNodeSlot = (slot?: string): slot is HeroNodeSlot =>
  Boolean(slot && heroNodeSlots.has(slot as HeroNodeSlot));

const toEvidence = (
  entries: SanityHeroEvidence[] | undefined,
  fallback: HeroEvidence[],
): HeroEvidence[] => {
  if (!entries) return fallback;

  return entries
    .filter((entry) => entry.value?.trim() && entry.label?.trim())
    .slice(0, 2)
    .map((entry) => ({
      label: entry.label!.trim(),
      value: entry.value!.trim(),
    }));
};

const toHeroNode = (
  entry: SanityHeroNode | undefined,
  fallback: HeroNode,
): HeroNode => ({
  body: entry?.body?.trim() || fallback.body,
  category: entry?.category?.trim() || fallback.category,
  evidence: toEvidence(entry?.evidence, fallback.evidence),
  id: entry?._key?.trim() || fallback.id,
  slot: isHeroNodeSlot(entry?.slot) ? entry.slot : fallback.slot,
  subtitle: entry?.subtitle?.trim() || fallback.subtitle,
  tags:
    entry?.tags
      ?.map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 8) ?? fallback.tags,
  title: entry?.title?.trim() || fallback.title,
});

const toHero = (entry?: SanityHero): HeroContent => {
  if (!entry) return mockHero;

  const entriesBySlot = new Map(
    entry.nodes
      ?.filter((node) => isHeroNodeSlot(node.slot))
      .map((node) => [node.slot as HeroNodeSlot, node]) ?? [],
  );

  return {
    description: entry.description?.trim() || mockHero.description,
    eyebrow: entry.eyebrow?.trim() || mockHero.eyebrow,
    headlineAccent: entry.headlineAccent?.trim() || mockHero.headlineAccent,
    headlineLead: entry.headlineLead?.trim() || mockHero.headlineLead,
    nodes: mockHero.nodes.map((fallback) =>
      toHeroNode(
        fallback.slot ? entriesBySlot.get(fallback.slot) : undefined,
        fallback,
      ),
    ),
    overview: toHeroNode(entry.overview, mockHero.overview),
    primaryCtaLabel: entry.primaryCtaLabel?.trim() || mockHero.primaryCtaLabel,
    secondaryCtaLabel:
      entry.secondaryCtaLabel?.trim() || mockHero.secondaryCtaLabel,
  };
};

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
  hero: HeroContent;
}> => {
  if (!isSanityConfigured) {
    return {
      about: mockAbout,
      experiences: mockExperiences,
      hero: mockHero,
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
      hero: toHero(sanityContent.about?.hero),
    };
  } catch (error) {
    console.error('Sanity content fetch failed; using local fallback.', error);
    return {
      about: mockAbout,
      experiences: mockExperiences,
      hero: mockHero,
    };
  }
};
