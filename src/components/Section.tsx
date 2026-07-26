import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
  headingClassName?: string;
  intro?: string;
}

const Section = ({
  children,
  className = '',
  headingClassName = '',
  eyebrow,
  id,
  intro,
  title,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28 ${className}`}
    >
      <div className={`mb-10 max-w-3xl ${headingClassName}`}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
          {eyebrow}
        </p>
        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-tight text-light sm:text-5xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-5 text-base leading-8 text-light/72 sm:text-lg">
            {intro}
          </p>
        )}
      </div>
      {children}
    </section>
  );
};

export default Section;
