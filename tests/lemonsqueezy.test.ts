import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handle } from '../functions/lemonsqueezy';

const SECRET = 'test-signing-secret';

async function hmacHex(body: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(body));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function makeRequest(opts: { body?: string; signature?: string; method?: string }): Request {
  const { body = '', signature, method = 'POST' } = opts;
  const headers = new Headers({ 'content-type': 'application/json' });
  if (signature !== undefined) headers.set('x-signature', signature);
  return new Request('https://hooks.clawless.ai/lemonsqueezy', {
    method,
    headers,
    body: method === 'POST' || method === 'PUT' ? body : undefined,
  });
}

describe('lemonsqueezy webhook handler', () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('rejects non-POST with 405', async () => {
    const r = await handle(makeRequest({ method: 'GET' }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(405);
    expect(r.headers.get('Allow')).toBe('POST');
    expect(await r.json()).toEqual({ error: 'method not allowed' });
  });

  it('returns 503 with Retry-After when the signing secret is not configured', async () => {
    const r = await handle(makeRequest({ body: '{}' }), {});
    expect(r.status).toBe(503);
    expect(r.headers.get('Retry-After')).toBe('86400');
  });

  it('rejects requests with no signature header (401) and does not leak why', async () => {
    const r = await handle(makeRequest({ body: '{}' }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(401);
    expect(await r.json()).toEqual({ error: 'missing signature' });
  });

  it('rejects an empty x-signature header with 401', async () => {
    const r = await handle(makeRequest({ body: '{}', signature: '' }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(401);
  });

  it('rejects requests with an invalid signature (401) and does not leak why', async () => {
    const body = JSON.stringify({ meta: { event_name: 'license_key_created' } });
    const r = await handle(makeRequest({ body, signature: 'deadbeef' }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(401);
    expect(await r.json()).toEqual({ error: 'invalid signature' });
  });

  it('rejects non-hex signatures without crashing (401)', async () => {
    const body = JSON.stringify({ meta: { event_name: 'license_key_created' } });
    const r = await handle(makeRequest({ body, signature: 'not-hex-at-all!' }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(401);
  });

  it('returns 400 on malformed JSON with a valid signature', async () => {
    const body = 'not-actually-json';
    const sig = await hmacHex(body, SECRET);
    const r = await handle(makeRequest({ body, signature: sig }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(400);
    expect(await r.json()).toEqual({ error: 'malformed json' });
  });

  it('returns 400 when event_name is missing', async () => {
    const body = JSON.stringify({ meta: {}, data: { id: '1' } });
    const sig = await hmacHex(body, SECRET);
    const r = await handle(makeRequest({ body, signature: sig }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(400);
  });

  it('accepts a known event with a valid signature (200) and logs custom_data', async () => {
    const body = JSON.stringify({
      meta: {
        event_name: 'license_key_created',
        event_id: 'evt-abc',
        store_id: 12345,
        test_mode: true,
        custom_data: { utm_source: 'youtuber-x', affiliate: 'aff-42' },
      },
      data: { id: '999', type: 'license-keys' },
    });
    const sig = await hmacHex(body, SECRET);
    const r = await handle(makeRequest({ body, signature: sig }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(200);
    const payload = await r.json();
    expect(payload).toEqual({ ok: true });
    expect(logSpy).toHaveBeenCalledOnce();
    const logCall = logSpy.mock.calls[0][0] as string;
    const logged = JSON.parse(logCall);
    expect(logged).toMatchObject({
      type: 'lemonsqueezy_webhook',
      event: 'license_key_created',
      event_id: 'evt-abc',
      action: 'received',
      store_id: 12345,
      test_mode: true,
      custom_data: { utm_source: 'youtuber-x', affiliate: 'aff-42' },
    });
  });

  it('returns 202 with skipped for unknown events', async () => {
    const body = JSON.stringify({
      meta: { event_name: 'something_new_we_dont_handle', store_id: 12345 },
      data: { id: '1', type: 'other' },
    });
    const sig = await hmacHex(body, SECRET);
    const r = await handle(makeRequest({ body, signature: sig }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(202);
    const payload = await r.json();
    expect(payload).toEqual({ ok: true, skipped: 'something_new_we_dont_handle' });
    const logCall = logSpy.mock.calls[0][0] as string;
    const logged = JSON.parse(logCall);
    expect(logged.action).toBe('skipped');
  });

  it('handles subscription_expired as actionable', async () => {
    const body = JSON.stringify({
      meta: { event_name: 'subscription_expired', store_id: 12345, test_mode: false },
      data: { id: '555', type: 'subscriptions' },
    });
    const sig = await hmacHex(body, SECRET);
    const r = await handle(makeRequest({ body, signature: sig }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(200);
  });

  it('rejects a signature computed with a different secret', async () => {
    const body = JSON.stringify({ meta: { event_name: 'license_key_created' } });
    const wrongSig = await hmacHex(body, 'a-different-secret');
    const r = await handle(makeRequest({ body, signature: wrongSig }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(401);
  });

  it('rejects signatures that are not exactly 64 hex chars (length guard)', async () => {
    const body = JSON.stringify({ meta: { event_name: 'license_key_created' } });
    // 62 hex chars (valid charset, wrong length) — would have passed the old
    // regex + even-length guard, must be rejected by the new length guard.
    const shortSig = 'a'.repeat(62);
    const r = await handle(makeRequest({ body, signature: shortSig }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(401);
  });

  it('accepts X-Signature with the exact casing Lemon Squeezy sends', async () => {
    // LS sends the header as `X-Signature` (capitalized). Headers API is
    // case-insensitive per spec, so the handler's `.get('x-signature')` must
    // find it. This test asserts the spec behavior holds in our runtime.
    const body = JSON.stringify({
      meta: { event_name: 'license_key_created', event_id: 'evt-casing', store_id: 1 },
      data: { id: '1', type: 'license-keys' },
    });
    const sig = await hmacHex(body, SECRET);
    const headers = new Headers({ 'content-type': 'application/json' });
    headers.set('X-Signature', sig);
    const req = new Request('https://hooks.clawless.ai/lemonsqueezy', {
      method: 'POST',
      headers,
      body,
    });
    const r = await handle(req, { LEMONSQUEEZY_SIGNING_SECRET: SECRET });
    expect(r.status).toBe(200);
  });

  it('returns 400 when meta is explicitly null (not just missing)', async () => {
    const body = JSON.stringify({ meta: null, data: { id: '1' } });
    const sig = await hmacHex(body, SECRET);
    const r = await handle(makeRequest({ body, signature: sig }), {
      LEMONSQUEEZY_SIGNING_SECRET: SECRET,
    });
    expect(r.status).toBe(400);
    expect(await r.json()).toEqual({ error: 'missing event_name' });
  });

  it('returns 413 when Content-Length exceeds the body size cap', async () => {
    const body = JSON.stringify({ meta: { event_name: 'license_key_created' } });
    const sig = await hmacHex(body, SECRET);
    const headers = new Headers({
      'content-type': 'application/json',
      'x-signature': sig,
      'content-length': String(300 * 1024), // 300 KB, above our 256 KB cap
    });
    const req = new Request('https://hooks.clawless.ai/lemonsqueezy', {
      method: 'POST',
      headers,
      body,
    });
    const r = await handle(req, { LEMONSQUEEZY_SIGNING_SECRET: SECRET });
    expect(r.status).toBe(413);
  });
});
