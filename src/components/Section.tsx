'use client';

import { motion } from 'motion/react';
import React from 'react';

import { staggerContainer, textVariant } from '@/utils/motions';

type SectionProps = {
  id: string;
  className?: string;
  children?: React.ReactNode;
} & (
  | { isHero: true; title?: never; overline?: never }
  | { isHero?: false; title: string; overline: string }
);

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  isHero,
  title,
  overline,
}) => {
  return (
    <motion.section
      id={id}
      className={`max-w-[69rem] mx-auto w-11/12 mb-20
      ${!isHero && 'pt-0 md:pt-[120px]'} ${className}`}
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {!isHero && (
        <motion.div variants={textVariant()} className="text-left">
          <p className="text-md md:text-xl 2xl:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-br from-primary to-secondary leading-wider">
            {overline}
          </p>
          <h1 className="text-3xl md:text-5xl 2xl:text-6xl">{title}</h1>
        </motion.div>
      )}

      {children}
    </motion.section>
  );
};

export default Section;
