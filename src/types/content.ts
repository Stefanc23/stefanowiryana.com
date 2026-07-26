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
  impact: string;
  technologies: string[];
  repoLink?: string;
  demoLink?: string;
}
