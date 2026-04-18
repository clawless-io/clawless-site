# Webhook Receivers

This repo hosts Cloudflare Pages Functions that receive webhooks from external
services. Functions live in `functions/` at the project root and are picked up
automatically by `wrangler pages deploy` during the GitHub Actions workflow.

## Lemon Squeezy

File: `functions/lemonsqueezy.ts`
URL (after DNS + custom domain setup): `https://hooks.clawless.ai/lemonsqueezy`

Phase 1 is a logging stub. It verifies the HMAC signature, logs structured
JSON to Cloudflare's logs, and returns 200 or 202. No database is involved.

### One-time setup

1. **Cloudflare custom domain (`hooks.clawless.ai`)**
   - Cloudflare dashboard > Pages > `clawless-site` > Custom domains > Set up a custom domain
   - Add `hooks.clawless.ai`
   - Cloudflare auto-creates the DNS CNAME on the parent zone. No manual DNS edit needed when the zone is already on Cloudflare.

2. **Signing secret env var**
   - Pages > `clawless-site` > Settings > Environment variables
   - Add `LEMONSQUEEZY_SIGNING_SECRET` for **Production only** (NOT Preview)
   - Value = the webhook signing secret from Lemon Squeezy dashboard > Settings > Webhooks
   - Until this secret is set, the endpoint returns `503` to every request (safe no-op while the LS account is pending bank verification).

   **Why Production only, not Preview:** Until we have a separate LS test store pointed at a separate preview URL (see backlog B36 — dev/staging/prod git flow), sharing the signing secret with Preview deployments means a branch push could accept real live-mode webhooks and double-process them. When B36 lands, Preview will have its own test-mode LS webhook + its own secret.

3. **Point Lemon Squeezy at the endpoint**
   - LS dashboard > Settings > Webhooks > Add endpoint
   - URL: `https://hooks.clawless.ai/lemonsqueezy`
   - Select all events you care about (at minimum: `license_key_created`, `subscription_created`, `subscription_updated`, `subscription_cancelled`, `subscription_expired`, `subscription_payment_success`, `subscription_payment_failed`, `subscription_payment_recovered`)
   - Copy the signing secret into the Cloudflare env var from step 2

### Local testing

Unit tests run under Vitest:

```bash
bun run test           # one-shot
bun run test:watch     # watch mode
```

The tests do not hit the network; they construct `Request` objects, compute
valid HMAC signatures with the Web Crypto API, and call the handler directly.

### Watching logs in production

```bash
# Tail the production Pages deployment (requires wrangler auth)
npx wrangler pages deployment tail --project-name=clawless-site
```

Filter for webhook entries by `type:"lemonsqueezy_webhook"` in Cloudflare
Logs dashboard.

### What the handler does NOT do (phase 1)

- No database writes. We intentionally rely on Lemon Squeezy as the source of truth; the desktop app learns license state via its own `/validate` heartbeat, not via push from this endpoint.
- No outbound calls (Slack, email, etc.). Logging only.
- No replay protection beyond signature verification. LS deduplicates its own retries.

We add DB / CRM wiring here when retention drips or churn analytics become
real needs. Until then, the Lemon Squeezy dashboard is the CRM.
