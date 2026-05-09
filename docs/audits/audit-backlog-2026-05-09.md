# Audit backlog: 2026-05-09

Findings from the pre-launch audit (`2026-05-09-pre-launch-audit.md`)
that did not ship tonight. Filed by severity. Drop into the v1.0.x
release window for HIGH plus MEDIUM-2; treat the others as taste
calls and pick up if a refactor pass touches the area.

---

## v1.0.x: must fix

### HIGH-5: Font-loader dedup

**Problem.** Two independent font-loading paths run simultaneously,
fetching the same five woff2 files twice on every first-page load.

- `app/globals.css:4-38` declares `@font-face` for Exo 2 (3 weights)
  and Space Grotesk (2 weights), pointing at `/fonts/Exo2-*.woff2`
  and `/fonts/SpaceGrotesk-*.woff2` in `public/fonts/`.
- `app/layout.tsx:16-33` independently loads the same five files
  via `next/font/local`, which emits its own internal-hashed
  `@font-face` blocks pointing at `/_next/static/media/<hash>-s.p.woff2`
  plus `<link rel="preload">` headers.

The browser fetches both copies because `--font-heading: 'Exo 2',
...` in globals.css references the literal family name `Exo 2`,
which resolves to globals.css's @font-face. The next/font CSS
variables (`--font-exo2`, `--font-space-grotesk`) are set on the
`<html>` element via className but never consumed in any CSS rule.
Net: roughly 5 wasted woff2 round-trips on first page load (about
25 KB).

**Recommended fix.**

Delete the `@font-face` blocks at `app/globals.css:4-38`. In the
`@theme` block, change:

```
  --font-heading: 'Exo 2', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Space Grotesk', 'Fira Code', monospace;
```

to:

```
  --font-heading: var(--font-exo2), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: var(--font-space-grotesk), 'Fira Code', monospace;
```

Verify `--font-sans: 'Inter', ...` resolves correctly through
Tailwind v4 `@theme` tokens to next/font's `--font-inter`. If not,
either add `var(--font-inter)` as the first family in `--font-sans`
or replace the font loading entirely.

**Verification before merge.**

1. Browser screenshot of every page (homepage, /about, /features,
   /pricing, /docs, /docs/<slug>, /download, /privacy, /terms,
   /subprocessors) before and after the change. Compare side-by-side.
2. View source on the deployed page. Confirm only one set of
   font-related preload links and no duplicate `/fonts/Exo2-*.woff2`
   or `/_next/static/media/<hash>-s.p.woff2` requests for the same
   font.
3. Network tab on first page load. Confirm five woff2 fetches, not ten.

**Why deferred.**

The change touches CSS-variable resolution through Tailwind v4
`@theme` tokens, which is not deeply tested in this codebase. The
visual rendering is currently correct under either path; getting it
correct under one path requires a careful read of Tailwind v4's
theme-variable resolution behavior plus a clean visual verification
on each page. Risk of subtle font-rendering regression if rushed.
Punted to a clean-room follow-up commit.

---

## v1.0.x: should fix

### MEDIUM-2: Site-wide security headers

**Problem.** `public/_headers` contains only the OG-image
Content-Type lock. No `X-Content-Type-Options`, no `Referrer-Policy`,
no `X-Frame-Options` (or CSP `frame-ancestors`), no
`Permissions-Policy`. Cheap defense-in-depth wins available.

**Recommended fix.** Prepend a global block to `public/_headers`:

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Keep the existing `/opengraph-image` Content-Type lock below the
global block.

**Note on full CSP.** A `Content-Security-Policy` header is harder
to add safely because the codebase uses inline `style={{...}}` JSX
in `Hero`, `ZeroData`, and similar components. A real CSP rollout
needs either nonces on inline styles (hard to retrofit on a
static-export site) or a migration of inline styles to Tailwind
utilities. Defer CSP itself to a separate v1.x slot; ship the four
cheap headers above first.

### MEDIUM-4: Sitemap priority for "shipping-with-launch" chapters

**Problem.** `lib/docs.ts` carries a `status` field with values
`live` and `shipping-with-launch`. The chapter index renders a
"Shipping with launch" badge for the latter. But `app/sitemap.ts`
emits all 16 chapters at priority 0.5 regardless of status. Search
engines see chapters that are not yet live as full-priority indexable.

**Recommended fix.** Drop priority to 0.3 for chapters with
`status === 'shipping-with-launch'`, or filter them out of the
sitemap until they go live. Filtering is more aggressive but cleaner
because it prevents partial-content indexing during the
pre-launch window.

```ts
// app/sitemap.ts (sketch)
const liveChapters = getAllChapterMeta()
  .filter(meta => meta.status === 'live')
  .map(meta => ({
    url: `${SITE_URL}/docs/${meta.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));
```

Requires a small accessor in `lib/docs.ts` if `getAllChapterMeta()`
does not already exist.

---

## Forever-backlog

Pick up if a refactor pass touches the area. Otherwise leave.

### LOW-1: Dead code

**Files.**
- `components/ui/Button.tsx` (no importers; tree-shaken at build).
- `components/ui/GlassCard.tsx` (no importers).
- `components/effects/AnimatedCounter.tsx` (no importers).

**Action.** Delete on next `components/ui` refactor.

### LOW-2: Unnecessary `'use client'`

**Files.**
- `components/effects/NoiseOverlay.tsx`.
- `components/effects/GridBackground.tsx`.

Neither has client state, event handlers, or hooks. The `'use client'`
directive forces them onto the client boundary unnecessarily.

**Action.** Remove the directive on each.

### LOW-3: `Card.tsx` hover handled via JS

**File.** `components/ui/Card.tsx:24-41`.

Uses `onMouseEnter`/`onMouseLeave` for hover styling. CSS-only via
Tailwind `group` plus `group-hover:` utilities would let `Card.tsx`
drop `'use client'` and render on the server.

**Action.** Migrate hover to CSS-only on a future ui-folder refactor.

### LOW-4: Em-dash in JSDoc comment

**File.** `lib/cms-types.ts:3`.

```ts
// Phase 1 has no real CMS: everything is inlined in constants.ts and
```

Comment-only. The voice rule explicitly carves out comments
("Comments in code are fine. The rule is for the rendered surface.").
But sweeping the comment keeps the codebase consistently rule-aligned.

**Action.** Replace the em-dash with a colon or a comma during a
codebase-wide comment sweep, if one is ever performed. Otherwise
leave.

### Bug-report template UX iteration

**File.** `clawless-feedback/.github/ISSUE_TEMPLATE/bug-report.yml`.

The template folds expected-vs-actual behavior into a single "What
happened" textarea. Acceptable for launch volume; for high-volume
triage, splitting into two textareas (expected, actual) helps
triagers parse reports faster.

**Action.** Iterate after the first 50-100 issues come in and there
is a sense of triage friction.
