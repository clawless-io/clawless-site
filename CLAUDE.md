# clawless-site, agent operating notes

This is the marketing website for Clawless Computer (the desktop app),
hosted at clawless.ai. Built with Next.js 15 + React 19 + Tailwind v4,
static-exported, deployed to Cloudflare Pages via a GitHub Actions
wrangler-action workflow.

## Workflow

Trunk-based on `main` (locked 2026-04-30, replaces the older dev → main
flow). Direct commits, local sanity gate before push, no PRs. The
sister repo `rbjglobal-site` uses the same rule.

```bash
bun run typecheck
bun run test            # 16 tests, includes the LS webhook handler
bun run build           # Static export to out/
git push origin main
```

`.github/workflows/deploy.yml` runs on every push to `main`: install,
typecheck, test, build, then `wrangler pages deploy out/`. Deploy
finishes in ~3 minutes. The webhook receiver at `functions/lemonsqueezy.ts`
runs on Cloudflare Pages Functions (Node-compatible runtime, deployed
with the static site as a single project).

**Do NOT run `bun run build` while `bun run dev` is active.** They
share `.next/` and corrupt each other. Stop the dev server first or
use a separate clone.

## Voice and brand rules (locked)

- No em-dashes (—) anywhere in user-facing copy. Hyphens in compound
  words are fine. Comments in code are fine. The rule is for the
  rendered surface.
- No superlatives ("world-class", "leading", "innovative",
  "revolutionary", "best-in-class").
- No competitor naming or anti-positioning by default. Factual
  contrasts of price or feature posture are allowed only on
  `/pricing` and only with explicit Clawless Advisor approval.
- Anthropic.com-style institutional calm. Reading-page voice, not
  startup landing-page energy.
- Two typefaces only: Newsreader serif for headings, Inter sans for
  body. Both self-hosted via `next/font/google`.
- **Zero data collection** on the marketing surface: no analytics,
  no cookies, no email forms, no newsletter, no third-party scripts.
  This is a founder rule that overrides any future "we should collect
  X" proposal. The trial activates inside the desktop app, not via a
  signup form on the site.
- Primary CTA across the site is `/download`, not `/pricing`. The site
  has no signup flow.

## Coordination with Clawless Advisor

For positioning decisions, copy red-lines, cross-product framing
questions, naming sanity-checks, and anything that touches more than
one repo, route to the `Clawless Advisor` ClaudeLink role first. The
Advisor is the founder's planning terminal and the canonical source of
"is this on-brand?" judgment across the family (clawless.ai +
rbjglobal.com + clawdemy.org + whisprdesk.com).

For routine workflow choices (file paths, commit shape, sanity gate
order, link colors, etc.), decide yourself and report after. Escalate
only for critical issues.

## Model selection policy

Founder-approved fleet-wide policy 2026-05-07 (relayed via Clawless
Advisor):

**Default Sonnet 4.6.** Escalate to **Opus 4.7** for: visual-design
judgment calls, marketing-copy authorship for landing pages, anything
touching the legal pack mirrors at `advisor/legal-docs/clawless-site/`.
Routine site changes, content edits, deployment scripts, sitemap
maintenance, address-scrub-style cleanups all run Sonnet. Subagent
Explore + Plan default Sonnet.

Iterative; advisor tunes over the first 3-4 days. If you escalate to
Opus mid-task on something the policy says is Sonnet, capture the
trigger for the next calibration pass.

## Receiving updates from sister product terminals

Other terminals send ClaudeLink messages when they ship something this
marketing site should reflect. You are the editor. Current roster
(2026-05-08): `Clawless Advisor`, `clawless-developer`,
`Clawdemy Developer Opus`, `Clawless-kb`, `WhisprDesk developer`,
`trading-agents-lab`. The full lookup with "when to ping each" lives
in the `reference-claudelink-agent-roster` memory file. Always confirm
the exact role string with `mcp__claudelink__get_agents` before
sending — renames happen (Clawdemy two-terminal Opus+Sonnet experiment
ran 2026-05-07 then rolled back 2026-05-08; single-terminal Clawdemy
on Opus 4.7 going forward; do NOT address `Clawdemy Developer Sonnet`).

