# Pre-launch independent audit, 2026-05-09

**Scope.** Founder-authorized independent code review of (a) today's
five commits + the new `clawless-io/clawless-feedback` repo, and (b)
the overall marketing-site application across architecture, code
quality, performance, security, accessibility, SEO, voice rules,
cross-cutting concerns, legal/compliance, and deployment hygiene.

**Method.** A `coderabbit:code-reviewer` subagent (Opus) ran the deep
code review across the codebase. The Site Developer (this agent) ran
parallel preflight checks on legal-mirror state, deployment status,
and cross-cutting verification, then synthesized findings against the
severity rubric, prioritized, and shipped CRITICAL plus most-HIGH
fixes inline. This document is the deliverable.

**Severity rubric.**

- **CRITICAL.** blocks launch (security vulnerability, broken core
  flow, legal noncompliance, broken brand framing).
- **HIGH.** must fix in v1.0.x (broken edge case, real perf
  regression, real a11y violation, voice rule violation, broken
  legal mirror).
- **MEDIUM.** post-launch v1.x (code quality, minor perf, nice-to-have a11y).
- **LOW.** forever-backlog (taste, micro-optimization).

---

## Executive summary

**Posture: READY-WITH-CONDITIONS.**

Five findings shipped tonight in commit `5d49a6d`: one CRITICAL
(legal pages rendered invisible without JavaScript) and four HIGH
(focus-ring border-radius regression, superlative on home plus about,
anti-positioning on about, default unbranded 404 page). One HIGH
(font-loader duplicate fetch) is deferred to v1.0.x because the
implementation requires careful disentangling of multiple intertwined
font-loading paths and the perf cost is bounded.

Before tonight's pass, the audit would have read REVISE. The
opacity:0 SSR pattern on legal pages was a real legal-compliance
gap and the focus-ring regression was a visible UI defect. Both
are now fixed and verified in the built HTML.

The five today-shipped commits all land their stated intent. The
Lemon Squeezy webhook receiver at `functions/lemonsqueezy.ts` is
well-tested and well-hardened. The Cloudflare Pages deploy pipeline
is sound. Sitemap, robots, OG image, and legal mirror are all in
good shape.

The remaining CONDITIONS for unconditional READY:

1. The HIGH-5 font-loader dedup lands cleanly within the v1.0.x window.
2. The MEDIUM-2 site-wide security headers (X-Content-Type-Options,
   Referrer-Policy, X-Frame-Options, Permissions-Policy) ship pre-launch
   if scope allows or in the v1.0.x window otherwise.
3. The CLAUDE.md typography divergence (CLAUDE.md says "Newsreader
   serif plus Inter sans"; `app/layout.tsx` actually loads Inter,
   Exo2, SpaceGrotesk) is resolved by founder before the launch-day
   pill drop.

---

## Findings table

| Severity | Category | Finding | Location | Status |
|---|---|---|---|---|
| CRITICAL | Legal / a11y | Legal pages render `opacity:0` in SSR HTML; invisible without JS | `components/effects/ScrollReveal.tsx`, used on `/privacy`, `/terms`, `/subprocessors` and 6 other surfaces | FIXED `5d49a6d` |
| HIGH | A11y / code quality | `border-radius: 2px` on `*:focus-visible` corrupts focused element corners | `app/globals.css` (introduced in `18dff63`) | FIXED `5d49a6d` |
| HIGH | Voice rules | Superlative "one of the most impressive open-source AI projects in the world" | `lib/cms.ts:232`, `app/about/page.tsx:70` | FIXED `5d49a6d` |
| HIGH | Voice rules | Anti-positioning paragraph "powerful enemies", "Big platforms ... commoditize, absorb, or replace" | `app/about/page.tsx:120` | FIXED `5d49a6d` |
| HIGH | Cross-cutting | Default unbranded Next.js 404 page | `out/404.html` (no `app/not-found.tsx` source) | FIXED `5d49a6d` (added `app/not-found.tsx`) |
| HIGH | Performance | Duplicate font registration; both globals.css `@font-face` and `next/font/local` load the same five woff2 files | `app/globals.css:4-38` plus `app/layout.tsx:16-33` | DEFERRED to v1.0.x |
| MEDIUM | A11y | ScrollReveal does not honor `prefers-reduced-motion` | `components/effects/ScrollReveal.tsx` | FIXED as side effect of CRITICAL-1 fix `5d49a6d` |
| MEDIUM | Security | No site-wide security headers (X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy) | `public/_headers` | DEFERRED to v1.0.x |
| MEDIUM | Voice rules | "20+ platforms" claim still in `lib/constants.ts:95` pending channel-verification stability | `lib/constants.ts` | EXISTING BACKLOG (CLAUDE.md) |
| MEDIUM | SEO | Sitemap emits "Shipping with launch" chapters at full priority 0.5 | `app/sitemap.ts:9-15` plus `lib/docs.ts` status field | DEFERRED to v1.0.x |
| LOW | Code quality | Dead code: `Button.tsx`, `GlassCard.tsx`, `AnimatedCounter.tsx` | `components/ui/` and `components/effects/` | FOREVER-BACKLOG |
| LOW | Code quality | Unnecessary `'use client'` on stateless effects components | `NoiseOverlay.tsx`, `GridBackground.tsx` | FOREVER-BACKLOG |
| LOW | Code quality | `Card.tsx` hover via JS instead of CSS-only | `components/ui/Card.tsx` | FOREVER-BACKLOG |
| LOW | Voice rules | Em-dash in JSDoc comment | `lib/cms-types.ts:3` | FOREVER-BACKLOG |

