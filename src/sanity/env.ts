export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-23';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'replace-with-project-id';

export const useCdn = process.env.NODE_ENV === 'production';

export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_DATASET,
);
