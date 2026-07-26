import Section from '@/components/Section';
import { SkillGroups } from '@/components/Skills';

const About = () => {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Make security usable."
      intro="Solution delivery, data security, and technical conversations that lead somewhere."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="etched-border rounded-2xl bg-light/[0.04] p-6 sm:p-8">
          <p className="text-3xl font-semibold leading-tight tracking-tight text-light sm:text-4xl">
            Practical security. Clear delivery.
          </p>
          <p className="mt-6 leading-8 text-light/70">
            I am a Solution Delivery Engineer, Zscaler Certified Sales Engineer,
            delivery consultant, and data security specialist. I help customers
            turn security requirements into workable technical decisions, from
            discovery through implementation.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Capabilities
          </p>
          <SkillGroups />
        </div>
      </div>
    </Section>
  );
};

export default About;
