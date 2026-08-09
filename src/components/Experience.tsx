'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

import Section from '@/components/Section';
import type { Experience as ExperienceType } from '@/types/content';

interface ExperienceProps {
  data: ExperienceType[];
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
});
const formatDate = (date: string) => dateFormatter.format(new Date(date));

const Experience = ({ data }: ExperienceProps) => {
  const sortedData = [...data].sort(
    (a, b) =>
      new Date(b.endDate ?? '9999-12-31').getTime() -
      new Date(a.endDate ?? '9999-12-31').getTime(),
  );

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Built in the field."
      intro="A hands-on path across security, solution design, and the web."
      className="!max-w-none !px-0 sm:!px-0 lg:!px-0"
      headingClassName="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 md:hidden">
        <ol className="relative grid gap-4 border-l border-light/15 pl-6 sm:pl-8">
          {sortedData.map((item) => (
            <ExperienceCard key={`${item.company}-${item.role}`} item={item} />
          ))}
        </ol>
      </div>

      <div className="hidden md:block">
        <ol className="relative grid h-[42rem] w-full grid-cols-3 gap-6 px-5 py-5 sm:px-8 lg:px-10">
          <div
            className="absolute inset-x-0 top-[22rem] h-px bg-gradient-to-r from-primary/25 via-primary/80 to-primary/25"
            aria-hidden
          />
          {sortedData.map((item, index) => (
            <ExperienceCard
              key={`${item.company}-${item.role}`}
              item={item}
              index={index}
              horizontal
            />
          ))}
        </ol>
      </div>
    </Section>
  );
};

const ExperienceCard = ({
  item,
  index = 0,
  horizontal = false,
}: {
  item: ExperienceType;
  index?: number;
  horizontal?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const above = horizontal && index % 2 === 1;
  const toggleExpanded = () => setExpanded((value) => !value);

  return (
    <li
      className={`${horizontal ? 'relative h-full' : 'relative'} ${
        expanded ? 'z-30' : 'z-10'
      }`}
    >
      {horizontal ? (
        <span
          className={`absolute left-1/2 z-[1] w-px -translate-x-1/2 bg-primary/65 ${
            above ? 'top-[14rem] h-32' : 'top-[calc(22rem+0.625rem)] h-10'
          }`}
          aria-hidden
        />
      ) : null}
      <span
        className={
          horizontal
            ? 'absolute left-1/2 top-[22rem] z-10 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-dark bg-primary shadow-[0_0_0_1px_rgba(245,129,72,0.7)]'
            : 'absolute -left-[1.95rem] top-7 size-3 rounded-full border-2 border-dark bg-primary shadow-[0_0_0_1px_rgba(245,129,72,0.7)] sm:-left-[2.45rem]'
        }
        aria-hidden
      />
      <article
        className={`etched-border group relative z-20 w-full cursor-pointer outline-none transition duration-300 ${
          horizontal ? 'max-w-md' : 'max-w-none'
        } rounded-2xl p-5 sm:p-6 ${
          expanded
            ? 'bg-obsidian shadow-[0_24px_80px_rgba(0,0,0,0.56)]'
            : 'bg-light/[0.035] hover:-translate-y-0.5 hover:bg-light/[0.055]'
        } ${
          horizontal
            ? above
              ? 'absolute left-1/2 top-0 -translate-x-1/2'
              : 'absolute left-1/2 top-[calc(22rem+3.125rem)] -translate-x-1/2'
            : ''
        }`}
      >
        <button
          type="button"
          className="absolute inset-0 z-30 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
          onClick={toggleExpanded}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.role} at ${item.company}`}
        />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary-200">
              {formatDate(item.startDate)} -{' '}
              {item.endDate ? formatDate(item.endDate) : 'Now'}
            </p>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-light xl:text-2xl">
              {item.role}
            </h3>
          </div>
          <span
            className="grid size-9 shrink-0 place-items-center rounded-full border border-light/12 text-light/55 transition group-hover:border-primary group-hover:text-primary"
            aria-hidden
          >
            <HiChevronDown
              className={`size-4 transition ${expanded ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </span>
        </div>
        <p className="mt-1 text-sm text-light/50">
          {item.company} / {item.location}
        </p>
        <p
          className={`mt-4 leading-6 text-light/65 ${
            expanded ? '' : 'line-clamp-2'
          }`}
        >
          {item.summary}
        </p>
        <AnimatePresence initial={false}>
          {expanded && item.highlights.length > 0 && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 grid gap-2 overflow-hidden border-t border-light/8 pt-4 text-sm leading-6 text-light/55"
            >
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {highlight}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        {item.focusAreas.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.focusAreas.map((focus) => (
              <span
                key={focus}
                className="rounded-md bg-light/[0.07] px-2.5 py-1 text-xs text-light/60"
              >
                {focus}
              </span>
            ))}
          </div>
        ) : null}
      </article>
    </li>
  );
};

export default Experience;
