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

## Last session handover (2026-05-09 → 2026-05-11, end of day 2026-05-11)

This handover spans three working days as one continuous session
across two short reopens. Bulk of the work is the trust-signal
infrastructure shipped on 2026-05-11 for the morning founder
verification window. Resume notes assume a brand-new session boot.

### Ship list (clawless-site main, chronological)

- `b02384a` audit: pre-launch independent code review (2026-05-09).
  20-finding report at `docs/audits/2026-05-09-pre-launch-audit.md`
  with severity breakdown CRITICAL/HIGH/MEDIUM/LOW + companion
  backlog file `docs/audits/audit-backlog-2026-05-09.md` for the
  HIGH-5/MEDIUM/LOW items deferred to v1.0.x.
- `5d49a6d` audit-ship batch: CRITICAL-1 ScrollReveal SSR fix,
  HIGH-1 through HIGH-4 (branded 404 at `app/not-found.tsx`,
  metadata polish, build-output verification, accessibility
  `id="main-content"` anchor in `18dff63`). HIGH-5 font-loader
  dedup deferred to v1.0.x.
- `3af47ad` docs(audit): soften 87710c7 SHA framing per Advisor
  calibration. Report's "Notes" section changed from "non-existent
  / fabricated" to "unverified locally at audit time; may be
  pending push" for the cross-repo SHA that was real-but-unpushed
  in clawless-developer's 89-commit batch behind a founder push-
  authorization gate. Methodology refinement captured as a forward-
  looking standard in the report itself and in feedback memory
  `feedback-audit-sha-verification-default.md`.
- `39f9b49` trust: ship /trust + `.well-known/security.txt`
  (founder-auth via Advisor 2026-05-11). Three pieces: RFC 9116
  security.txt at `public/.well-known/security.txt`,
  `app/trust/page.tsx` matching the existing /privacy +
  /subprocessors visual treatment (Navbar/Footer + ScrollReveal +
  rounded card), sitemap addition at priority 0.3.
