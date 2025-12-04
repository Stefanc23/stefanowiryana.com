'use client';

import { NextStudio } from 'next-sanity/studio';

import config from '@/configs/sanity.config';

export default function StudioPage() {
  return (
    <>
      <NextStudio config={config} />
    </>
  );
}
