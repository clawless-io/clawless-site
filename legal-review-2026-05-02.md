# Legal Review, 2026-05-02

Reviewer posture: senior policy and terms reviewer with B2C software template
familiarity (1Password, Notion, Linear, Anthropic, Stripe Atlas reference bar),
US (Texas primary), GDPR, and CCPA literate. **This document is not legal
advice.** It is a structured red-team pass to drive an internal polish round
before the founder hands the docs to outside counsel for launch.

---

## Audit Scope

Files audited end-to-end:

| File | Last commit touching it |
| --- | --- |
| `app/privacy/page.tsx` | `416b57f` legal: name RBJ Global LLC as operator on /privacy and /terms |
| `app/terms/page.tsx` | `416b57f` legal: name RBJ Global LLC as operator on /privacy and /terms |

Files inspected to confirm they are absent (and assessed for whether absence
is itself a finding):

- `app/cookies/page.tsx` — does not exist. Assessed below.
- `app/disclaimer/page.tsx` — does not exist. Assessed below.
- `app/refunds/page.tsx` — does not exist. Refund language bundled into
  `app/terms/page.tsx`. Assessed below.
- `app/acceptable-use/page.tsx` — does not exist. Acceptable-use language
  bundled into `app/terms/page.tsx`. Assessed below.

Recent privacy/terms commit history:

- `416b57f` legal: name RBJ Global LLC as operator on /privacy and /terms
- `6d6e5fd` seo: deindex /privacy and /terms while they hold placeholder copy
- `f03a105` Replace em-dashes with commas in user-facing copy
- `8ab7041` Initial Clawless Computer marketing site