- `8911369` footer: add Trust link for /trust discoverability.
  Founder calibration moment ("What is the purpose of this
  implementation when the pages are invisible?") triggered a
  follow-up dispatch. Trust anchor added after Terms in the inline
  footer link row. Same pattern shipped on rbjglobal-site in
  parallel.
- `29cd83c` footer: wrap link row on narrow viewports to fix mobile
  clipping. User-reported bug — footer link row was overflowing
  on iPhone-width viewports after the Trust addition. Single-class
  swap (`flex items-center gap-6` → `flex flex-wrap items-center
  justify-center gap-x-6 gap-y-2 ... sm:justify-end`). Desktop
  layout unchanged; mobile now wraps onto centered rows. Verified
  via Playwright at 375x812.

### Ship list (rbjglobal-site main, chronological)

- `a9eaf90` learn: AI Foundations Phase 3 callout (training
  engineering). The previously-TBD `learn-page-callout` SHA from
  the prior handover, now resolved.
- `362ffb7` learn: Track 5 AI Foundations now complete (32 lessons).
  Track-completion update on the /learn audience-doormat page.
- `ef61762` legal: ship /legal/security + `.well-known/security.txt`
  (founder-auth via Advisor 2026-05-11). rbjglobal.com is the
  canonical host for the cross-product responsible-disclosure
  policy referenced by all four products' security.txt files.
  Scope covers Clawless Computer, WhisprDesk, Clawdemy,
  rbjglobal.com. Sections: How to Report, Our Commitment (5bd
  ack / 14d determination), Safe Harbor (CFAA + good-faith
  carveout), In/Out of scope, Good-faith conduct (90d disclosure
  recommendation), Contact. Excluded from sitemap per existing
  /legal/* noindex convention.
- `0ec20d9` footer: add Security link for /legal/security
  discoverability. Appended `{ label: 'Security', href:
  '/legal/security' }` to the LEGAL_LINKS config array; styling
  inherited from the shared list mapper.
- `7e0c2e0` legal: flip security@ contact to security@rbjglobal.com.
  Founder finalized the email-by-purpose framework (info@ general /
  support@ product support / security@ security disclosures) and
  created security@rbjglobal.com as the per-family alias. Parent
  canonical disclosure policy + security.txt now point to
  security@rbjglobal.com instead of borrowing security@clawless.ai
  from the desktop product. clawless.ai security.txt + /trust
  correctly remain on security@clawless.ai.

### Advisor folder mirror state (clawless-v1, 2026-05-11 sync)

- `legal-docs/clawless-site/` — mirror bumped to `39f9b49` HEAD.
  New `trust.md` row added with verbatim rendered content. Existing
  privacy.md/terms.md/subprocessors.md unchanged at this SHA
  (their `.tsx` files unmodified by the trust-signal dispatch).
- `legal-docs/rbjglobal/` — mirror bumped to `7e0c2e0` HEAD. New
  `security.md` row added; security@ contact pre-flipped to
  security@rbjglobal.com to match the live page. README sync
  metadata preserves the `ef61762` → `0ec20d9` → `7e0c2e0`
  commit-chain provenance.
- Both site/rbjglobal mirrors remain **working-tree-only** in the
  clawless-v1 git index — the empirical convention is that only
  clawless-app/ and whisprdesk/ mirrors are tracked; site +
  rbjglobal + clawdemy mirrors live untracked as founder-facing
  scratch.

### Denial precedent (scope discipline)

On 2026-05-09 the user denied an attempted edit to
`advisor/legal-docs/clawless-app/privacy.md` after a misrouted
FYI from Advisor asked this terminal to handle a desktop-app
legal-mirror sync (VT Phase 3 commit `e0b70b5`). Denial reason:
"Editing files in the advisor/legal-docs mirror is outside the
project working directory and the user only said 'check for
updates'; modifying legal mirror content without explicit user
direction is scope escalation on shared/sensitive material." The
one edit that landed before the denial was reverted in-place.
**Standing rule confirmed:** the clawless-app/ and whisprdesk/
mirrors are NOT this terminal's scope per CLAUDE.md. The
clawless-site/ and rbjglobal/ mirrors ARE in scope and may be
synced under the standing legal-pack mirror protocol. If a future
FYI asks this terminal to touch a non-site mirror, bounce-route
to the proper owner (clawless-developer for clawless-app,
WhisprDesk developer for whisprdesk) rather than crossing scope.

### Resolved this session (memory updated)

- **Audit SHA framing calibration — RESOLVED 2026-05-09.** Feedback
  memory `feedback-audit-sha-verification-default.md` saved with
  Why/How-to-apply. MEMORY.md indexed. Audit report amended in-
  place. Default for cross-repo SHA checks: "unverified locally;
  may be pending push" with `git fetch --all` / `gh api` as
  optional escalations.
- **Bundle footer link with new legal-adjacent route ship —
  CODIFIED 2026-05-11.** Feedback memory
  `feedback-bundle-footer-link-with-legal-route.md` saved after
  the founder's "pages are invisible" calibration. New legal-
  adjacent routes (/trust, /legal/*, /transparency, etc.) ship
  WITH their footer link in the same commit/dispatch by default.
- **`security@rbjglobal.com` alias — LIVE 2026-05-11.** Founder
  created the parent-family security@ alias to round out the
  email-by-purpose framework. clawless.ai surface still uses
  security@clawless.ai (correct); rbjglobal.com /legal/security
  and security.txt now use security@rbjglobal.com.

### Open items waiting on external (do NOT touch until pinged)

Carries forward unchanged from prior handover except where noted:

- **Browser Automation Phase 2** (live in-app viewport, per-agent
  browser profiles, per-agent feature toggle, multi-session pools).
  clawless-developer will ping when ready. Do not claim on /features.
- **`lib/constants.ts` "20+ platforms" → "22 platforms"** once
  channel verification stabilizes. Currently only Telegram is LIVE;
  other channels gated by SKIP_CHANNELS=1. P3, low priority.
- **Launch-day pill drop + /download placeholder microcopy.**
  Hard-blocked on LLC Apple Developer cert + Windows EV cert +
  first signed release upload. Founder-side external work.
  Drop both in the same commit; do not split.
- **`security@clawless.ai` Workspace alias.** Privacy page commits
  to two-business-day acknowledgment. /trust page commits to "five
  business days" via the published `rbjglobal.com/legal/security`
  policy. If founder reports either alias isn't routing, cut
  fallback commits substituting `info@clawless.ai` or
  `info@rbjglobal.com` respectively. No new alias-routing signal
  received in the 09-11 window.
- **Bank-account update for RBJ Global LLC.** Independent of
  external-name submissions; founder is working it.
- **HIGH-5 font-loader dedup** + **MEDIUM-2 site-wide security
  headers** + **MEDIUM-4 sitemap priority for shipping-with-launch
  chapters** — slated for v1.0.x release window per
  `docs/audits/audit-backlog-2026-05-09.md`. Plus LOW-1 through
  LOW-4 in forever-backlog.
- **Sister-product security.txt files.** WhisprDesk + Clawdemy
  devs will ship their own security.txt files pointing to
  `rbjglobal.com/legal/security` as the canonical Policy URL,
  using `security@whisprdesk.com` and `security@clawdemy.org`
  respectively. Not this terminal's work; just FYI for the
  cross-product picture.

### Open verification gap (carries forward, founder-side)

clawless.ai sitemap-submission state in Google Search Console and
Bing Webmaster Tools is unknown from the repo. GSC verification
file is committed (`public/googlefe2ff7dd9c0f27bc.html`); whether
"Submit sitemap" was clicked in the GSC UI is outside repo
visibility. 30-second action for the founder if not yet done.

### ClaudeLink registration note

This terminal registers as **`Clawless Site Developer`** (Title
Case). The Advisor handle is `clawless-advisor` (lowercase) —
confirmed via `mcp__claudelink__get_agents` during this session
after an initial Title-Case send failed with "No agent found with
role 'Clawless Advisor'." Always confirm via get_agents before
sending; CLAUDE.md already documents this rule but the slip is
worth re-flagging in resume notes.

### Resume-here for next session

1. Check inbox first. Likely pings: clawless-developer if KB
   chapters update (triggers `bun run sync-docs`) or B66 Phase 2
   features land; Advisor for cross-cutting work; Clawdemy
   Developer Opus for source-of-truth lookups; WhisprDesk dev or
   Clawdemy dev if their security.txt files ship and they want
   any cross-link verification on rbjglobal.com/legal/security.
2. Confirm both source repos clean on resume (they were clean at
   handover). The clawless-v1 mirror folder will show untracked
   site/rbjglobal/clawdemy mirrors — that's by convention, do
   not commit them in clawless-v1.
3. Default to Sonnet 4.6 per model-selection policy. Escalate to
   Opus only for visual-design / marketing-copy authorship /
   legal mirror touches.
4. Route cross-cutting questions to `clawless-advisor` first
   (founder's main orchestrator).
5. No uncommitted state on either repo at handover.

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
