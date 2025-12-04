'use client';

import { motion } from 'motion/react';

import ExperienceCard from '@/components/ExperienceCard';
import Section from '@/components/Section';
import { fadeIn } from '@/utils/motions';

const Experience = ({ data }: any) => {
  // initialize date formatter
  const dtf = Intl.DateTimeFormat('en-US', {
    weekday: undefined,
    year: 'numeric',
    month: 'short',
    day: undefined,
  });

  // sort experience by end date
  data.sort((a: any, b: any) => {
    const da = new Date(a.endDate ? a.endDate : '9999-12-31');
    const db = new Date(b.endDate ? b.endDate : '9999-12-31');
    return db.getTime() - da.getTime();
  });

  return (
    <Section id="experience" title="My Career Journey" overline="Experience">
      <div className="container max-w-5xl px-4 mx-auto">
        <ol className="flex flex-col gap-y-12 w-full max-w-[720px] mx-auto mt-20">
          {data.map(
            (
              {
                role,
                company,
                startDate,
                endDate,
                location,
                description,
                employmentType,
              }: any,
              i: number,
            ) => (
              <motion.li
                key={i}
                variants={fadeIn('up', 'spring', 0.25 + 0.25 * i, 1.25)}
              >
                <ExperienceCard
                  from={dtf.format(new Date(startDate))}
                  until={endDate ? dtf.format(new Date(endDate)) : 'Present'}
                  title={role}
                  type={employmentType}
                  company={company}
                  location={location}
                  detail={description}
                />
              </motion.li>
            ),
          )}
        </ol>
      </div>
    </Section>
  );
};

export default Experience;
