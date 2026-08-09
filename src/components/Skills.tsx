import Section from '@/components/Section';
import type { Skill } from '@/types/content';

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

interface SkillGroupsProps {
  skills?: Skill[];
}

export const SkillGroups = ({ skills }: SkillGroupsProps = {}) => {
  const groups = skills?.length
    ? Array.from(
        skills.reduce((groupedSkills, skill) => {
          const group = groupedSkills.get(skill.category) ?? [];
          group.push(skill.name);
          groupedSkills.set(skill.category, group);
          return groupedSkills;
        }, new Map<string, string[]>()),
        ([label, groupedSkillNames]) => ({
          label,
          skills: groupedSkillNames,
        }),
      )
    : skillGroups;

  return (
    <div className="grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group, index) => (
        <article
          key={group.label}
          className={`etched-border rounded-2xl bg-dark/58 p-5 sm:p-6 ${
            groups.length % 2 === 1 && index === groups.length - 1
              ? 'sm:col-span-2 lg:col-span-1'
              : ''
          }`}
        >
          <h4 className="text-lg font-semibold leading-7 tracking-tight text-secondary">
            {group.label}
          </h4>
          <div className="mt-5 flex flex-wrap gap-2">
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
};

const Skills = () => (
  <Section id="skills" eyebrow="Skills" title="Tools of the trade.">
    <SkillGroups />
  </Section>
);

export default Skills;
