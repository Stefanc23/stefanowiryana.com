import Image from 'next/image';

import Section from '@/components/Section';
import { SkillGroups } from '@/components/Skills';
import type { AboutContent } from '@/types/content';

interface AboutProps {
  data: AboutContent;
}

const About = ({ data }: AboutProps) => {
  const bioParagraphs = data.bio
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <Section
      id="about"
      eyebrow="About"
      title="Technical depth, practical delivery."
      intro="I connect security requirements, customer context, and hands-on engineering to fine-tune security solution implementation to have real impacts on customer security posture."
    >
      <div className="grid gap-5 lg:grid-cols-12 lg:items-stretch">
        <article className="etched-border relative min-h-[24rem] overflow-hidden rounded-3xl bg-obsidian lg:col-span-4">
          {data.profileImage && (
            <Image
              src={data.profileImage.url}
              alt={data.profileImage.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 32vw"
              className="object-cover object-top"
              placeholder={data.profileImage.lqip ? 'blur' : 'empty'}
              blurDataURL={data.profileImage.lqip}
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-dark via-dark/25 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              {data.tagline}
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-light sm:text-3xl">
              {data.displayName}
            </h3>
          </div>
        </article>

        <article className="etched-border rounded-3xl bg-gradient-to-br from-light/[0.055] to-primary/[0.045] p-6 sm:p-8 lg:col-span-8">
          <h3 className="max-w-2xl text-3xl font-semibold leading-[1.08] tracking-tight text-light sm:text-4xl">
            The person behind the name.
          </h3>
          <div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-light/70">
            {bioParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="mt-3 lg:col-span-12 lg:mt-5">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-2xl font-semibold tracking-tight text-light">
              Core capabilities
            </h3>
            <p className="max-w-sm text-sm leading-6 text-light/55 sm:text-right">
              Technical experties to engineer customer satisfaction
            </p>
          </div>
          <SkillGroups skills={data.skills} />
        </div>
      </div>
    </Section>
  );
};

export default About;
