import type { AboutContent, Experience, Project } from '@/types/content';

export const about: AboutContent = {
  displayName: 'Stefano Christian Wiryana',
  tagline: 'Security Solution Engineer / Web Developer',
  bio: 'I am a Solution Delivery Engineer, Zscaler Certified Sales Engineer, delivery consultant, and data security specialist. I help customers turn security requirements into workable technical decisions, from discovery through implementation.',
  skills: [
    { category: 'Security', name: 'Security architecture' },
    { category: 'Security', name: 'Threat modeling' },
    { category: 'Security', name: 'Application security' },
    { category: 'Security', name: 'Cloud security' },
    { category: 'Security', name: 'IAM concepts' },
    { category: 'Security', name: 'Secure SDLC' },
    { category: 'Solution Engineering', name: 'Technical discovery' },
    { category: 'Solution Engineering', name: 'Demo storytelling' },
    { category: 'Solution Engineering', name: 'Customer workshops' },
    { category: 'Solution Engineering', name: 'Requirements mapping' },
    { category: 'Solution Engineering', name: 'Executive communication' },
    { category: 'Solution Engineering', name: 'Value translation' },
    { category: 'Web Development', name: 'Next.js' },
    { category: 'Web Development', name: 'React' },
    { category: 'Web Development', name: 'TypeScript' },
    { category: 'Web Development', name: 'Tailwind CSS' },
    { category: 'Web Development', name: 'Sanity CMS' },
    { category: 'Web Development', name: 'Vercel' },
  ],
};

export const experiences: Experience[] = [
  {
    company: 'Security Solution Engineering Practice',
    role: 'Security Solution Engineer',
    location: 'Remote / Customer-facing',
    employmentType: 'Full-time',
    startDate: '2024-01-01',
    summary:
      'Lead technical discovery, solution design, and security architecture conversations for teams modernizing cloud and application security programs.',
    highlights: [
      'Translate ambiguous customer risks into scoped architectures, implementation paths, and executive-ready technical narratives.',
      'Partner with security, platform, and engineering stakeholders to align controls with the way products are actually built and operated.',
      'Bridge product capabilities with threat-informed use cases across application security, identity, cloud posture, and detection workflows.',
    ],
    focusAreas: ['Discovery', 'Architecture', 'Threat-informed design'],
  },
  {
    company: 'Web Engineering Portfolio',
    role: 'Full-stack Web Developer',
    location: 'Project-based',
    employmentType: 'Selected work',
    startDate: '2021-01-01',
    endDate: '2023-12-01',
    summary:
      'Built performant, maintainable web experiences with a strong eye for frontend quality, typed data contracts, and deployment workflows.',
    highlights: [
      'Delivered responsive interfaces using React, Next.js, TypeScript, Tailwind CSS, and modern component patterns.',
      'Modeled content for CMS-backed sites and separated presentation from data access so future edits stay low-friction.',
      'Focused on accessibility, clean interaction states, and production deployment hygiene.',
    ],
    focusAreas: ['Next.js', 'TypeScript', 'CMS-ready content'],
  },
  {
    company: 'Security Learning Lab',
    role: 'Cloud and App Security Practitioner',
    location: 'Hands-on research',
    employmentType: 'Continuous development',
    startDate: '2020-01-01',
    endDate: '2023-01-01',
    summary:
      'Developed practical security depth through cloud architecture reviews, application threat modeling, secure design practice, and lab-based validation.',
    highlights: [
      'Mapped common attack paths to practical mitigations that engineering teams can adopt without slowing delivery.',
      'Explored secure SDLC patterns, logging and monitoring design, IAM boundaries, and cloud-native security controls.',
      'Created concise technical explanations for mixed audiences across engineering, security, and business stakeholders.',
    ],
    focusAreas: ['Cloud security', 'Secure SDLC', 'Technical enablement'],
  },
];

export const projects: Project[] = [
  {
    name: 'Security Architecture Briefing Kit',
    category: 'Security',
    description:
      'A reusable discovery-to-design framework for turning customer security concerns into clear architectures, assumptions, and next steps.',
    impact:
      'Helps technical and non-technical stakeholders align on risk, tradeoffs, and implementation sequence.',
    technologies: ['Threat modeling', 'Solution design', 'Cloud security'],
  },
  {
    name: 'CMS-ready Portfolio System',
    category: 'Web',
    description:
      'A typed Next.js portfolio structure with local content today and a clean path to Sanity-powered experience and project data later.',
    impact:
      'Keeps the public site fast and deployable while making future content operations straightforward.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity'],
    repoLink: 'https://github.com/Stefanc23/stefanowiryana.com',
  },
  {
    name: 'Cloud Control Mapping Notes',
    category: 'Cloud',
    description:
      'A practical reference for mapping cloud risks to identity, network, logging, and workload controls in customer-facing conversations.',
    impact:
      'Turns sprawling cloud security topics into digestible decision points and implementation-ready guidance.',
    technologies: ['AWS', 'Azure', 'IAM', 'Security architecture'],
  },
  {
    name: 'Technical Discovery Playbook',
    category: 'Product',
    description:
      'A consultative workflow for qualifying pain, environment constraints, success criteria, and value proof during security evaluations.',
    impact:
      'Improves clarity in pre-sales and post-sales handoffs without losing the technical nuance engineers need.',
    technologies: ['Discovery', 'Enablement', 'Customer engineering'],
  },
];
