import type {
  AboutContent,
  Experience,
  PortfolioImage,
  ProjectDetail,
} from '@/types/content';

const profileImage: PortfolioImage = {
  alt: 'Stefano Christian Wiryana',
  height: 1357,
  url: 'https://cdn.sanity.io/images/wm1dtx2w/production/92649c14605cc4e17c52d027b113cef9534a95fd-904x1357.jpg',
  width: 904,
};

export const about: AboutContent = {
  displayName: 'Stefano Christian Wiryana',
  profileImage,
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

export const projects: ProjectDetail[] = [
  {
    title: 'Security Architecture Briefing Kit',
    slug: 'security-architecture-briefing-kit',
    category: 'Security',
    summary:
      'A reusable discovery-to-design framework for turning customer security concerns into clear architectures, assumptions, and next steps.',
    projectDate: '2025-12-01',
    role: 'Security Solution Engineer',
    projectContext:
      'A reusable customer-facing practice for structuring security discovery and architecture conversations.',
    duration: 'Ongoing practice',
    technologies: ['Threat modeling', 'Solution design', 'Cloud security'],
    featured: true,
    sortOrder: 10,
    challenge:
      'Security conversations often begin with broad risk statements, incomplete environmental context, and stakeholders who need different levels of detail. The work needed a repeatable way to move from those inputs to a clear, defensible architecture discussion.',
    approach: [
      {
        title: 'Frame the decision',
        description:
          'Translate the initial concern into explicit risks, assumptions, stakeholders, and success criteria before discussing controls.',
      },
      {
        title: 'Map the environment',
        description:
          'Connect identities, applications, data flows, trust boundaries, and operational constraints to the risks under discussion.',
      },
      {
        title: 'Sequence the response',
        description:
          'Organize recommendations into practical next steps with clear tradeoffs and ownership rather than an undifferentiated control list.',
      },
    ],
    solution:
      'The resulting briefing kit combines discovery prompts, a threat-informed architecture frame, explicit assumptions, and a sequenced recommendation format. It keeps technical depth available while giving mixed audiences a shared structure for making decisions.',
    outcomes: [
      'Helps technical and non-technical stakeholders align on risk, tradeoffs, and implementation sequence.',
      'Creates a consistent bridge between discovery findings and architecture recommendations.',
    ],
    metrics: [],
    learnings: [
      'Architecture guidance is easier to act on when every recommendation is tied to a named risk and constraint.',
      'A visible assumptions list prevents early ambiguity from becoming hidden implementation debt.',
    ],
    gallery: [],
  },
  {
    title: 'CMS-ready Portfolio System',
    slug: 'cms-ready-portfolio-system',
    category: 'Web Development',
    summary:
      'A typed Next.js portfolio structure with local content today and a clean path to Sanity-powered experience and project data later.',
    projectDate: '2026-08-01',
    role: 'Designer and Full-stack Developer',
    projectContext:
      'A personal portfolio built to combine a distinctive public experience with maintainable content operations.',
    duration: 'Iterative build',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity'],
    featured: false,
    sortOrder: 20,
    challenge:
      'The portfolio needed to stay fast and expressive while moving professional content out of presentation components. It also needed to remain useful in local previews when a Sanity project was unavailable.',
    approach: [
      {
        title: 'Separate content from presentation',
        description:
          'Define typed public contracts and map CMS responses at the server boundary instead of exposing raw documents to components.',
      },
      {
        title: 'Design resilient fallbacks',
        description:
          'Keep factual local content for unconfigured development environments while treating the configured CMS as the production source of truth.',
      },
      {
        title: 'Connect publishing to freshness',
        description:
          'Use tagged server fetching and a signed webhook so published changes can invalidate the relevant pages without a full redeploy.',
      },
    ],
    solution:
      'The system uses the Next.js App Router, typed content models, Sanity Studio, optimized Sanity images, and signed revalidation. Presentation components receive normalized data and remain independent of the underlying CMS document shape.',
    outcomes: [
      'Keeps the public site fast and deployable while making future content operations straightforward.',
      'Supports meaningful local previews without exposing CMS credentials to the browser.',
    ],
    metrics: [],
    learnings: [
      'A small normalization layer keeps content evolution from leaking across the component tree.',
      'Fallback behavior should differ clearly between an unconfigured local environment and an empty configured dataset.',
    ],
    gallery: [],
    repositoryUrl: 'https://github.com/Stefanc23/stefanowiryana.com',
  },
  {
    title: 'Cloud Control Mapping Notes',
    slug: 'cloud-control-mapping-notes',
    category: 'Cloud',
    summary:
      'A practical reference for mapping cloud risks to identity, network, logging, and workload controls in customer-facing conversations.',
    projectDate: '2025-06-01',
    role: 'Cloud Security Practitioner',
    projectContext:
      'Hands-on research notes designed to support clearer cloud security reviews and customer conversations.',
    duration: 'Ongoing research',
    technologies: ['AWS', 'Azure', 'IAM', 'Security architecture'],
    featured: false,
    sortOrder: 30,
    challenge:
      'Cloud security reviews can become long inventories of services and controls without showing how identities, workloads, networks, and evidence connect to a concrete risk. The notes needed to preserve technical nuance while making those connections easier to discuss.',
    approach: [
      {
        title: 'Start with risk',
        description:
          'Group the material around attack paths and failure modes instead of individual cloud products.',
      },
      {
        title: 'Map control layers',
        description:
          'Relate each risk to identity, network, workload, logging, and governance controls that can be reviewed together.',
      },
      {
        title: 'Turn notes into decisions',
        description:
          'Record questions, evidence, tradeoffs, and practical next steps so the reference supports an architecture conversation.',
      },
    ],
    solution:
      'The reference organizes cloud security topics into risk-led control maps with review prompts for identity boundaries, workload protections, network paths, evidence, and operational ownership.',
    outcomes: [
      'Turns sprawling cloud security topics into digestible decision points and implementation-ready guidance.',
      'Provides a reusable structure for comparing cloud controls without losing their architectural context.',
    ],
    metrics: [],
    learnings: [
      'Control names are less useful than the failure modes and evidence they are expected to address.',
      'Cloud recommendations become more practical when operational ownership is captured alongside technical design.',
    ],
    gallery: [],
  },
  {
    title: 'Technical Discovery Playbook',
    slug: 'technical-discovery-playbook',
    category: 'Solution Engineering',
    summary:
      'A consultative workflow for qualifying pain, environment constraints, success criteria, and value proof during security evaluations.',
    projectDate: '2025-10-01',
    role: 'Solution Delivery Engineer',
    projectContext:
      'A reusable workflow for customer-facing technical discovery and security evaluations.',
    duration: 'Ongoing practice',
    technologies: ['Discovery', 'Enablement', 'Customer engineering'],
    featured: false,
    sortOrder: 40,
    challenge:
      'Technical evaluations lose momentum when pain, environment constraints, decision criteria, and ownership are captured in separate conversations. The workflow needed to preserve engineering detail while creating a shared definition of success.',
    approach: [
      {
        title: 'Qualify the problem',
        description:
          'Clarify the triggering pain, affected stakeholders, current workflow, and consequence of leaving it unresolved.',
      },
      {
        title: 'Expose constraints',
        description:
          'Document architecture, integration, security, operational, and timing constraints before defining the evaluation path.',
      },
      {
        title: 'Design the proof',
        description:
          'Translate success criteria into observable scenarios, evidence, owners, and next-step decisions.',
      },
    ],
    solution:
      'The playbook provides a structured discovery sequence and a concise handoff format covering customer pain, technical context, constraints, success evidence, ownership, and the decisions required after an evaluation.',
    outcomes: [
      'Improves clarity in pre-sales and post-sales handoffs without losing the technical nuance engineers need.',
      'Keeps evaluation activity connected to explicit customer outcomes and decision criteria.',
    ],
    metrics: [],
    learnings: [
      'Success criteria are stronger when they describe observable evidence rather than product activity.',
      'Explicitly recording unknowns makes discovery more credible and gives follow-up work a clear owner.',
    ],
    gallery: [],
  },
];
