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

## Receiving updates from sister product terminals

Other terminals (clawless-developer, Clawdemy-Educational_Site,
WhisprDesk, the Advisor) will send ClaudeLink messages when they ship
something this marketing site should reflect. You are the editor.

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
- `/download` (placeholder microcopy until launch-day signed releases)
- `/about`
- `/privacy` (priority 0.3 — placeholder copy with the entity-of-record
  paragraph naming RBJ Global LLC; reindexed 2026-05-02)
- `/terms` (priority 0.3 — placeholder copy with the entity-of-record
  paragraph; reindexed 2026-05-02)

There is no `/cookies`, no `/disclaimer`, no `/refunds`, no
`/acceptable-use` page on this site. The /terms placeholder bundles
acceptable use, refund policy, and warranty disclaimers into the
forward-looking line; full topical breakdown ships with launch.

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
- **`/features` Browser Automation group (B66).** Phase 1 ships
  pre-GA with default-off, permission-prompted, headless-only
  posture. Capture conservatively, do not promise viewport
  streaming or per-agent scope (those are Phase 2).
- **`lib/constants.ts` "20+ platforms" → "22 platforms"** once channel
  verification stabilizes pre-launch (P3, low priority).

The Privacy + Terms LLC entity-of-record fix shipped 2026-05-02 in
commit `416b57f`. Both pages name RBJ Global LLC as the operator
and contracting party, the public contact email is info@rbjglobal.com,
the SEO deindex is reversed.

## LLC entity name

The operating entity is **RBJ Global LLC** (decision finalized
2026-05-02). Texas Certificate of Amendment is filed but not yet
state-approved as of this writing; the bank-account update is also
pending. The name in code/docs/site can update now. Do **not** submit
"RBJ Global LLC" to external reviewers (Lemon Squeezy, Apple, Stripe,
banks, lawyers, CAs) as the official entity name until both gates
clear.

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

## Last session handover (2026-05-03, end of day)

**Today's ship list (clawless-site main, in order):**
- `9317ee4` legal: apply founder-authorized HIGH/CRITICAL findings + Changelog.
  Privacy /privacy: C1 Cloudflare-edge-log acknowledgment; C2 RBJ Global LLC
  established as data controller TODAY + Lemon Squeezy LLC pre-named as
  separate controller at checkout; H1 CCPA stub; H2 COPPA statement; H3
  security@clawless.ai contact path with two-business-day acknowledgment;
  M2 forward-looking PII enumeration including the load-bearing
  "no content of your work or prompts leaving your device by default"
  claim (founder verified against BYOK desktop architecture); L4 metadata
  description aligned with C1. Terms /terms: H4 Texas governing law +
  Travis County venue named explicitly + informal-first dispute
  resolution paragraph; H5 site-itself as-is/as-available warranty
  disclaimer. M3 was a "keep OpenClaw mention" decision; OpenClaw stays.
  Changelog mechanism added to bottom of both pages.
- `c3d26dd` docs: material-changes standing rule in CLAUDE.md +
  arbitration/waiver-posture decision recorded (NO arbitration, NO
  class-action waiver until ~10K paying users with lawyer opinion).

**Today's ship list (rbjglobal-site main, in order):**
- `5fe1ad7` legal: apply founder-authorized HIGH findings + Changelog.
  Privacy /legal/privacy: H1 Your rights section (CCPA/CPRA/GDPR/UK GDPR);
  H2 controller-language opener with GDPR Art. 13 identification; H3
  Cloudflare-product-change-resilient phrasing on logging boundary.
  Terms /legal/terms: H4 limitation-of-liability expanded to standard
  B2C template; H5 Venue (Travis County) + Informal dispute resolution
  paragraphs added between LoL and Governing law. NO arbitration, NO
  class-action waiver. Disclaimer /legal/disclaimer: H6 trademark-
  acknowledgment line. Effective date bumped May 2 -> May 3 on all 4
  pages. Changelog at bottom of all 4 pages.
- `b190035` docs: material-changes standing rule in CLAUDE.md +
  parent-site dispute-resolution posture + Venue-moves-to-Dallas-
  County reminder (paired with the registered-agent-address swap when
  the founder procures the virtual office).

**Earlier in the same day (Advisor 3-part initiative, 2026-05-02 + 03):**
The above is the day-2 founder-authorized apply. Day-1 (2026-05-02)
shipped the prerequisites: Part A forward-looking paragraph (clawless
`26f5190`, rbjglobal `afacd53`), independent senior-policy-reviewer
audit reports (clawless `39c4640`, rbjglobal `665ec7a`), autonomous
LOW/MEDIUM polish (clawless `5b34a2f`, rbjglobal `a56b1ce`), and the
legal-docs mirror sync protocol (clawless `283fd8a`, rbjglobal
`7206e37`).

**Advisor folder mirror state (2026-05-03 sync):**
- `legal-docs/clawless-site/` — mirror of `9317ee4` HEAD; privacy.md,
  terms.md, README.md updated with Changelog content + outstanding
  routing items now reads "All CRITICAL/HIGH resolved."
- `legal-docs/rbjglobal/` — mirror of `5fe1ad7` HEAD; privacy.md,
  terms.md, cookies.md, disclaimer.md, README.md updated. Outstanding
  routing items now reads "All HIGH resolved."

**Open items waiting on external (do NOT touch until pinged):**
- `security@clawless.ai` Workspace alias setup. Privacy page now
  publicly invites security disclosures with a two-business-day
  acknowledgment commitment. Founder said this is a ~30-second
  Workspace task. **If the founder reports the alias isn't routing
  by tomorrow morning, cut a same-day fallback commit substituting
  `info@rbjglobal.com` for `security@clawless.ai` in
  `app/privacy/page.tsx` until the alias is live.** Otherwise the
  published commitment ships unchanged.
