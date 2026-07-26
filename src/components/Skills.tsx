import Section from '@/components/Section';

const skillGroups = [
  {
    label: 'Security',
    skills: [
      'Security architecture',
      'Threat modeling',
      'Application security',
      'Cloud security',
      'IAM concepts',
      'Secure SDLC',
    ],
  },
  {
    label: 'Solution Engineering',
    skills: [
      'Technical discovery',
      'Demo storytelling',
      'Customer workshops',
      'Requirements mapping',
      'Executive communication',
      'Value translation',
    ],
  },
  {
    label: 'Web Development',
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Sanity CMS',
      'Vercel',
    ],
  },
];

export const SkillGroups = () => (
  <div className="grid gap-4 lg:grid-cols-3">
    {skillGroups.map((group) => (
      <article
        key={group.label}
        className="etched-border rounded-2xl bg-dark/58 p-5"
      >
        <h3 className="text-lg font-semibold tracking-tight text-secondary">
          {group.label}
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-light/10 bg-light/[0.045] px-2.5 py-1.5 text-xs text-light/72"
            >
              {skill}
            </span>
          ))}
        </div>
      </article>
    ))}
  </div>
);

const Skills = () => (
  <Section id="skills" eyebrow="Skills" title="Tools of the trade.">
    <SkillGroups />
  </Section>
);

export default Skills;
