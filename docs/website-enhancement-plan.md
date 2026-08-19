# Website Enhancement Plan

Last audited: 2026-08-09

## Current state

The site is a polished one-page Next.js 16 portfolio with a distinctive dark
security aesthetic, responsive navigation, motion, a WebGL hero object, Vercel
Analytics, Speed Insights, and an embedded Sanity Studio at `/studio`.

Audit evidence:

- [Initial desktop capture](../artifacts/ui-audit/home-desktop.png)
- [Enhanced desktop capture](../artifacts/ui-audit/home-desktop-final.png)
- [Enhanced mobile capture](../artifacts/ui-audit/home-mobile-enhanced.png)
- [Sanity project images loaded in viewport](../artifacts/ui-audit/projects-loaded.png)
- [Embedded Studio login capture](../artifacts/ui-audit/sanity-studio.png)

The home page loaded successfully with meaningful content and no framework error
overlay. The only browser warning observed was a Three.js deprecation warning for
`THREE.Clock`; Vercel analytics messages were expected development-mode logs.
An automated axe-core scan reported zero violations; its contrast rule remained
incomplete because layered gradients prevent deterministic background-color
calculation and should still receive a manual contrast review.

## Sanity integration audit

The configured production dataset currently contains:

| Document type | Count | Integration status                                                      |
| ------------- | ----: | ----------------------------------------------------------------------- |
| About         |     1 | Profile, tagline, bio, skills, image, and resume are now mapped         |
| Experience    |     3 | Legacy descriptions are accepted when summaries are absent              |
| Project       |     7 | Legacy projects are accepted and their existing images are now rendered |

Content debt found in the live dataset:

- All three experiences are missing `summary`, `highlights`, and `focusAreas`.
- All seven projects are missing `impact` and `technologies`.
- The About biography should receive an editorial review for current role,
  positioning, grammar, and preferred product/vendor emphasis.

The code intentionally keeps these newer editorial fields optional until the
existing documents have been backfilled. Core fields now use real Sanity
validation instead of the previously ignored `required: true` property.

## Changes completed in this pass

1. Consolidated public content into one cached, tagged GROQ query and kept the
   server client on Sanity's project API so Next.js owns freshness and webhook
   invalidation without a second CDN cache layer.
2. Connected About content and skills to the public UI.
3. Connected Sanity profile and project images through `next/image`.
4. Added field-level legacy mapping and local fallback data.
5. Added real schema validation, document previews, and experience ordering.
6. Replaced the public query-string revalidation token with signed Sanity
   webhook verification.
7. Made the resume route tolerate missing CMS data and reject non-Sanity assets.
8. Updated environment and setup documentation.
9. Kept experience cards visible without waiting for viewport-triggered JavaScript
   while preserving their interactive detail expansion.

## UI sprint audit — 2026-08-09

This sprint was reviewed against the supplied desktop, tablet, and mobile
captures, followed by formatting, ESLint, TypeScript, and production-build
checks.

| Area               | Finding                                                                                                     | Sprint resolution                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Navigation         | Hash links landed on section wrappers, leaving too much internal padding above the heading                  | Hash targets now live on the heading block and use viewport-aware offsets                                     |
| Active state       | Logo, back-to-top, and Hero links did not share the menu's active-state logic                               | All section movement now goes through one navigation event and scroll-spy path                                |
| Mobile menu        | Section links needed the same state and offset behavior as desktop navigation                               | Kept the original transparent surface while sharing navigation state and heading offsets                      |
| Hero               | The previous headline was broad, oversized, and visually competed with the 3D object                        | Rewrote the positioning, constrained the headline to two lines, and made the CTAs clearer and higher contrast |
| About              | The desktop profile and three capability columns created uneven width, long lines, and weak tablet behavior | Rebuilt it as a dense 12-column desktop layout, balanced tablet grid, and single-column mobile flow           |
| Expertise          | “From risk to reality” repeated claims already expressed in About and Experience                            | Removed the entire section from the page                                                                      |
| Experience         | Expansion depended on a small icon target and empty CMS arrays produced blank divider space                 | Made the full card the accessible toggle and conditionally renders only available detail content              |
| Experience layouts | Mobile and desktop timeline requirements differ                                                             | Preserved the horizontal desktop timeline and isolated the contained vertical rail to mobile                  |

### Responsive acceptance matrix

- Mobile (320–767px): single-column Hero and About, stacked full-width CTAs,
  contained vertical experience rail, scrollable project filters, and fixed
  navigation that does not cover the footer.