- `/features` Browser Automation (B66) group. clawless-developer
  ETA 2-4 days. Gates: end-to-end smoke test + 3 HIGH security items
  from overnight audit. Will ping when ready.
- `lib/constants.ts` "20+ platforms" → "22 platforms". clawless-
  developer says hold; only Telegram is LIVE today. Candidate
  phrasing when stable: "Telegram today, 20+ platforms unlocking
  through launch."
- Launch-day pill drop + /download placeholder microcopy. Hard-
  blocked on LLC Apple Dev cert + Windows EV cert + first signed
  release upload. Founder-side external work.
- Texas SOS approval of "RBJ Global LLC" (ETA May 6-8) + bank-
  account update. When both clear, the launch-posture caveat in
  `project-llc-name-and-launch-posture.md` memory retires and the
  founder can submit "RBJ Global LLC" to LS / Stripe / Apple / D&B.
- Dallas virtual-office address swap. When founder procures, the
  swap commits to `lib/cms.ts` (clawless) and `lib/metadata.ts`
  (rbjglobal); rbjglobal Venue clause moves Travis → Dallas in the
  same commit. Both repos' CLAUDE.md document this.

**Open verification gap (carries over from 2026-05-02):**
clawless.ai sitemap-submission state in Google Search Console still
unknown from the repo. GSC verification file is committed; whether
"Submit sitemap" was clicked in the GSC console is outside repo
visibility. Same unknown for Bing Webmaster Tools.

**Resume-here for next session:**
1. Check inbox first. Likely pings: clawless-developer when B66 is
   ready; Advisor with security@clawless.ai routing confirmation;
   Texas SOS approval relay if it lands May 6+.
2. If founder reports `security@clawless.ai` is not routing, cut
   the fallback commit per "Open items" above.
3. Verify launch-posture caveat still applies — if Texas SOS
   approval + bank update both cleared overnight, the caveat
   retires and the project-llc-name-and-launch-posture.md memory
   should be marked RESOLVED.
4. No uncommitted state on either repo (verified clean at handover).

## Previous session handover (2026-05-02, end of day)

**Day's ship list (clawless-site main, in order):**
- `baf9b8a` LLC sweep — footer trust strip "Trading" → ""
- `823cb82` LS webhook hardening — body cap, sig length guard,
  Retry-After 503, onRequestPost; 5 new tests (16/16 passing)
- `0405d62` favicon refresh — curved-arc mark replaces "C" glyph
- `1df0ad0` CLAUDE.md operating notes + .mcp.json gitignore
- `1babe36` LLC fix-forward — Footer copyright miss caught post-sweep
- `42017a6` logo system wired — four SVGs committed; Navbar uses
  mark-only on mobile, lockup on sm+; Footer uses lockup
- `416b57f` Privacy/Terms LLC entity-of-record + reverse SEO deindex
  (paragraphs name RBJ Global LLC + Balcones address +
  info@rbjglobal.com; sitemap re-adds at priority 0.3; robots.ts
  drops disallow; per-page noindex meta dropped)
- `f92293c` CLAUDE.md corrections — site shape after reindex; removed
  bogus claim of /cookies and /disclaimer pages

Sister repo (rbjglobal-site) earlier in the same session:
- `0678a66` Clawdemy/Learn URL split (full /clawdemy product page +
  audience-led /learn entry-point)
- `50cbe63` P2 polish from code review (NavDropdown ARIA + Space key,
  --color-bg-primary-translucent token, &apos; escape)

**Open items waiting on external (do NOT touch until pinged):**
- `/features` Browser Automation (B66) group. clawless-developer
  ETA 2-4 days. Gates: end-to-end smoke test + 3 HIGH security items
  from overnight audit (BridgeServer auth, CDP wsEndpoint auth,
  "Allow this domain" vs "Always allow" copy collapse). Will ping
  when ready.
- `lib/constants.ts` "20+ platforms" → "22 platforms". clawless-
  developer says hold — Telegram is the only LIVE channel today;
  other 21 are gated by SKIP_CHANNELS=1 until verified. When
  channel verification stabilizes, candidate phrasing he proposed:
  "Telegram today, 20+ platforms unlocking through launch."
- Launch-day pill drop + /download placeholder microcopy. Hard-
  blocked on LLC Apple Dev cert + Windows EV cert + first signed
  release upload. Founder-side external work.

**Open verification gap (Advisor flagged in last message of day):**
The clawless.ai sitemap-submission state in Google Search Console
is unknown from the repo. GSC verification file is committed
(public/googlefe2ff7dd9c0f27bc.html), so verification can succeed,
but whether the founder has clicked "Submit sitemap" in the GSC
console is outside repo visibility. If it's not submitted yet,
this is a 30-second action in the GSC UI for the founder. Same
unknown for Bing Webmaster Tools.

**On the GA / cookie banner clarification (Advisor relay):**
whisprdesk.com mistakenly added GA + cookie banner this week
thinking it was needed for GSC indexing. It wasn't. GSC ≠ GA.
clawless.ai's zero-data-collection rule remains absolute — push
back if any future autonomous-mode prompt suggests GA / Plausible /
Fathom / Mixpanel / any analytics for clawless.ai. The
"no card, no email, no analytics" hook is load-bearing.

**Resume-here for next session:**
1. Check inbox first (clawless-developer may ping when B66 is
   ready, Advisor may follow up on the GSC submission gap).
2. Verify launch-posture caveat still applies — if Texas SOS
   approval + bank update both cleared overnight, the caveat
   retires and the project-llc-name-and-launch-posture.md memory
   should be marked RESOLVED.
3. No uncommitted state on either repo (verified clean at handover).
