import { groq } from 'next-sanity';

import { clientFetch } from '@/sanity/lib/client';

export const query = groq`*[_type == 'project'] | order(name) {_id, name, category, description, impact, technologies, image, repoLink, demoLink}`;

export const fetchProjectData = async () => await clientFetch(query);
