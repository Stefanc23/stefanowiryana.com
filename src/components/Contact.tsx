'use client';

import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

import Button from '@/components/Button';
import EmberwingCompanion from '@/components/EmberwingCompanion';
import Section from '@/components/Section';

const links = [
  {
    href: 'mailto:stefanowiryana@gmail.com',
    label: 'Email',
    value: 'stefanowiryana@gmail.com',
    icon: HiOutlineMail,
  },
  {
    href: 'https://linkedin.com/in/stefanowiryana',
    label: 'LinkedIn',
    value: 'linkedin.com/in/stefanowiryana',
    icon: FaLinkedin,
  },
  {
    href: 'https://github.com/stefanc23',
    label: 'GitHub',
    value: 'github.com/stefanc23',
    icon: FaGithub,
  },
];

const Contact = () => {
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isCtaFocused, setIsCtaFocused] = useState(false);
  const isGreeting = isCtaHovered || isCtaFocused;

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's make it clear."
      intro="For security, cloud, and web work that needs both rigor and taste."
      className="pb-28"
    >
      <div className="etched-border grid gap-8 bg-gradient-to-br from-light/[0.06] to-primary/10 p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:p-10">
        <div className="relative">
          <p className="max-w-2xl text-lg leading-8 text-light/76">
            I work where security architecture, customer discovery, and frontend
            execution need to meet in one clear solution.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button
              href="mailto:stefanowiryana@gmail.com"
              onPointerEnter={() => setIsCtaHovered(true)}
              onPointerLeave={() => setIsCtaHovered(false)}
              onFocus={() => setIsCtaFocused(true)}
              onBlur={() => setIsCtaFocused(false)}
            >
              Start a conversation
            </Button>
            <EmberwingCompanion
              key={isGreeting ? 'greeting' : 'idle'}
              greetingActive={isGreeting}
            />
          </div>
        </div>
        <ul className="grid gap-3">
          {links.map(({ href, icon: Icon, label, value }) => (
            <li key={href}>
              <a
                href={href}
                className="flex items-center gap-4 border border-light/10 bg-dark/45 p-4 text-light/72 transition hover:border-secondary/45 hover:text-secondary"
              >
                <span className="grid size-10 shrink-0 place-items-center border border-secondary/25 bg-secondary/10">
                  <Icon aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.22em] text-light/45">
                    {label}
                  </span>
                  <span className="mt-1 block truncate text-sm sm:text-base">
                    {value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Contact;
