# stefanowiryana.com

A production-ready single-page personal portfolio for Stefano Wiryana, built with Next.js App Router, TypeScript, Tailwind CSS, and a Sanity-ready content shape.

## Tech Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Sanity-backed content with typed local fallback data
- Vercel Analytics and Speed Insights

## Run Locally

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
yarn lint
yarn build
```

## Deploy to Vercel

1. Import this repository in Vercel.
2. Use the default Next.js framework preset.
3. Set the Sanity environment variables from `.env.example`.
4. Deploy.

## Sanity Integration Notes

The portfolio reads from Sanity when `NEXT_PUBLIC_SANITY_PROJECT_ID` and
`NEXT_PUBLIC_SANITY_DATASET` are set. Otherwise, it uses typed local fallback
content from `src/data/mockContent.ts`, so local development and Vercel previews
remain usable without CMS credentials.

Content mapping is centralized in `src/data/portfolioContent.ts`, keeping the
rendering components stable as Sanity fields evolve:

- `src/types/content.ts` for shared `Experience` and `Project` contracts.
- `src/sanity/lib/client.ts` for the configured Sanity client.
- `src/utils/fetchExperienceData.ts` and `src/utils/fetchProjectData.ts` contain GROQ queries.
- `src/data/portfolioContent.ts` maps Sanity documents to shared UI contracts.
- `src/data/mockContent.ts` remains the local fallback for previews and tests.

Required environment variables for a real Sanity project:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-06-23
SANITY_REVALIDATE_SECRET=
```

`SANITY_REVALIDATE_SECRET` is only needed when configuring a Sanity webhook for
`POST /api/revalidate?secret=...`. Keep it server-only. The current
`NEXT_PUBLIC_REVALIDATION_TOKEN` remains temporarily supported for compatibility,
but should be renamed to `SANITY_REVALIDATE_SECRET` in `.env.local` and Vercel.