When you receive one:

1. Acknowledge within an hour during work sessions.
2. Verify the change is actually live before claiming it on the
   marketing site (visit the URL, check the commit, confirm the
   feature is reachable in the shipped desktop build).
3. Draft the change in this repo following voice + brand rules above.
4. Sanity gate, commit, push. Cloudflare auto-deploys.
5. Reply to the sender with the commit hash + live URL once deployed.

If a message lacks required content (product name, one-line summary,
suggested copy snippet, link to commit/PR/release, page placement),
reply asking for the missing pieces before drafting. Do not invent
claims.

## Site shape (current)

Indexable pages (in `app/sitemap.ts`):
- `/` (home, launch-ready hero with "Coming Q3 2026" pill)
- `/features`
- `/pricing`
- `/docs` (chapter index) + `/docs/<slug>` for each KB chapter
- `/download` (placeholder microcopy until launch-day signed releases)
- `/about`
- `/privacy` (priority 0.3 — placeholder copy; address removed 2026-05-05;
  reindexed 2026-05-02)
- `/terms` (priority 0.3 — placeholder copy; address removed 2026-05-05;
  reindexed 2026-05-02)
- `/subprocessors` (priority 0.3 — Lemon Squeezy + Cloudflare named;
  shipped 2026-05-05)

Top-nav order: Features, Pricing, Docs, Download, About. Docs slots
between Pricing and Download so trial-curious users can research the
product before downloading.

There is no `/cookies`, no `/disclaimer`, no `/refunds`, no
`/acceptable-use` page on this site. The /terms placeholder bundles
acceptable use, refund policy, and warranty disclaimers into the
forward-looking line; full topical breakdown ships with launch.

## Docs sync protocol (standing rule)

The 16 chapters at `content/docs/*.md` are a synced copy of
`clawless-v1/clawless/docs/knowledge-base/*.md`. The desktop-app
planning workspace `clawless-v1` is the source of truth; this site
holds a synced copy because clawless-v1 has no public git remote and
Cloudflare Pages cannot pull from it at build time.

When clawless-developer (or anyone) updates a KB chapter:

1. From `clawless-site`, run `bun run sync-docs`. This wipes
   `content/docs/` and re-copies every `.md` from clawless-v1
   (skipping the in-tree `README.md`).
2. Spot-check the diff. Voice + brand rules apply: scan for em-dashes
   that snuck in, internal references (file paths, IPC names, class
   names), and `[Shipping with launch]` badges that should now read
   `[Live]` post-GA.
3. Sanity gate, commit, push.
4. The KB-RAG worker at `kb.clawless.ai` indexes the same chapters
   and emits citation URLs as `clawless.ai/docs/<chapter-slug>#<anchor>`.
   Rename a chapter slug ONLY if you also coordinate a re-index with
   `Clawless-kb` — slugs are load-bearing for citation correctness.

Chapter taxonomy (categories, display order, per-chapter descriptions
on the index page) lives in `lib/docs.ts`. New chapters need a new
entry there or they won't appear in the index even after sync.

Webhook surface (not a page):
- `functions/lemonsqueezy.ts` at `/lemonsqueezy` — Lemon Squeezy
  webhook receiver, Phase 1 logging stub. Hardened with body size
  cap, signature length guard, Retry-After hint. See `WEBHOOKS.md`.

## Pre-launch backlog (gates on external deps)

- **Drop the "Coming Q3 2026" hero pill** AND the `/download`
  placeholder microcopy in the same launch-day commit. Gated on:
  LLC Apple Developer cert + Windows EV cert + first signed release
  upload. Do not split, keep aspirational language consistent until
  everything goes live together.
- **Browser Automation Phase 2 features.** Live in-app viewport,
  per-agent browser profiles, per-agent feature toggle, and
  multi-session pools land in a later release. Do not claim them
  on the site until clawless-developer pings. Phase 1 (default-on,
  headed-by-default with headless toggle, per-hostname first-time
  prompt, hardcoded sharp-edge URL refusal) shipped 2026-05-03 in
  the `/features` Browser Automation group (Group 05).
