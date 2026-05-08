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
(2026-05-07): `Clawless Advisor`, `clawless-developer`,
`Clawdemy Developer Opus`, `Clawdemy Developer Sonnet`, `Clawless-kb`,
`WhisprDesk developer`, `trading-agents-lab`. The full lookup with
"when to ping each" lives in the `reference-claudelink-agent-roster`
memory file. Always confirm the exact role string with
`mcp__claudelink__get_agents` before sending — renames happen
(Clawdemy split into Opus + Sonnet tiers 2026-05-07).

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

## Last session handover (2026-05-04 → 2026-05-07, end of day 2026-05-07)

This handover spans four working days as one continuous session.
The founder closed the terminal at end of 2026-05-07 to restart the
laptop; resume notes assume a brand-new session boot.

### Ship list (clawless-site main, chronological)

- `f5a41c2` legal: remove principal-office address from /privacy +
  /terms (mirror updated). Address scrub directive relayed by Advisor;
  founder authorized "no street address on any public marketing
  surface" 2026-05-05. Effective date bumped, non-material Changelog
  entry added.
- `9fe9203` legal: publish /subprocessors page (mirror updated).
  GDPR Art. 28 disclosure surface naming Lemon Squeezy (payment
  processor, Merchant of Record) + Stripe (downstream of LS) +
  Cloudflare (hosting + edge logs). Sections: intro, Payment
  processing, Hosting and delivery, Desktop application
  subprocessors (pointer, since BYOK provider list lives in-app),
  Updates, Changelog. Effective May 5, 2026. Sitemap entry priority
  0.3. Cross-link added from /privacy after enumeration paragraph.
- `a6cfb21` features: Browser Automation /features group +
  /privacy disclosure (B66). clawless-developer pinged 2026-05-04
  with B66 (Phase 1) ship status: bundled Chromium, headed-by-default
  with headless toggle, per-hostname first-time prompt with
  three-button modal (Allow once / Always allow / Deny), hardcoded
  navigation-layer refusal for local/file/browser-internal URLs,
  fresh browser per conversation. Group 05 inserted into FEATURE_GROUPS
  (eight groups total). New `(c) Browser Automation` clause added
  to /privacy forward-looking enumeration. Source-of-truth conflict
  resolved: KB chapter was stale; developer's verbatim modal strings
  + permission-model B are correct.
- `c397575` docs: add model-selection policy to CLAUDE.md.
  Founder-approved fleet-wide policy: Default Sonnet 4.6, escalate
  to Opus 4.7 for visual-design judgment, marketing-copy authorship,
  and legal-pack-mirror touches. Iterative; Advisor tunes over the
  first 3-4 days.
