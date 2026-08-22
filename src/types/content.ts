export interface PortfolioImage {
  alt: string;
  height: number;
  lqip?: string;
  url: string;
  width: number;
}

export interface Skill {
  category: string;
  name: string;
}

export type HeroNodeSlot =
  | 'inner-north'
  | 'inner-east'
  | 'inner-south'
  | 'inner-west'
  | 'outer-northwest'
  | 'outer-northeast'
  | 'outer-southeast'
  | 'outer-southwest';

export interface HeroEvidence {
  label: string;
  value: string;
}

export interface HeroNode {
  body: string;
  category: string;
  evidence: HeroEvidence[];
  id: string;
  slot?: HeroNodeSlot;
  subtitle: string;
  tags: string[];
  title: string;
}

export interface HeroContent {
  description: string;
  eyebrow: string;
  headlineAccent: string;
  headlineLead: string;
  nodes: HeroNode[];
  overview: HeroNode;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

export interface AboutContent {
  bio: string;
  displayName: string;
  profileImage?: PortfolioImage;
  resumeUrl?: string;
  skills: Skill[];
  tagline: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate?: string;
  summary: string;
  highlights: string[];
  focusAreas: string[];
}

export type ProjectCategory =
  | 'Security'
  | 'Solution Engineering'
  | 'Cloud'
  | 'Web Development'
  | 'Product'
  | 'Research';

export interface ProjectImage extends PortfolioImage {
  caption?: string;
}

export interface ProjectApproachStep {
  description: string;
  title: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectSummary {
  _updatedAt?: string;
  category: ProjectCategory;
  coverImage?: ProjectImage;
  featured: boolean;
  projectDate: string;
  role: string;
  slug: string;
  sortOrder: number;
  summary: string;
  technologies: string[];
  title: string;
}

export interface ProjectDetail extends ProjectSummary {
  approach: ProjectApproachStep[];
  challenge: string;
  confidentialityNote?: string;
  duration: string;
  gallery: ProjectImage[];
  learnings: string[];
  liveUrl?: string;
  metrics: ProjectMetric[];
  outcomes: string[];
  projectContext: string;
  repositoryUrl?: string;
  solution: string;
}
