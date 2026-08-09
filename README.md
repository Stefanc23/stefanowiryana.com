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

Content mapping is centralized in `src/data/portfolioContent.ts`. One tagged
GROQ request reads About, Experience, and Project documents, then maps each
section independently so an incomplete document does not hide valid CMS data:

- `src/types/content.ts` for shared `Experience` and `Project` contracts.
- `src/sanity/lib/client.ts` for the configured Sanity client.
- `src/data/portfolioContent.ts` contains the public portfolio query and maps
  legacy Sanity documents to shared UI contracts.
- Sanity profile and project images are rendered with Next.js image optimization.
- `src/data/mockContent.ts` remains the local fallback for previews and tests.

Required environment variables for a real Sanity project:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_REVALIDATE_SECRET=
```

`SANITY_REVALIDATE_SECRET` is only needed for the Sanity webhook at
`POST /api/revalidate`. Configure the same secret in Sanity so its webhook
signature can be verified. Keep it server-only; query-string and `NEXT_PUBLIC_*`
revalidation secrets are intentionally unsupported.

Create a unique value with `openssl rand -base64 32`, place it in `.env.local`
and the Vercel server environment, then paste that exact value into the Sanity
webhook's secret field at **Settings → API → Webhooks**. It is an authentication
secret, not a Sanity API token, and must never be committed or exposed with a
`NEXT_PUBLIC_` prefix.

See `docs/website-enhancement-plan.md` for the current UI/CMS audit and the
recommended enhancement sequence.
