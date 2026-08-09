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

export interface Project {
  name: string;
  category: 'Security' | 'Web' | 'Cloud' | 'Product';
  description: string;
  featured?: boolean;
  impact?: string;
  image?: PortfolioImage;
  projectDate?: string;
  responsibility?: string;
  sortOrder?: number;
  technologies: string[];
  repoLink?: string;
  demoLink?: string;
}