---

## Today's commits review

| SHA | Description | Verdict |
|---|---|---|
| `742ada9` | docs: sync KB chapter deltas (3 chapters) | PASS. Diff consistent with canonical KB; voice clean post-sync; ClawHub install-button gating language is honest; F2 refund Q&A direct-answer prepend reads well; v1.0.1 fast-follow disclaimer appropriately qualified. |
| `4e73569` | voice: pre-launch brand audit (em-dash sweep + scarcity-rule fix) | PASS. All 12 em-dash replacements correct. Scarcity-rule rewrite at `content/docs/licensing-and-trial.md:31` matches the canonical pricing memory phrasing. Note: source-side fix shipped in clawless-developer commit `7c5e05f` so next sync stays clean. |
| `7e8aaa2` | ux: /subprocessors link in Footer | PASS. Reading-flow ordering (About, Privacy, Subprocessors, Terms) matches data → flows → contract logic. |
| `af38c7b` | seo: programmatic OG image (1200x630) | PASS. PNG renders at correct dimensions, ~92 KB. Metadata file convention auto-wires `og:image` + `twitter:image`. The `_headers` rule for `/opengraph-image` applies cleanly (Cloudflare Pages serves with `Content-Type: image/png` confirmed in production). System fonts ship intentionally per the woff2-vs-ttf `@vercel/og` constraint. Founder/designer can replace the asset by dropping a 1200x630 PNG at the same path. |
| `18dff63` | a11y: skip-link + focus-visible + Navbar ARIA | PASS on intent, BUT shipped a regression. The `border-radius: 2px` declaration on `*:focus-visible` snapped focused rounded elements to 2px corners. Caught as HIGH-1 in this audit; fixed in `5d49a6d`. Skip-link, Navbar ARIA, and `id="main-content"` anchors all work correctly. |
| `clawless-io/clawless-feedback` | New public feedback repo | PASS. README voice calm and honest. Five issue templates concise and consistently named. The kb-gap template matches the in-app Help button schema. `config.yml` correctly disables blank issues and surfaces the email contact link. One LOW iteration noted: bug-report template folds expected vs actual into one textarea; for high-volume triage that split matters but for launch volume this is fine. |

---

## Pre-launch must-fix list

All five CRITICAL and HIGH items that ship pre-launch are FIXED in
commit `5d49a6d`. No remaining must-fix items between now and launch-day.

The HIGH-5 font-loader dedup is **must-fix in v1.0.x**, not pre-launch:
the perf cost is bounded (around 25 KB of duplicate woff2 fetches on
first load), the implementation requires careful work to disentangle
multiple intertwined font-loading paths, and the visual rendering
under either path is correct.

---

## v1.x backlog (must fix in v1.0.x)