Note: `6d6e5fd` deindexed the placeholder pages; the operating-notes record
(CLAUDE.md, this session's handover) indicates `416b57f` re-indexed both at
sitemap priority 0.3. This audit treats the pages as publicly indexable.

---

## Repo State Note

- **Current branch:** `home-launch-ready`
- **Main branch:** `main`
- **HEAD on `home-launch-ready`:** `c07958f docs: add 2026-05-02 session
  handover to CLAUDE.md`
- **Recent commits visible from HEAD:**
  - `c07958f` docs: add 2026-05-02 session handover to CLAUDE.md
  - `f92293c` docs: update CLAUDE.md after privacy/terms reindex
  - `416b57f` legal: name RBJ Global LLC as operator on /privacy and /terms
- **Uncommitted state at audit time:**
  - Modified (M): `.github/workflows/deploy.yml`, `WEBHOOKS.md`,
    `app/icon.svg`, `functions/lemonsqueezy.ts`, `tests/lemonsqueezy.test.ts`
  - Untracked: `.mcp.json`, `CLAUDE.md`, `public/linkedin-banner.svg`,
    `public/logo-lockup.svg`, `public/logo-mark.svg`,
    `public/logo-wordmark.svg`
  - **Neither `app/privacy/page.tsx` nor `app/terms/page.tsx` is dirty.**
    All findings below are against the committed `416b57f` state.

External-entity caveat: founder has confirmed Texas SOS approval of the rename
to "RBJ Global LLC" is **pending** (ETA 2026-05-06 to 2026-05-08), and the
bank-account update is **pending**. Internal site copy can use "RBJ Global
LLC" today (and does); external submissions to Lemon Squeezy, Stripe, Apple,
banks, and CAs must wait until both gates clear. Recommendations below
respect this constraint.

---

## Top-line Executive Read

The current `/privacy` and `/terms` pages are explicitly placeholders, both
self-describe as "this page will be replaced with a full [policy] when the
product launches", and both correctly name RBJ Global LLC as the operator and
contracting party. For a pre-launch marketing site that genuinely collects
nothing, this is a defensible posture.

The findings cluster into three real concerns:

1. **The "we collect nothing" claim is slightly broader than it should be.**
   The site uses Cloudflare Pages, which means edge-layer access logs
   (request IP, user agent, timestamp) exist at the infrastructure provider
   even though Clawless itself operates no analytics. The current copy
   ("Nothing is recorded") reads as a stronger absolute than the
   infrastructure can support. This is the highest-priority fix before
   launch.

2. **Several US-specific disclosures expected by a B2C SaaS reader are
   absent**, even from a placeholder: a "do not sell or share" line for CCPA
   posture, a children's data line (COPPA, under-13), a security-incident
   contact path, and a clear "this site is operated from the United States"
   jurisdictional anchor. Most reputable reference docs (1Password, Linear,
   Notion) carry these even on stub pages.

3. **The Terms placeholder explicitly disclaims being an offer or
   contract**, which is good, but it omits a governing-law-and-venue
   placeholder, a no-warranty disclaimer for the **site itself** (separate
   from the future product license), and an external-links disclaimer.
   These are zero-cost additions that meaningfully reduce exposure.

No finding rises to "block deploy". Several rise to "fix before /download
flips live", which is the natural next polish window.

---

## Findings

### CRITICAL

#### C1 — Privacy claim is broader than the infrastructure supports

- **File:** `app/privacy/page.tsx`
- **Section:** First body paragraph (lines 40–47)
- **Current text (verbatim):**

  > This is the pre-launch website for Clawless Computer. It is an
  > informational site only. We do not collect anything from visitors here.
  > No analytics, no cookies, no tracking scripts, no email signups, no
  > logins. Visit, read, leave. Nothing is recorded.

- **Proposed text (verbatim replacement):**

  > This is the pre-launch website for Clawless Computer. It is an
  > informational site only. We operate no analytics, no cookies, no
  > tracking scripts, no email signup forms, and no user accounts on this
  > site. We do not associate visits with any identity, and we do not log
  > or analyze visitor traffic ourselves. The site is hosted on Cloudflare
  > Pages, which, like any web host, processes connection metadata such as
  > IP address, user agent, and request timestamp at the network edge for
  > delivery, security, and abuse prevention. We do not access, retain, or
  > analyze that data ourselves. Cloudflare's processing of that
  > infrastructure data is governed by Cloudflare's own privacy
  > documentation.

- **Justification:** "Nothing is recorded" is provably false because
  Cloudflare's edge produces request logs as a function of being a CDN. The
  zero-data founder rule is preserved (Clawless still collects nothing
  itself), but the statement is now accurate for a regulator or journalist
  reading it adversarially. This also closes the GDPR Art. 13 / Texas
  Data Privacy and Security Act "categories of data processed" gap by
  acknowledging the only category that actually exists.

#### C2 — No data-controller identification of the upstream processor

- **File:** `app/privacy/page.tsx`
- **Section:** Second body paragraph (lines 48–58)
- **Current text (verbatim):**

  > The site and the upcoming Clawless Computer product are operated by
  > RBJ Global LLC, a United States limited liability company registered
  > in the State of Texas, with its principal office at 5900 Balcones
  > Drive, STE 100, Austin, TX 78731, USA. Once the product launches, RBJ
  > Global LLC will be the data controller for any personal information
  > processed in connection with licensing, payments, or customer support.

- **Proposed text (verbatim replacement):**

  > The site and the upcoming Clawless Computer product are operated by
  > RBJ Global LLC, a United States limited liability company organized
  > in the State of Texas, with a principal office at 5900 Balcones
  > Drive, STE 100, Austin, TX 78731, USA. RBJ Global LLC is the
  > controller of any personal information collected in connection with
  > this site (today: none beyond infrastructure metadata held by our
  > host) and will be the controller of personal information processed
  > in connection with Clawless Computer licensing, payments, and customer
  > support once the product launches. At launch, our payment processor
  > (Lemon Squeezy, operated by Lemon Squeezy LLC) will act as a separate
  > controller for checkout-stage personal and payment information under
  > its own privacy policy.

- **Justification:** Establishes the controller relationship now (not just
  "once the product launches"), names Lemon Squeezy as the only future PII
  surface (matches the locked brand rule), and corrects "registered in" to
  "organized in" which is the standard US-LLC term of art. Replacing "its
  principal office" with "a principal office" is a soft hedge that preserves
  truth if the Dallas virtual office swap happens before this page is
  rewritten.

#### C3 — "April 2026" last-updated stamp is now stale

- **File:** `app/privacy/page.tsx` and `app/terms/page.tsx`
- **Section:** Header subtitle (line 29 on both files)
- **Current text (verbatim, both files):**

  > Last updated: April 2026

- **Proposed text (verbatim replacement, both files):**

  > Last updated: May 2026

- **Justification:** Today is 2026-05-02 and the most recent material edit
  to these pages was `416b57f` on 2026-05-02 (the LLC entity-of-record
  paragraph and address). A "Last updated" date that pre-dates the most
  recent material edit is the single most common audit finding on stub
  legal pages and erodes trust at zero benefit.

---

### HIGH

#### H1 — No CCPA "do not sell or share" disclosure, even as a stub

- **File:** `app/privacy/page.tsx`
- **Section:** New paragraph, recommended after the controller paragraph
- **Current text (verbatim):** N/A — no such paragraph currently exists.
- **Proposed text (verbatim, new paragraph to insert):**

  > We do not sell personal information, and we do not share personal
  > information for cross-context behavioral advertising, as those terms
  > are defined under the California Consumer Privacy Act. This statement
  > applies to the marketing site today and to the Clawless Computer
  > product at launch. California residents will have the right to know,
  > delete, correct, and limit the use of their personal information once
  > the product launches. The current site does not collect personal
  > information from visitors, so there is nothing to know, delete, or
  > correct here.

- **Justification:** Even pre-launch, having "we do not sell" on the
  privacy page is the table-stakes CCPA posture, free to make truthfully
  (because it's true), and reading-grade reputable B2C templates carry it.
  Absence reads worse than presence.

#### H2 — No COPPA / under-13 statement

- **File:** `app/privacy/page.tsx`
- **Section:** New paragraph, recommended near the bottom
- **Current text (verbatim):** N/A — no such paragraph currently exists.
- **Proposed text (verbatim, new paragraph to insert):**

  > Clawless Computer is intended for adult professional use. We do not
  > knowingly collect personal information from children under 13, and we
  > do not direct this site or the Clawless Computer product to children
  > under 13. If you believe a child under 13 has provided personal
  > information to us, contact info@rbjglobal.com and we will delete it.

- **Justification:** COPPA applicability is determined by audience, not
  by age-verification UI. Stating "intended for adult professional use" is
  a meaningful affirmative defense and is standard on every reference doc
  in the comparison set.

#### H3 — No security-incident contact path

- **File:** `app/privacy/page.tsx`
- **Section:** New paragraph, recommended near the contact line
- **Current text (verbatim):** N/A — no such paragraph currently exists.
- **Proposed text (verbatim, new paragraph to insert):**

  > For privacy questions, contact info@rbjglobal.com. For suspected
  > security vulnerabilities affecting this site or the Clawless Computer
  > product, contact security@clawless.ai. We aim to acknowledge security
  > reports within two business days.

- **Justification:** A single named security contact is the single
  cheapest disclosure to add and is uniformly present in reference B2C
  privacy pages. Note: implementing this requires the founder to actually
  set up the `security@clawless.ai` alias before this paragraph ships.
  If the alias cannot be set up before the next polish pass, fall back to
  using `info@rbjglobal.com` for both.

#### H4 — Terms page lacks any governing-law or venue placeholder

- **File:** `app/terms/page.tsx`
- **Section:** Second body paragraph (lines 47–58)
- **Current text (verbatim, relevant fragment):**

  > The full terms of service published with launch will name this entity
  > and specify governing law and dispute resolution.

- **Proposed text (verbatim replacement):**

  > The full terms of service published with launch will be governed by
  > the laws of the State of Texas, without regard to conflict-of-laws
  > principles, and will specify the dispute-resolution process
  > applicable to the Clawless Computer product. Until those terms are
  > published, no contract for the Clawless Computer product exists, and
  > use of this informational site is governed by these placeholder
  > terms.

- **Justification:** Naming the forward-looking governing law as Texas
  (Travis County is the natural venue for an Austin-registered LLC, but
  pin venue at launch, not now) lets the reader anchor jurisdiction
  immediately and matches the entity's actual home state. The
  "use of this site is governed by these placeholder terms" sentence
  closes a gap where the page disclaims being a contract for the
  **product** but leaves it ambiguous whether the **site itself** is
  governed by anything.

#### H5 — Terms page has no warranty disclaimer for the site itself

- **File:** `app/terms/page.tsx`
- **Section:** New paragraph, recommended before the "Full terms of service
  for the Clawless Computer product will be published..." closer
- **Current text (verbatim):** N/A — no such paragraph currently exists.
- **Proposed text (verbatim, new paragraph to insert):**

  > This site is provided on an as-is, as-available basis. RBJ Global LLC
  > makes no warranties, express or implied, about the accuracy,
  > completeness, or availability of the information on this site, and
  > disclaims all implied warranties to the maximum extent permitted by
  > applicable law. Forward-looking statements about Clawless Computer
  > (including features, pricing, naming, and release timing) reflect
  > current intent and may change before the first public release.

- **Justification:** The current page disclaims that the content is "an
  offer, warranty, or contract" but never disclaims warranties about the
  site as a service (uptime, accuracy, etc.). Reference set carries this
  universally. The forward-looking-statement sentence is the standard
  US-securities-flavored hedge that protects against "you said Q3 2026"
  arguments later.

---

### MEDIUM

#### M1 — Privacy page should explicitly anchor the operating jurisdiction

- **File:** `app/privacy/page.tsx`
- **Section:** New short paragraph, near the controller paragraph
- **Current text (verbatim):** N/A
- **Proposed text (verbatim, new paragraph to insert):**

  > This site is operated from the United States. If you access it from
  > outside the United States, your connection metadata (as described
  > above) is transmitted to and processed by infrastructure providers in
  > the United States. We do not target users in the European Economic
  > Area, the United Kingdom, or other regions where local data
  > protection law would impose additional obligations on a service of
  > this scope, but you are welcome to read this site from anywhere.

- **Justification:** Establishes a clear "we are a US service, not an
  EU-targeting service" record. This is meaningful under GDPR's
  targeting test (Recital 23). The site truly does not target the EEA, so
  the statement is honest and load-bearing.

#### M2 — Privacy page does not enumerate the future PII categories at all

- **File:** `app/privacy/page.tsx`
- **Section:** Third body paragraph (lines 59–65)
- **Current text (verbatim):**

  > When the Clawless Computer product launches, this page will be
  > replaced with a full privacy policy covering what the desktop
  > application stores locally, what (minimal) data the licensing system
  > tracks server-side, and how to exercise your data rights including
  > export and deletion.

- **Proposed text (verbatim replacement):**

  > When the Clawless Computer product launches, this page will be
  > replaced with a full privacy policy. That policy will describe (a)
  > what the desktop application stores locally on your device, (b) the
  > minimal license-validation data exchanged with our licensing server
  > (expected to include a license key and an opaque device identifier,
  > with no content of your work or prompts leaving your device by
  > default), (c) the personal and payment information our payment
  > processor (Lemon Squeezy) handles at checkout, (d) the support
  > information you choose to share with us at support@clawless.ai, and
  > (e) how to exercise rights of access, correction, deletion, export,
  > and complaint.

- **Justification:** Specificity is cheap and signals seriousness. The
  reader leaves with a concrete sense of the data perimeter before
  launch, which is itself a brand asset given the "zero data" hook.
  Naming Lemon Squeezy here also pre-validates the launch-day disclosure.

#### M3 — Terms placeholder makes a load-bearing claim about "OpenClaw" that may need framing

- **File:** `app/terms/page.tsx`
- **Section:** First body paragraph (lines 40–46)
- **Current text (verbatim):**

  > This site is the pre-launch presence for Clawless Computer, an
  > upcoming desktop product built on top of the open-source OpenClaw
  > engine. The site is provided for informational purposes only.

- **Proposed text (verbatim replacement):**

  > This site is the pre-launch presence for Clawless Computer, an
  > upcoming desktop product. The site is provided for informational
  > purposes only. Information about the open-source components used by
  > Clawless Computer, including any applicable open-source license
  > notices, will be published with the product release.

- **Justification:** Naming "OpenClaw" specifically on the Terms page
  creates a tiny but real obligation: if the engine is renamed,
  re-licensed, swapped, or if "OpenClaw" turns out to overlap a
  third-party trademark before launch, the Terms page becomes inaccurate
  and you have to redeploy to fix it. Pulling the engine name out of the
  legal page (it can stay on /features and /about) and substituting a
  forward-looking commitment to publish license notices at release is a
  zero-cost reduction in coupling. Founder may overrule on brand
  grounds; flagging as Medium not High on that basis.

#### M4 — Refund and acceptable-use bundling lacks a "see Terms at launch" hook

- **File:** `app/terms/page.tsx`
- **Section:** Last body paragraph (lines 65–71)
- **Current text (verbatim):**

  > Full terms of service for the Clawless Computer product will be
  > published with the launch and replace this placeholder. They will
  > cover license grant, acceptable use, payment terms, refund policy,
  > warranty disclaimers, and limitation of liability.

- **Proposed text (verbatim replacement):**

  > Full terms of service for the Clawless Computer product will be
  > published with the launch and will replace this placeholder. Those
  > terms will cover the license grant, acceptable use, payment terms,
  > refund policy, warranty disclaimers, indemnity, limitation of
  > liability, governing law, and dispute resolution. Until those terms
  > are published, no purchases are being processed through this site,
  > and no refund obligation can be created. After launch, the
  > then-current refund policy in the published Terms of Service will
  > apply to all purchases.

- **Justification:** Adds two missing standard clauses (indemnity,
  governing law) to the forward-looking list, and closes a real gap: the
  current bundled "refund policy will be published with launch" leaves
  open the question of what happens if anyone manages to pay before the
  full Terms publish. The new last sentence forecloses that ambiguity.

#### M5 — Cookie Policy: separate page is not needed; the Privacy page should explicitly absorb its job

- **File:** `app/privacy/page.tsx` (existing) — no separate file
- **Section:** Cookie disclosure should be made explicit, not implicit
- **Current text (verbatim):**

  > No analytics, no cookies, no tracking scripts, no email signups, no
  > logins.

- **Proposed text (verbatim replacement, integrated into C1's rewrite):**

  See C1. The C1 rewrite already covers cookies explicitly. The
  recommendation is **do not create** `app/cookies/page.tsx`. A separate
  Cookie Policy on a site that sets zero cookies is performative and
  invites a "but you said you have a cookie policy, where are the
  cookies?" inconsistency. Most reference templates reserve a separate
  Cookie Policy for sites that actually set cookies.

- **Justification:** Notion, Linear, and Anthropic all run a Cookie
  Policy because they set cookies. 1Password collapses the cookie
  disclosure into the privacy notice when minimal. Clawless's posture is
  "minimal" by founder rule, so collapse is appropriate. Document this
  explicitly so the next agent in this repo does not "fix the gap" by
  creating a redundant page.

#### M6 — Disclaimer page is not needed; the Terms page should absorb it explicitly

- **File:** `app/terms/page.tsx` (existing) — no separate file
- **Section:** N/A — covered by H5
- **Current text (verbatim):** N/A
- **Proposed text (verbatim):** Add the H5 paragraph to Terms; do not
  create `app/disclaimer/page.tsx`.
- **Justification:** A standalone Disclaimer page is a 2010-era pattern
  that reputable B2C SaaS companies (Linear, Anthropic, Stripe) have
  largely retired in favor of an integrated disclaimer in the Terms.
  H5's paragraph is the disclaimer.

#### M7 — Refund Policy and Acceptable Use as separate pages: not needed pre-launch, document the bundling

- **File:** `app/terms/page.tsx`
- **Section:** Bundling rationale (operational note, not user-facing)
- **Current text:** Bundled inside the Terms placeholder.
- **Proposed text:** No user-facing change for now. Operational note: the
  bundling is appropriate for the placeholder phase. The launch-day
  Terms rewrite should keep refund and acceptable-use **inside** Terms
  unless a specific business reason emerges for splitting. (Splitting is
  common when the refund policy needs to be linkable from the Lemon
  Squeezy storefront as a standalone URL. If LS requires this at
  checkout setup, create `app/refunds/page.tsx` at that time, not now.)
- **Justification:** Premature page splits create maintenance burden and
  cross-document inconsistency risk. Defer until a checkout-flow
  requirement actually appears.

---

### LOW

#### L1 — Drop the period-after-trailing-quote micro-inconsistency in privacy

- **File:** `app/privacy/page.tsx`
- **Section:** Final paragraph (lines 66–77)
- **Current text (verbatim):**

  > Until then: there is nothing to disclose, because there is nothing
  > being collected. If you have privacy questions in the meantime,
  > contact us at info@rbjglobal.com.

- **Proposed text (verbatim replacement):**

  > Until then there is nothing to disclose, because there is nothing
  > being collected. For privacy questions in the meantime, contact us at
  > info@rbjglobal.com.

- **Justification:** Drops one colon to read more like reading-page voice
  than slogan voice. Trivial; batch with the next polish pass.

#### L2 — "United States limited liability company" is verbose

- **File:** `app/privacy/page.tsx` and `app/terms/page.tsx`
- **Section:** Second body paragraph on each
- **Current text (verbatim, both):**

  > a United States limited liability company registered in the State of
  > Texas

- **Proposed text (verbatim replacement, both):**

  > a Texas limited liability company

- **Justification:** This is the standard US legal-document construction.
  "Texas limited liability company" already encodes "United States" and
  "registered in the State of Texas." Reference set uses the short form
  uniformly. Apply only after the C2 rewrite is adopted, and remember to
  cross-check both pages for consistency.

#### L3 — "5900 Balcones Drive, STE 100" address will change

- **File:** `app/privacy/page.tsx` and `app/terms/page.tsx`
- **Section:** Second body paragraph on each
- **Current text (verbatim):**

  > with its principal office at 5900 Balcones Drive, STE 100, Austin, TX
  > 78731, USA

- **Proposed text (verbatim replacement):** No textual change today.
  Operational note only: the founder is procuring a Dallas virtual
  office to replace the Austin registered-agent placeholder. When the
  Dallas address is live, update both files in a single commit and bump
  "Last updated" on both. Until then, the current Austin address is
  truthful (it is the registered-agent address) and acceptable.
- **Justification:** Tracking item, not a current defect.

#### L4 — `metadata.description` on /privacy says "RBJ Global LLC is the operator of this site and the upcoming desktop product"

- **File:** `app/privacy/page.tsx`
- **Section:** `metadata.description` (lines 7–11)
- **Current text (verbatim):**

  > Clawless Computer privacy notice. The site collects nothing. RBJ
  > Global LLC is the operator of this site and the upcoming desktop
  > product.

- **Proposed text (verbatim replacement):**

  > Clawless Computer privacy notice. This pre-launch site collects no
  > visitor data beyond standard host-level metadata. RBJ Global LLC
  > operates this site and the upcoming Clawless Computer desktop
  > product.

- **Justification:** Aligns the SEO description with the corrected C1
  language so a search-result snippet does not contradict the body of
  the page.

#### L5 — `metadata.title` is just "Privacy" / "Terms"

- **File:** `app/privacy/page.tsx`, `app/terms/page.tsx`
- **Section:** `metadata.title` (line 8)
- **Current text (verbatim):** `'Privacy'` / `'Terms'`
- **Proposed text (verbatim replacement):** `'Privacy Notice'` /
  `'Terms of Use'`
- **Justification:** "Privacy Notice" and "Terms of Use" are the standard
  page-title forms in the reference set; "Privacy" alone reads as a nav
  label and competes for SEO with thousands of unrelated results. Trivial,
  batchable.

#### L6 — Both pages omit a contradiction-precedence clause for the placeholder vs. final docs

- **File:** `app/terms/page.tsx`
- **Section:** Last body paragraph
- **Current text (verbatim):**

  > Full terms of service for the Clawless Computer product will be
  > published with the launch and replace this placeholder.

- **Proposed text (verbatim replacement):**

  > Full terms of service for the Clawless Computer product will be
  > published with the launch and will fully replace this placeholder.
  > In the event of any conflict between this placeholder and the
  > full terms published at launch, the full terms control from the
  > effective date stated in those terms.

- **Justification:** Standard precedence clause closes a "you said X in
  the placeholder, now you say Y in the launch terms" complaint. Low
  because the gap is unlikely to bite, but the clause is two sentences.

#### L7 — Founder name not present on either legal page

- **File:** `app/privacy/page.tsx`, `app/terms/page.tsx`
- **Section:** N/A
- **Current text (verbatim):** N/A
- **Proposed text:** No change recommended. Founder name does not belong
  on the legal docs themselves; the entity (RBJ Global LLC) is the
  contracting party. /about is the right surface for "Junaid (Jay)
  Siddiqi". Logging this finding only because the audit prompt named the
  founder convention; recommendation is to leave legal docs entity-only.
- **Justification:** Putting an individual's name on legal docs invites
  personal-liability arguments that the LLC structure is meant to defuse.

---

## Cross-cutting Notes

- **Em-dashes:** Both files comply with the no-em-dash rule. All proposed
  replacement text in this report also avoids em-dashes (verified by
  search before drafting).
- **Superlatives:** Neither file contains banned superlatives. The
  proposed replacements also avoid them.
- **Anti-positioning:** Neither file mentions or implies competitors.
  Compliant.
- **Two typefaces, accent-only links:** Out of scope for this audit
  (presentation, not policy text).
- **Lemon Squeezy mention:** Currently absent on both pages. C2 and M2
  introduce it in Privacy. Terms introduction of LS is appropriately
  deferred to launch (the placeholder explicitly disclaims being a
  product contract).
- **Sitemap priority 0.3:** Appropriate for placeholder posture. Bump to
  the standard 0.5 when the launch rewrites land.
- **External-submission hold (LLC name):** No proposed text in this
  report directs the founder to submit "RBJ Global LLC" to LS, Stripe,
  Apple, or banks. All recommendations are internal-site copy only,
  consistent with the current Texas-SOS-pending posture.

---

## Recommended Application Order (when the founder authorizes)

A natural minimum-disruption sequence for an internal polish pass:

1. C3 (date stamps) — 30 seconds, zero risk.
2. L4, L5, L1 (microcopy + SEO) — 5 minutes, zero risk.
3. C1, C2, M1 (privacy core rewrite) — the real lift; one commit.
4. H1, H2, H3 (privacy disclosures) — one follow-up commit; H3 gated on
   security@clawless.ai alias actually existing.
5. H4, H5, M3, M4, L6 (terms hardening) — one commit on the terms file.
6. L2 (entity short form) — last, after C2 lands, to avoid merge churn.

Items M5, M6, M7 are decisions to **not create** files; they are recorded
here so future agents do not "fix" the absence by creating redundant
pages. Item L3 is an event-driven update tied to the Dallas office swap.

---

*End of report.*
