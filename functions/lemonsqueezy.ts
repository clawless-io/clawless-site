/**
 * Lemon Squeezy webhook receiver (phase 1: logging stub).
 *
 * Verifies the HMAC-SHA256 signature Lemon Squeezy puts in the X-Signature
 * header, logs the event as structured JSON, and returns a response the LS
 * delivery pipeline won't retry (200 for actionable, 202 for unknown).
 *
 * Deployed to: https://hooks.clawless.ai/lemonsqueezy (Cloudflare Pages custom
 * domain) via the existing `clawless-site` Pages project. Logs appear in the
 * Cloudflare dashboard Logs tab and via `wrangler pages deployment tail`.
 *
 * No database writes in phase 1. The desktop app learns license state via its
 * own /validate heartbeat; we do not push from this endpoint. CRM/DB wiring
 * gets added here later when retention drips and churn analytics become real
 * needs (see memory/licensing-decisions.md).
 *
 * Security posture:
 * - Unsigned or wrong-signed requests -> 401. Constant-time verify via
 *   crypto.subtle.verify.
 * - If the signing secret env var is missing (account not yet set up), every
 *   request 503s. Safe no-op until the secret is configured in the Cloudflare
 *   Pages project.
 * - The function never 5xxs on a malformed body (400 instead) so LS does not
 *   retry malformed requests forever.
 */

interface Env {
  LEMONSQUEEZY_SIGNING_SECRET?: string;
}

type PagesFunctionContext = {
  request: Request;
  env: Env;
};

// Events we recognize as actionable today. Anything else still gets logged
// (with action: "skipped") but returns 202 so LS will not retry.
// Keeping this liberal so we learn what LS actually sends in test mode.
const ACTIONABLE_EVENTS = new Set<string>([
  'order_created',
  'order_refunded',
  'subscription_created',
  'subscription_updated',
  'subscription_cancelled',
  'subscription_resumed',
  'subscription_expired',
  'subscription_paused',
  'subscription_unpaused',
  'subscription_payment_success',
  'subscription_payment_failed',
  'subscription_payment_recovered',
  'subscription_payment_refunded',
  'license_key_created',
  'license_key_updated',
]);

interface LsWebhookPayload {
  meta?: {
    event_name?: string;
    event_id?: string;
    store_id?: number;
    test_mode?: boolean;
    custom_data?: Record<string, unknown>;
  };
  data?: {
    id?: string | number;
    type?: string;
  };
}

export async function handle(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'method not allowed' }, 405, { Allow: 'POST' });
  }

  const secret = env.LEMONSQUEEZY_SIGNING_SECRET;
  if (!secret) {
    return json({ error: 'webhook receiver not configured' }, 503);
  }

  const signatureHeader = request.headers.get('x-signature');
  if (!signatureHeader) {
    return json({ error: 'missing signature' }, 401);
  }

  const rawBody = await request.text();

  const signatureValid = await verifySignature(signatureHeader, rawBody, secret);
  if (!signatureValid) {
    return json({ error: 'invalid signature' }, 401);
  }

  let payload: LsWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as LsWebhookPayload;
  } catch {
    return json({ error: 'malformed json' }, 400);
  }

  const eventName = payload?.meta?.event_name;
  if (!eventName || typeof eventName !== 'string') {
    return json({ error: 'missing event_name' }, 400);
  }

  const logBase = {
    type: 'lemonsqueezy_webhook',
    event: eventName,
    event_id: payload?.meta?.event_id ?? null,
    data_id: payload?.data?.id ?? null,
    data_type: payload?.data?.type ?? null,
    store_id: payload?.meta?.store_id ?? null,
    test_mode: payload?.meta?.test_mode ?? null,
    ts: new Date().toISOString(),
  };

  if (!ACTIONABLE_EVENTS.has(eventName)) {
    console.log(JSON.stringify({ ...logBase, action: 'skipped' }));
    return json({ ok: true, skipped: eventName }, 202);
  }

  console.log(JSON.stringify({ ...logBase, action: 'received' }));
  return json({ ok: true }, 200);
}

/**
 * Lemon Squeezy signs the raw request body with HMAC-SHA256 using the webhook
 * signing secret, hex-encoded in the X-Signature header.
 * Docs: https://docs.lemonsqueezy.com/help/webhooks#signing-requests
 */
async function verifySignature(
  signatureHex: string,
  body: string,
  secret: string
): Promise<boolean> {
  if (!/^[0-9a-f]+$/i.test(signatureHex) || signatureHex.length % 2 !== 0) {
    return false;
  }
  const signatureBytes = hexToBytes(signatureHex);
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  // crypto.subtle.verify is spec-mandated constant-time with respect to the
  // signature bytes. Do NOT replace with a manual === compare if someone is
  // "optimizing" this later: that would introduce a timing oracle.
  return crypto.subtle.verify('HMAC', key, signatureBytes, encoder.encode(body));
}

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  // Explicit ArrayBuffer (not ArrayBufferLike) so crypto.subtle.verify accepts
  // the result as a BufferSource under TypeScript 5.7+ strict typing.
  const bytes = new Uint8Array(new ArrayBuffer(hex.length / 2));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function json(body: unknown, status: number, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  });
}

export const onRequest = async (ctx: PagesFunctionContext): Promise<Response> => {
  return handle(ctx.request, ctx.env);
};