- `e4d68b3` docs: publish /docs surface — 16 KB chapters + index +
  nav (D1). Added react-markdown 10 + remark-gfm + rehype-slug +
  rehype-autolink-headings; new `lib/docs.ts` chapter taxonomy
  (5 categories), `scripts/sync-docs.sh` (path B sync from
  clawless-v1 — local-only repo, Cloudflare can't pull at build),
  `components/docs/MarkdownContent.tsx` server component,
  `app/docs/page.tsx` index, `app/docs/[slug]/page.tsx` dynamic
  route with `generateStaticParams`. Anchor IDs match the worker's
  citation pattern `clawless.ai/docs/<chapter-slug>#<anchor>`.
  NAV_LINKS reorder: Features, Pricing, Docs, Download, About.
  Sitemap adds /docs (0.7) + 16 chapters (0.5).
- `cfc9d11` docs: refresh CLAUDE.md sister-terminal roster
  (Clawdemy tier-split). Two-terminal split landed 2026-05-07:
  `Clawdemy Developer Opus` (synthesis/judgment/voice authority)
  + `Clawdemy Developer Sonnet` (ops/lookups/mechanical edits).
  This terminal is now `Clawless Site Developer` (Title Case).
- `05a2635` docs: commit pre-existing ClaudeLink protocol section
  in CLAUDE.md. Founder-authorized commit of an uncommitted-but-
  modified section that had been carrying since 2026-05-02. Three
  sub-sections preserved verbatim: Automatic Inbox Checking,
  Autonomous Collaboration, Communication Shortcuts. Founder
  clarification: "Clawless Advisor is the main Orchestrator;
  route questions there when in doubt."

### Ship list (rbjglobal-site main, chronological)

- `083c1ef` legal: address scrub. `COMPANY_ADDRESS` const removed
  from `lib/metadata.ts`; address blocks stripped from Footer,
  About, all four `app/legal/*` pages; Organization JSON-LD
  postal-address field removed; "Austin Texas software" removed
  from keywords. Effective date bumped, Changelog on all four
  legal pages.
- `learn-page-callout` (verify exact SHA on resume): Clawdemy
  Phase 3 callout added to /learn between audiences and "How
  Clawdemy works", covering scaling laws + Chinchilla, parallelism
  + Flash Attention, quantization + mixed precision.

### Advisor folder mirror state (clawless-v1, 2026-05-07 sync)

- `legal-docs/clawless-site/` — mirror of `f5a41c2` HEAD then
  `9fe9203` HEAD; privacy.md, terms.md, plus new subprocessors.md
  added with row in README Contents table.
- `legal-docs/rbjglobal/` — mirror of `083c1ef` HEAD; address
  removed from privacy.md, terms.md, cookies.md, disclaimer.md.

### Resolved this session (memory updated)

- **LLC launch-posture caveat — RESOLVED 2026-05-04.** Texas SOS
  approved the rename to RBJ Global LLC; founder confirmed
  in-terminal. External submissions (LS/Stripe/Apple/D&B/CAs)
  cleared. Bank-account update is independent and still in
  flight but no longer blocks the name. Memory file
  `project-llc-name-and-launch-posture.md` carries the resolved
  header.
- **Address swap obsoleted 2026-05-05.** "Dallas virtual office
  swap" reminder retired; founder chose "no address on web" for
  the entire RBJ family. Venue clause stays Travis County
  (decoupled from operating address).
- **B66 Browser Automation group on /features — SHIPPED 2026-05-03**
  in `a6cfb21` (already in repo at session start, just clarifying
  it's now done; Phase 2 features remain backlog).
- **Clawdemy roster split — DOCUMENTED 2026-05-07.** Roster memory
  file `reference-claudelink-agent-roster.md` refreshed to current
  7-agent lineup with tier-split + Title-Case rename of this
  terminal.

### Open items waiting on external (do NOT touch until pinged)

- **Browser Automation Phase 2** (live in-app viewport, per-agent
  browser profiles, per-agent feature toggle, multi-session pools).
  clawless-developer will ping when ready. Do not claim on /features.
- **`lib/constants.ts` "20+ platforms" → "22 platforms"** once
  channel verification stabilizes. Currently only Telegram is LIVE;
  other channels gated by SKIP_CHANNELS=1. P3, low priority.
  Candidate phrasing: "Telegram today, 20+ platforms unlocking
  through launch."
- **Launch-day pill drop + /download placeholder microcopy.**
  Hard-blocked on LLC Apple Developer cert + Windows EV cert +
  first signed release upload. Founder-side external work.
  Drop both in the same commit; do not split.
- **`security@clawless.ai` Workspace alias.** Privacy page commits
  to two-business-day acknowledgment. If founder reports the alias
  isn't routing, cut a fallback commit substituting
  `info@rbjglobal.com` in `app/privacy/page.tsx` until the alias
  is live. (Carrying over from 2026-05-03; no new signal received
  in the 04-07 window.)
- **Bank-account update for RBJ Global LLC.** Independent of
  external-name submissions; founder is working it.

### Open verification gap (carries forward, founder-side)

clawless.ai sitemap-submission state in Google Search Console and
Bing Webmaster Tools is unknown from the repo. GSC verification
file is committed (`public/googlefe2ff7dd9c0f27bc.html`); whether
"Submit sitemap" was clicked in the GSC UI is outside repo
visibility. 30-second action for the founder if not yet done.

### ClaudeLink registration note

This terminal registers as **`Clawless Site Developer`** (Title
Case). Re-registering with `register` creates a duplicate agent
record, it does NOT update by role name. To update description
without duplication, edit `~/.claudelink/nexus.db` agents table
directly via SQLite. The Command Center at
`http://127.0.0.1:7878` exposes a "Remove stale" button per agent
when the agent's PID is dead, but not while it's online.
Captured in the roster memory file.

### Resume-here for next session

1. Check inbox first. Likely pings: clawless-developer if B66
   Phase 2 features land or if a KB chapter is updated (triggers
   `bun run sync-docs`); Advisor with cross-cutting work; Clawdemy
   Sonnet for source-of-truth lookups when their lessons reference
   clawless.ai.
2. Confirm tree is clean on both repos before any new work.
3. Default to Sonnet 4.6 per model-selection policy. Escalate to
   Opus only for visual-design / marketing-copy authorship / legal
   mirror touches.
4. Route cross-cutting questions to `Clawless Advisor` first
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
