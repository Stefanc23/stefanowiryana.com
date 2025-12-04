'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { FiCheck } from 'react-icons/fi';

import Card from '@/components/Card';
import Section from '@/components/Section';
import { urlForImage } from '@/sanity/lib/image';
import { fadeIn } from '@/utils/motions';

const About = ({ data }: any) => {
  // group skills by category
  let skills = data.skills.reduce((acc: any, skill: any) => {
    const category = skill['category'];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill['name']);
    return acc;
  }, {});

  // convert skills object to array
  skills = Object.keys(skills).map((skill) => ({
    title: skill,
    items: skills[skill],
  }));

  return (
    <Section id="about" title="A Little Bit About Myself" overline="About Me">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:gap-x-12 mt-20">
        <div className="order-last md:order-first max-w-prose md:col-span-2 text-lg">
          {data.bio.split('\n\n').map((paragraph: string, i: number) => (
            <motion.p
              key={`bio-${i + 1}`}
              className="mb-5"
              variants={fadeIn('up', 'spring', 0.25 + 0.25 * i, 1.25)}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
        <motion.div
          className="relative flex justify-center group"
          variants={fadeIn('up', 'spring', 0.75, 1.25)}
        >
          <div className="absolute w-[250px] h-[250px] md:w-[250px] md:h-[375px] rounded-full md:rounded-lg bg-linear-to-br from-primary to-secondary blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-tilt"></div>
          <div className="relative">
            <Image
              className="w-[250px] h-[250px] md:w-[250px] md:h-[375px] rounded-full md:rounded-lg"
              src={urlForImage(data.profileImage).size(250, 375).url()}
              alt="Profile Image"
              width={250}
              height={375}
              quality={100}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </div>
        </motion.div>
      </div>
      <div id="skills" className="mt-12">
        <motion.h2
          className="text-lg md:text-2xl 2xl:text-3xl mb-8 font-semibold"
          variants={fadeIn('up', 'spring', 1, 1.25)}
        >
          Some of My Technical Skills
        </motion.h2>
        <div className="mt-3 w-full grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-8">
          {skills.map(
            (
              { title, items }: { title: string; items: string[] },
              i: number,
            ) => (
              <motion.div
                className="flex items-stretch"
                key={`technologies-${title.replaceAll(' ', '-')}`}
                variants={fadeIn('up', 'spring', 1 + 0.25 * i, 1.25)}
              >
                <Card
                  subTitle={title}
                  cardClassName="!bg-slate-300 dark:!bg-slate-700"
                  headerClassName="!text-primary text-center"
                  contentClassName="flex flex-col justify-center"
                  noHighlight
                >
                  {items.map((item) => (
                    <p
                      key={item}
                      className="flex items-center space-x-2 text-primary"
                    >
                      <FiCheck />
                      <span className="text-dark dark:text-light">{item}</span>
                    </p>
                  ))}
                </Card>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </Section>
  );
};

export default About;
