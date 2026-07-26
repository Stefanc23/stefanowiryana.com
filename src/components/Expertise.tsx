import Section from '@/components/Section';

const expertise = [
  {
    title: 'Security Architecture',
    copy: 'Design secure solution paths across identity, cloud, application, data, and detection surfaces.',
  },
  {
    title: 'Technical Discovery',
    copy: 'Ask precise questions, expose hidden constraints, and turn customer pain into scoped next steps.',
  },
  {
    title: 'Threat-informed Thinking',
    copy: 'Map realistic attack paths to controls and explain why a recommendation matters in context.',
  },
  {
    title: 'Web Engineering',
    copy: 'Build fast, accessible interfaces with typed data, reusable components, and deployment-ready structure.',
  },
];

const Expertise = () => {
  return (
    <Section
      id="expertise"
      eyebrow="Security / Solution Engineering"
      title="From risk to reality."
      intro="Technical depth, customer context, and an instinct to make things usable."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {expertise.map((item) => (
          <article
            key={item.title}
            className="etched-border group relative overflow-hidden bg-light/[0.035] p-6 transition duration-300 hover:border-secondary/50"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent opacity-0 transition group-hover:opacity-100" />
            <h3 className="text-2xl font-semibold tracking-tight text-light">
              {item.title}
            </h3>
            <p className="mt-4 leading-7 text-light/68">{item.copy}</p>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Expertise;
