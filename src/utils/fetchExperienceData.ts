import { groq } from 'next-sanity';

import { clientFetch } from '@/sanity/lib/client';

export const query = groq`*[_type == 'experience'] | order(startDate desc){_id, role, company, startDate, endDate, location, employmentType, description, summary, highlights, focusAreas}`;

export const fetchExperienceData = async () => await clientFetch(query);
