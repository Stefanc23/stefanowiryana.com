# Portfolio Chatbot — Next Action Plan

Last planned: 2026-08-09

## Outcome

Turn the existing “Start a conversation” CTA into a small portfolio assistant
that answers factual questions about Stefano's work experience and projects from
published Sanity content. The first release should stay narrow, fast, and honest:
it is a guided portfolio search experience, not a general-purpose assistant.

## Recommended first-release architecture

```text
Published Sanity documents
        ↓
Server-only GROQ projection
        ↓
Cached portfolio knowledge context
        ↓
POST /api/chat (validation, guardrails, model call, streaming)
        ↓
Accessible chat panel opened by “Start a conversation”
```

The current content set is small, so the first release should send a compact,
structured Sanity context with each request. A vector database would add
operational complexity without improving retrieval enough to justify it yet.

## Content contract

The server-side GROQ projection should include only published, public fields:

- Experience: role, company, dates, location, summary, highlights, and focus
  areas.
- Projects: name, category, description, impact, responsibility, date,
  technologies, and public links.
- About: display name, public bio, tagline, and capabilities.

Add stable source identifiers to every projected record so answers can show
small references such as “Experience — Central Data Technology” or “Project —
Portfolio System.” Never expose Sanity write tokens, drafts, asset credentials,
or unpublished documents to the browser or model.

## Delivery sequence

### Phase 1 — content readiness

1. Backfill missing Sanity summaries, highlights, focus areas, impact statements,
   technologies, dates, and responsibilities.
2. Add optional `chatSummary` fields only where the public page copy is too long
   or ambiguous for reliable answers.
3. Define five factual evaluation questions for every experience and project.
4. Confirm that public links and dates are current before enabling the assistant.

### Phase 2 — server foundation

1. Create a server-only `getChatKnowledge()` function using the existing cached
   Sanity client and revalidation tags.
2. Add a `POST /api/chat` route with a strict input schema, message-count limit,
   request-size limit, and per-IP rate limiting.
3. Add a provider adapter so the model can be changed without rewriting the UI.
4. Instruct the model to answer only from supplied portfolio context, identify
   uncertainty, and offer the email/contact path when the answer is unavailable.
5. Stream the response and attach the source identifiers used for the answer.

### Phase 3 — conversation UI

1. Replace the CTA's direct email behavior with an accessible chat trigger while
   keeping email as a visible fallback.
2. Use a side panel on desktop and a bottom sheet on mobile, with focus trapping,
   Escape-to-close, restored trigger focus, and reduced-motion support.
3. Start with suggested prompts:
   - “What security delivery experience does Stefano have?”
   - “Which projects use Next.js or Sanity?”
   - “Summarize Stefano's most recent role.”
   - “How can I contact Stefano about a project?”
4. Show a clear “Answers are based on published portfolio content” notice.
5. Make project and experience references clickable so users can jump to the
   relevant page section.

### Phase 4 — safety and quality

1. Reject prompt-injection attempts that request hidden instructions, unrelated
   general knowledge, private data, or unpublished CMS content.
2. Sanitize model-provided links and allow only known project, résumé, email, and
   on-page section destinations.
3. Do not retain conversation text by default. If analytics are later added,
   record only consented, redacted events such as opened, question category,
   fallback, and contact conversion.
4. Add unit tests for context mapping and guardrails, route tests for invalid and
   rate-limited requests, and browser tests for keyboard and mobile behavior.
5. Create a factual evaluation set and require source-grounded answers before
   release.

## Definition of done

- The assistant answers the agreed evaluation questions using current Sanity
  data and does not invent unsupported employment or project claims.
- Every factual answer identifies at least one portfolio source.
- Unanswerable questions receive a transparent fallback and contact option.
- No Sanity secret or model credential reaches the client bundle.
- The panel works at 320px, tablet, and desktop widths and passes keyboard,
  focus, reduced-motion, and screen-reader checks.
- Rate limits, request limits, error states, and email fallback are verified.
- Publishing a Sanity change updates chatbot knowledge through the existing
  revalidation path without redeploying the site.

## Suggested sprint split

- Sprint A: CMS backfill, knowledge projection, API contract, and factual evals.
- Sprint B: streaming route, guardrails, rate limiting, and automated tests.
- Sprint C: accessible panel UI, source links, analytics decision, and production
  verification.
