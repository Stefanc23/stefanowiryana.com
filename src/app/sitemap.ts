import type { MetadataRoute } from 'next';

import { getProjectRoutes } from '@/data/projectContent';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjectRoutes();

  return [
    {
      url: 'https://stefanowiryana.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map(({ slug, updatedAt }) => ({
      url: `https://stefanowiryana.com/projects/${slug}`,
      lastModified: updatedAt ? new Date(updatedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
