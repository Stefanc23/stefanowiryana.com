import { groq } from 'next-sanity';

import { clientFetch } from '@/sanity/lib/client';

interface AboutResume {
  resumeUrl?: string;
}

export const query = groq`*[_type == 'about'][0]{"resumeUrl": resumeFile.asset->url}`;

export const fetchAboutData = async () =>
  await clientFetch<AboutResume | null>(query);