- **`lib/constants.ts` "20+ platforms" → "22 platforms"** once channel
  verification stabilizes pre-launch (P3, low priority).

The Privacy + Terms LLC entity-of-record fix shipped 2026-05-02 in
commit `416b57f`. Both pages name RBJ Global LLC as the operator
and contracting party, the public contact email is info@rbjglobal.com,
the SEO deindex is reversed.

## LLC entity name

The operating entity is **RBJ Global LLC** (decision finalized
2026-05-02; Texas SOS approval landed 2026-05-04, founder
confirmed in-terminal). The name is safe to use in code, docs,
public sites, AND in external submissions to Lemon Squeezy, Stripe,
Apple Developer, Google Play, D&B, lawyers, CAs, KYB/KYC verifiers.
Bank-account update is a separate gate the founder is still working
but does not block external-name submissions.

**Public address — NO ADDRESS ON WEB** (founder decision 2026-05-05,
relayed via Advisor). No street address on any public marketing
surface across the RBJ family. Customers reach RBJ Global LLC
through email; entity is identified by name + state of formation
only. Address scrubbed on clawless-site `f5a41c2` and rbjglobal-site
`083c1ef` (2026-05-05). Do NOT add an address back without explicit
founder authorization.

## Legal docs mirror sync protocol (standing rule)

Whenever a commit on this repo modifies a legal page (`app/privacy/page.tsx`,
`app/terms/page.tsx`, or any future legal route) or the entity / address /
contact-email constants those pages render from, mirror the change into the
founder's advisor folder in the same session:

- Source repo: `/Users/junaidsiddiqi/Projects/clawless-io/clawless-site`
- Mirror folder: `/Users/junaidsiddiqi/Projects/clawless-v1/clawless/advisor/legal-docs/clawless-site/`
- Files to keep in sync: `privacy.md`, `terms.md`, `README.md`
- After updating the affected `.md` file, bump the `Last sync timestamp` and
  `Mirror taken from commit` fields in `README.md` to the new HEAD SHA.
- If a new legal page is added on this repo, add a new `.md` file plus a row
  to the README's Contents table. If a legal page is removed, remove its
  `.md` plus the row.

This sync is internal-only (the mirror folder lives in `clawless-v1`, the
founder's planning workspace). Do not commit the mirror to a public repo.
Touching the mirror does not require its own commit on the source repo,
but the source-repo commit message should mention "(mirror updated)" so
the audit trail is visible.

## Material policy changes (standing rule)

A **material** policy change is any of:

- A new data flow we collect, or a new category of personal information
  we hold
- A new sub-processor introduced (analytics provider, marketing tool,
  feedback widget, support helpdesk, anything that touches user data)
- A scope expansion (the policy starts covering a new product, surface,
  or audience)
- Anything a reasonable user would want to know about before continuing
  to use the site or product

Material changes ship with **both** of the following:

1. A **30-day banner at the top of the homepage** announcing "Privacy
   Policy updated [date], see what changed", linking to /privacy. The
   banner auto-retires after 30 days. Implementation lands when the
   first material change is queued; until then, this rule documents
   intent.
2. A **Changelog entry at the bottom of the affected policy** with the
   date and a short description of what changed. The Changelog
   mechanism is in place on both /privacy and /terms as of 2026-05-03.

**Non-material updates** (typo fixes, clarifications, formatting, the
kinds of edits the 2026-05-02 reviewer audit produced) just bump the
effective date and add a Changelog entry; no banner needed.

Today's commits (2026-05-02 polish and 2026-05-03 reviewer-driven
applies) are non-material clarifications under this rule. Subsequent
edits that meet the material bar above must follow both legs.

### Arbitration / class-action waiver posture (Clawless Computer)

The 2026-05-03 founder decision: Texas governing law and Travis County
venue are named today on the placeholder Terms. **NO arbitration, NO
class-action waiver at this stage.** Informal-first dispute resolution
paragraph encouraging email-first resolution. Revisit arbitration and
class-action waiver when Clawless hits ~10K paying users, with lawyer
opinion at that point. Do not introduce arbitration or waiver language
into the Terms placeholder before that revisit, regardless of which
agent suggests it.