- Tablet (768–1279px): balanced About capability grid, subdued decorative Hero
  object, two-column projects where space allows, and top navigation with exact
  heading offsets.
- Desktop (1280px+): editorial Hero split, 5/7 About composition, three-column
  capability matrix, and the original alternating horizontal experience
  timeline.

### Remaining audit priorities

1. Backfill the optional Sanity experience and project fields so expanded cards
   consistently show outcome-oriented proof instead of only longer descriptions.
2. Add at least one current security or cloud case study; the public CMS content
   is still weighted toward older software projects.
3. Measure the Three.js Hero object on mid-range mobile hardware and defer it when
   reduced motion, data saver, or constrained hardware is detected.
4. Run a post-deployment contrast and keyboard pass against the final production
   content because CMS copy length can change card height and wrapping.

## Recommended enhancement sequence

### Implemented in this iteration

- Added a keyboard skip link, section-aware navigation state, and section scroll
  offsets for more reliable keyboard and anchor navigation.
- Repositioned the Hero around clear trust and delivery claims, and restored the
  alternating horizontal experience timeline at desktop widths.
- Added a visible primary action to every project card. Sanity projects can now
  be featured and ordered, and can include a project date and responsibility.
- Reduced motion and pointer-work costs by disabling decorative embers when the
  user prefers reduced motion and throttling cursor-glow updates to animation
  frames.
- Replaced generated sitemap/robots artifacts with native App Router metadata
  routes and added a 1200×630 generated Open Graph image.

### Editorial work still required

- The CMS documents themselves still need factual content backfills. The new
  fields deliberately remain optional until they are populated and reviewed.

### Priority 1 — content and trust

- Backfill the missing experience summaries, highlights, and focus areas.
- Add impact statements and technology tags to all projects.
- Rebalance selected work toward the security/solution-engineering positioning;
  the current CMS set is entirely legacy Web, Mobile, or Other work and contains
  no Security or Cloud case study.
- Review project ordering. Add an explicit `featured` or `sortOrder` field so the
  strongest and most recent proof appears first instead of alphabetical order.
- Refresh the About copy to lead with outcomes, current role, and the exact work
  Stefano wants to attract.
- Add clear project dates and a short responsibility/contribution field so older
  work is understood in context.

### Priority 2 — portfolio UX

- Preserve the horizontal desktop experience timeline while keeping the mobile
  vertical timeline independently responsive.
- Keep active-section feedback synchronized across every anchor control and the
  visible skip-to-content link.
- Keep the Hero trust row limited to verifiable certifications, delivery scope,
  and measurable outcomes.
- Give every project a consistent primary action. Projects without a public demo
  can link to a short case-study detail page instead of ending as static cards.
- Review the mobile bottom navigation against the final project-card height and
  ensure the footer cannot sit behind it.

### Priority 3 — performance and discoverability

- Replace or update the Three.js clock API that currently emits a deprecation
  warning.
- Measure the WebGL hero on mid-range mobile hardware. Load the fallback first or
  defer the canvas when data saver, reduced motion, or constrained hardware is
  detected.
- Throttle the cursor glow with `requestAnimationFrame` or CSS variables to avoid
  a React state update for every pointer event.
- Add a dedicated 1200×630 Open Graph image; the metadata currently requests a
  large social card without providing a matching image.
- Replace checked-in generated sitemap files with an App Router sitemap route so
  metadata stays synchronized with the site.

## CMS operations checklist

1. Set `SANITY_REVALIDATE_SECRET` in local and Vercel server environments.
2. Create a Sanity webhook for create, update, and delete events at
   `https://stefanowiryana.com/api/revalidate` using the same secret.
3. Backfill optional legacy fields before making them required in the schema.
4. Publish one representative update and confirm the public page changes without
   a redeploy.
5. Keep `NEXT_PUBLIC_SANITY_API_VERSION` pinned and update it deliberately during
   planned dependency maintenance.

## Definition of done for the next iteration

- All live Sanity documents pass Studio validation.
- Every portfolio section is CMS-driven or intentionally documented as static.
- A content publish is visible on production after a signed webhook event.
- Keyboard navigation, reduced-motion behavior, and mobile layout pass a browser
  accessibility and interaction check.
- Lighthouse or equivalent measurements are recorded for mobile LCP, CLS, and
  interaction responsiveness before and after WebGL/per-pointer optimizations.
