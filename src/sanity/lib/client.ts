import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn } from '@/sanity/env';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

export const clientFetch = <QueryResponse>(query: string) =>
  client.fetch<QueryResponse>(
    query,
    {},
    {
      next: {
        revalidate: 3600,
        tags: ['sanity-content'],
      },
    },
  );