**HIGH-5: Font-loader dedup.**
- Path: `app/globals.css:4-38` declares `@font-face` for five woff2 files
  in `public/fonts/`. `app/layout.tsx:16-33` independently loads the
  same five files via `next/font/local`. Both code paths run; the
  browser fetches both copies because globals.css's `--font-heading:
  'Exo 2', ...` references the literal family name (resolving to the
  globals.css copies) while `next/font` emits `<link rel="preload">`
  for its hashed copies that are never CSS-referenced.
- Recommended fix: delete the globals.css `@font-face` blocks; change
  `--font-heading: var(--font-exo2), -apple-system, sans-serif;` and
  `--font-mono: var(--font-space-grotesk), 'Fira Code', monospace;`
  in the `@theme` block. Verify `--font-sans` consumption flows
  correctly through Tailwind v4 tokens to next/font's CSS variables.
  Take screenshots of every page before and after to verify no
  visual regression.
- Why deferred from tonight: the change touches CSS-variable resolution
  through Tailwind v4 `@theme` tokens; under-tested in the codebase;
  visual verification needs a browser run. Punt to a clean-room
  follow-up.

**MEDIUM-2: Site-wide security headers.**
- Path: `public/_headers` currently contains only the OG-image
  Content-Type lock. The site ships without `X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options` (or CSP `frame-ancestors`),
  or `Permissions-Policy`.
- Recommended fix: add a global block at the top of `public/_headers`:
  ```
  /*
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    X-Frame-Options: DENY
    Permissions-Policy: camera=(), microphone=(), geolocation=()
  ```
- Note: full CSP is harder because of inline `style={{...}}` JSX in
  `Hero`, `ZeroData`, and similar components. A future CSP rollout
  will need to either nonce inline styles or migrate them to Tailwind
  utilities. Defer CSP itself; ship the four cheap-defense headers
  in this v1.0.x slot.

**MEDIUM-4: Sitemap priority for "shipping-with-launch" chapters.**
- Path: `lib/docs.ts` marks `attachments` and (other) chapters as
  `status: 'shipping-with-launch'`. `app/sitemap.ts:9-15` emits all
  16 chapters at priority 0.5 with `changeFrequency: 'monthly'`.
- Recommended fix: filter chapter sitemap entries by
  `status === 'live'`, or drop priority to 0.3 for
  `shipping-with-launch` chapters until they are truly live.

---

## Forever-backlog (taste / micro-optimization)

These are filed for completeness; ship if a refactor pass touches
the area, otherwise leave alone.

**LOW-1: Dead code in `components/ui/` and `components/effects/`.**
`Button.tsx`, `GlassCard.tsx`, `AnimatedCounter.tsx` have no
importers (verified). Tree-shaken at build, so no runtime cost, but
they are maintenance load. Delete on next ui-folder refactor.

**LOW-2: Unnecessary `'use client'` directive.**
`NoiseOverlay.tsx` and `GridBackground.tsx` have no client-state, no
event handlers, no hooks. The directive forces them onto the client
boundary unnecessarily.

**LOW-3: `Card.tsx` hover handled via JS.**
Uses `onMouseEnter`/`onMouseLeave` for hover styling. CSS-only via
`group` plus `group-hover:` would let it return to the server
boundary.

**LOW-4: Em-dash in JSDoc comment.**
`lib/cms-types.ts:3`: comment-only, technically allowed by the rule
(comments in code are fine), but a sweep keeps the codebase
rule-aligned.

---

## Notes

**Advisor brief referenced a SHA unverified locally at audit time.**
The audit brief named clawless-developer commit `87710c7` for "the
2026-05-08 KB-RAG Privacy + Subprocessors edits". That SHA did not
resolve in either clawless-site or clawless-v1 local git logs at
audit time (verified via `git log --all --oneline`). Post-audit
calibration from Advisor (2026-05-09 17:04): the commit was real
but unpushed at audit time, sitting in clawless-developer's local
working tree as part of an 89-commit batch awaiting founder push
authorization. The batch landed on `origin/main` later that day.
Methodology note for future audits: when a cited SHA does not
resolve locally, default framing is "unverified locally; may be
pending push," not "fabricated." Optional follow-up: `git fetch
--all` before verification, or `gh api repos/<owner>/<repo>/commits/<sha>`
to surface commits visible on GitHub even if the local clone is
behind. The legal mirror at
`clawless-v1/clawless/advisor/legal-docs/clawless-site/` is
currently in sync with clawless-site `4e73569` and has not required
an update from any subsequent commit (`7e8aaa2`, `af38c7b`,
`18dff63`, `5d49a6d` did not change legal-page copy semantically
even where they touched legal-page source files structurally).

**CLAUDE.md typography divergence.** CLAUDE.md states "Two typefaces
only: Newsreader serif for headings, Inter sans for body." The
actual `app/layout.tsx` loads Inter (Google) plus Exo2 (local) plus
SpaceGrotesk (local). No Newsreader anywhere. Either CLAUDE.md is
stale (implementation made an explicit choice that did not
back-propagate to docs) or the implementation drifted. Founder-level
decision; flagged earlier in the night via Advisor for resolution.

**Cloudflare Pages `_headers` matcher.** The `/opengraph-image`
rule should match the exact path because there is no trailing
wildcard. Cloudflare Pages defaults to prefix matching, but the
absence of a wildcard makes it effectively exact for this rule.
Production verification confirmed `Content-Type: image/png` on the
deployed URL, so the rule is working. If a future route starts
with `/opengraph-image-foo`, the lock could leak; low-risk note for
launch-day caretaker.

**Intentional voice override on /about.** The LinkedIn link to the
founder's personal LinkedIn is a documented trial override of the
v1 brand "no social links" rule. Memory file
`feedback-linkedin-link-conditional.md` records this. Not a
finding.

**LS webhook receiver and Cloudflare deploy pipeline both clean.**
The `functions/lemonsqueezy.ts` handler is well-tested (16 tests,
all passing) and well-hardened (body size cap, signature length
guard, Retry-After hint). The GitHub Actions deploy workflow
serializes pushes per branch, pins Bun 1.3.x to avoid silent
upstream breakage, and uses a Cloudflare API token with scoped
permissions. No findings.