## Source-of-truth references

- Knowledge base for product claims: `clawless-v1` repo, the in-app
  spec docs and the desktop README.
- Voice reference: `rbjglobal-site/app/about/page.tsx` (calm
  institutional reading-page tone).
- Pricing constants and copy rules: locked in memory at
  `~/.claude/projects/-Users-junaidsiddiqi-Projects-clawless-io-clawless-site/memory/project-pricing-page-locked-numbers.md`.
- Lemon Squeezy webhook contract: `WEBHOOKS.md` in this repo.

## Last session handover (2026-05-12 → 2026-05-14, end of day 2026-05-14)

Three working days, one continuous session across multiple reopens.
Bulk of the work is cross-product marketing coherence: LinkedIn
Follow CTA rollout, B99 Telegram allowlist + Channels-agent + ClawHub
UX KB syncs, count-agnostic copy sweep on rbjglobal.com (driver: an
imminent 4th product), Clawdemy read-along enhancement reflected on
parent site PLUS an inline read-along audio demo of that feature, and
Phase 1 of the Clawless brand-update arc (new favicon + OG image).
Resume notes assume a brand-new session boot.

### Ship list (clawless-site main, chronological)

- `39f9b49` (carried from prior handover — security.txt + /trust).
- `8911369` (carried — footer Trust link).
- `29cd83c` (carried — mobile footer wrap fix).
- `7333b88` (carried — prior CLAUDE.md handover refresh).
- `e802459` `linkedin-follow-cta` (DELETED branch, widget A/B variant).
  Founder-tested locally, NOT merged. Two-click flow (our button
  injects LinkedIn widget, user clicks LinkedIn's button inside it)
  rejected by founder for expected ~50% intent drop.
- `84eee09` LinkedIn Follow CTA, **single-click external link variant
  (winner)**. Founder picked "lovely. Exactly what you and I
  envisioned. One click, and that's it." `components/FollowLinkedIn.tsx`
  is a plain `<a>` with `target="_blank" rel="noopener noreferrer"`
  to `linkedin.com/company/114564073/`. Two placements: hero
  (PRE_LAUNCH-gated, Variant A copy verbatim) + footer (subtle
  variant). `config/site.ts` PRE_LAUNCH = `NEXT_PUBLIC_PRE_LAUNCH
  !== 'false'`. Tests: Playwright e2e (external-link contract) +
  vitest 3 specs for PRE_LAUNCH branches. Privacy paragraph added at
  /privacy describing the no-LinkedIn-JS-on-this-site posture.
  Privacy mirror at `advisor/legal-docs/clawless-site/privacy.md`
  synced. Parallel-branch A/B pattern endorsed by Advisor as a
  working approach for behavior-debatable surfaces.
- `01d7162` docs: KB sync for B99 (Telegram "Lock to me" allowlist,
  Pairing/Locked/Open/DMs-off four-mode reframing, step-by-step
  Telegram allowlist setup) + ClawHub catalog UX redesign (Top 50
  default, Show all toggle, Stop-sync button, permission-review
  modal, VirusTotal optional third layer). Source: clawless-v1
  `360d3fc` + ClawHub UX series. Voice-rule spot-check fixed one
  em-dash on skills-marketplace.md:50; flagged to clawless-developer
  who patched the KB source at clawless-v1 `5aa2dcb` so the next
  sync is a no-op on that line.
- `67dc3e3` docs: KB sync for Channels default agent + envelope-
  stripped session titles. Source: clawless-v1 `6aceabe`. Documents
  the new out-of-box Channels agent (alongside Assistant, Writer,
  Researcher, Local Helper, Planner, Tutor) and the default routing
  rule (every DM-capable channel routes to Channels) + three new
  Q&A entries.
- `4f2f94c` brand: swap favicon + OG image to new Clawless C+claw
  squircle (Phase 1). Founder + Advisor produced the assets in
  clawless-v1's `assets/icon/derivatives/`. Used Next.js 13+
  filesystem-icon convention: `app/favicon.ico` (multi-res ICO),
  `app/icon.png` (96x96), `app/apple-icon.png` (180x180),
  `app/opengraph-image.png` (1200x630, replacing the prior dynamic
  generator at `app/opengraph-image.tsx`). Old `app/icon.svg` and
  `app/opengraph-image.tsx` deleted. Founder verified the favicon on
  the browser tab, LinkedIn Post Inspector showed the new branded
  OG card, all direct asset URLs returned 200 with correct MIME
  types. Phase 2 (wordmark + lockup, visible page logo) deferred to
  next session per Advisor's scope.

### Ship list (rbjglobal-site main, chronological)

- `ef61762`, `0ec20d9`, `7e0c2e0` (carried from prior handover —
  /legal/security + footer Security link + security@rbjglobal.com
  flip).
- `c8da1dd` LinkedIn Follow CTA on rbjglobal.com (link variant, port
  from clawless-site `84eee09`). Footer-only, no hero, no
  PRE_LAUNCH gate. `LINKEDIN_COMPANY_ID = '116324588'` (RBJ Global
  LLC, not Clawless's 114564073). Privacy paragraph added at
  /legal/privacy in the Verification section. Footer bottom-bar
  restructured from single `<p>` (copyright only) to flex row
  (copyright + Follow link, stacks vertically on mobile under sm
  breakpoint). Added @playwright/test as the repo's first test
  framework; one e2e spec covering both brief assertions.
- `bd921a6` clawless-computer: refresh Channels capability bullet
  for the new four-mode DM Policy (Pairing default, Locked
  allowlist, Open to anyone, or DMs off). Tightened the previously-
  stale "anyone can DM, or only paired users" framing.
- `b904d90` clawless-computer: add 4th bullet to Channels card
  about the new Channels default-routing agent. "Phone-side
  conversations route to a dedicated Channels agent out of the box,
  so they land in one predictable place in your agent rail."
- `e44f96c` copy: decouple marketing copy from product count.
  HIGH-priority overnight dispatch from Advisor 2026-05-14 04:53
  EOD: scrub "three products" / "all three" framings across
  `app/page.tsx`, `app/products/page.tsx`, `app/about/page.tsx`,
  AND `lib/metadata.ts` SITE_DESCRIPTION (the +1 I caught beyond
  Advisor's pre-scan). 11 logical edits + 1 catch. Founder framing
  verbatim: "We may have 30 products by the end of 2027. Are we
  going to keep saying four products, five products, six products,
  seven products? I don't think so." Driver: imminent 4th product
  (TradingAgentsLab) shipping in 4-5 days.
- `5d9385a` clawdemy: add read-along Word/Paragraph toggle to
  /clawdemy + /learn (sister-product feature mention with
  philosophy beat). New section "Reading along, two ways" on
  /clawdemy describing the new feature shipped by Clawdemy
  Developer Opus at clawless-io/clawdemy `891e8a7`. Track 5 lesson-
  count refreshed from stale "Seven lessons" to "Thirty-two
  lessons" matching /learn page voice. /learn body extended with
  a middle paragraph naming the toggle.
- `63dfc08` clawdemy: add inline read-along demo to
  /clawdemy "Reading along" section. Live working demo on the
  parent site: visitor clicks play, audio narrates the paragraph
  word-by-word, each word lights bright as the narrator passes it,
  past words fade to 50% opacity, "Read a lesson at clawdemy.org"
  CTA fades in after playback. New `components/effects/ReadAlongDemo.tsx`
  + new asset at `public/audio/inline-demo-paragraph-readalong.mp3`
  (626KB, 39.06s, Clawdemy Track 5 PVC voice, SHA-verified before
  copy) + `lib/clawdemy-readalong-timing.ts` (88 word-level timing
  entries). MP3 mirrored same-origin from Clawdemy's pipeline output
  rather than hot-loading from audio.clawdemy.org, per the same-
  origin-mirror feedback rule. No analytics, no localStorage, no
  third-party scripts on the demo. Voice ID NOT in any commit,
  source, or metadata per Clawdemy `Doc/brand.md` voice-ID-handling
  rule.

### Advisor folder mirror state (clawless-v1, 2026-05-12 to 2026-05-14)

- `legal-docs/clawless-site/` — mirror bumped to `84eee09` for the
  LinkedIn Follow CTA privacy paragraph. README sync metadata
  updated. privacy.md mirror has the new "Follow on LinkedIn link"
  paragraph; other mirror files unchanged.
- `legal-docs/rbjglobal/` — mirror bumped to `c8da1dd` for the
  rbjglobal LinkedIn Follow privacy paragraph. README sync metadata
  updated. Subsequent rbjglobal copy commits (`bd921a6`, `b904d90`,
  `e44f96c`, `5d9385a`, `63dfc08`) did NOT touch legal pages and
  do NOT require mirror updates.
- Both site/rbjglobal mirrors remain working-tree-only in
  clawless-v1 git (untracked; not committed). Convention unchanged.

### Resolved this session (new memory files saved)

- **Count-agnostic marketing copy — CODIFIED 2026-05-14.** Feedback
  memory `feedback-count-agnostic-marketing-copy.md`. Default to
  "Our X / every X / X include A, B, and C" framings instead of
  hardcoded counts. Driven by the overnight rbjglobal scrub.
- **No anchored launch date for Clawless — POLICY-LOCKED 2026-05-12.**
  Project memory `project-no-anchored-launch-date.md`. No "~N days
  to GA" framing anywhere; launch is gated on Apple Developer
  Program + cert + 2-3 week dual-machine update test loop. "Q3
  2026" marketing copy stays untouched without founder auth.
- **Mirror cross-product assets same-origin — CODIFIED 2026-05-14.**
  Feedback memory `feedback-mirror-cross-product-assets-same-origin.md`.
  Driver was the read-along demo MP3; Clawdemy proposed
  `audio.clawdemy.org/...` hosting, I countered with same-origin
  mirror to preserve the parent-site privacy posture and avoid a
  cross-origin disclosure beat.
- **Trading Agents Lab is the upcoming 4th RBJ product — CAPTURED
  2026-05-14.** Project memory `project-trading-agents-lab-fourth-product.md`.
  AGPL-3.0 fork of TauricResearch/TradingAgents being built by the
  Trading Agents Developer terminal, ~4-5 days out. Full add-a-
  product-card checklist for rbjglobal.com captured in the memory
  file. Don't touch until they dispatch.

### Carry-forward feedback memories (still applicable)

- `feedback-audit-sha-verification-default.md` — applied this session
  on the SHA `eea1030` (Clawdemy local-only, not pushed to origin
  main) when citing it on the read-along demo commit. Used the
  "unverified locally; may be pending push" framing as documented.
- `feedback-bundle-footer-link-with-legal-route.md` — applied this
  session on the LinkedIn Follow rollout (footer link shipped in
  the same dispatch as the page CTA).

### Open items waiting on external (do NOT touch until pinged)

Most carry forward unchanged from prior handover.

- **Phase 2 brand swap (wordmark + lockup on the visible page).**
  User explicitly said tomorrow: *"Let's call it a night. We will
  start phase two tomorrow."* Wait for Advisor or founder dispatch;
  do NOT touch `public/logo-lockup.svg` / `public/logo-mark.svg` /
  `public/logo-wordmark.svg` (or the rbjglobal equivalents) until
  authorized. Will likely use the new icon as a mark with a paired
  wordmark; the wordmark design itself is the Phase 2 deliverable.
- **TradingAgentsLab 4th product card ship.** ~4-5 days out from
  2026-05-14. Full checklist in
  `project-trading-agents-lab-fourth-product.md`. Includes the
  responsive grid update (`md:grid-cols-3` → 4-card layout) that
  was DELIBERATELY deferred from the count-decoupling sweep per
  Advisor's note.
- **Browser Automation Phase 2** (live in-app viewport, per-agent
  browser profiles, etc.) — clawless-developer ping when ready.
- **`lib/constants.ts` "20+ platforms" → "22 platforms"** once
  channel verification stabilizes. Still pending.
- **Launch-day pill drop + /download placeholder microcopy.** Still
  hard-blocked on Apple Developer cert + Windows EV cert + first
  signed release. See `project-no-anchored-launch-date.md` for the
  gate.
- **`security@clawless.ai` Workspace alias.** No new signal received
  this window; fallback commits still on standby.
- **Bank-account update for RBJ Global LLC.** Founder-side external.
- **HIGH-5 font-loader dedup** + **MEDIUM-2 site-wide security
  headers** + **MEDIUM-4 sitemap priority for shipping-with-launch
  chapters** — v1.0.x slot per `docs/audits/audit-backlog-2026-05-09.md`.
- **Sister-product security.txt files.** WhisprDesk + Clawdemy
  devs' work, not this terminal's. No update this window.

### Open verification gap (carries forward, founder-side)

clawless.ai sitemap-submission state in Google Search Console and
Bing Webmaster Tools is still unknown from the repo. GSC
verification file is committed; whether "Submit sitemap" was
clicked in the GSC UI is outside repo visibility. 30-second action
for the founder if not yet done.

### Sister-terminal roster note

`get_agents` on 2026-05-14 showed 7 online terminals:
`clawless-advisor`, `Clawdemy Developer Opus`, `Trading Agents
Developer`, `WhisprDesk Developer`, `clawless-developer`, `Clawless
Site Developer` (me), `clawless-kb-developer`. The `Trading Agents
Developer` row is new compared to the 2026-05-11 roster — they were
not enumerated in `reference-claudelink-agent-roster.md` at last
audit. If a future cross-terminal dispatch involves them, confirm
the exact role string via `get_agents` first (the standing rule).
The roster memory file should be refreshed when a substantive
dispatch from/to them lands; minor cleanup not urgent.

### Resume-here for next session

1. **Check inbox first.** Likely pings: Phase 2 brand dispatch
   from Advisor (founder is starting it "tomorrow"); Trading Agents
   Developer when TradingAgentsLab is ready to announce; sister-
   product KB syncs from clawless-developer.
2. Confirm both source repos clean on resume. The clawless-v1
   mirror folder will show untracked site/rbjglobal/clawdemy
   mirrors — convention, do not commit them in clawless-v1.
3. Default to Sonnet 4.6 per model-selection policy. Escalate to
   Opus for visual-design / marketing-copy authorship / legal
   mirror touches. The 4f2f94c brand swap was Opus-eligible
   (visual-design judgment); the read-along inline demo
   component was Opus-eligible (substantive copy + new component
   pattern).
4. Route cross-cutting questions to `clawless-advisor` first
   (founder's main orchestrator). Direct sister-terminal dispatch
   is fine for cross-product asset/feature coordination
   (Clawdemy Developer Opus, clawless-developer, etc.) per the
   parent-site update protocol.
5. No uncommitted state on either repo at handover. dev-running
   process from a different project (WhisprDesk/website) was
   noted but does not affect clawless-site / rbjglobal-site
   `.next/` directories.

## ClaudeLink - Autonomous Agent Communication

You are part of a multi-agent team. Other agents may be running in separate terminals and can send you messages at any time via ClaudeLink.

### Automatic Inbox Checking

- **BEFORE starting any task**: Check your inbox using `read_inbox` first
- **AFTER completing any task**: Check your inbox again using `read_inbox`
- If you receive a message, acknowledge it and act on it before moving on
- If a message requires you to change your current work, do so immediately
- If a message is from another agent asking for information, respond using `send` before continuing your own work
- High-priority messages take precedence over your current task

### Autonomous Collaboration

- When you finish work that another agent might care about, proactively send them an update
- If you encounter a problem that another agent's role could help with, send them a message
- When you make a decision that affects the project, post it to the bulletin board
- If you're blocked waiting for another agent, say so and check inbox again

### Communication Shortcuts

- **"check response"** or **"check messages"** — Use `read_inbox` to check for new messages
- **"ask the [role]"** — Send a message to that role and check inbox for their reply
- **"tell the [role]"** — Send a one-way message to that role
- **"who's online"** — Use `get_agents` to list all connected agents
- **"update the board"** — Use `post_bulletin` to post a status update
- **"check the board"** — Use `get_bulletin` to read the bulletin board
