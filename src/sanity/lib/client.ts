import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn } from '@/sanity/env';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

interface ClientFetchOptions {
  params?: Record<string, unknown>;
  tags?: string[];
}

export const clientFetch = <QueryResponse>(
  query: string,
  { params = {}, tags = ['sanity-content'] }: ClientFetchOptions = {},
) =>
  client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: 3600,
      tags,
    },
  });
