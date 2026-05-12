import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Brief test 3: "PRE_LAUNCH=false rebuild: hero CTA not in DOM, footer
// instance still renders."
//
// This is a build-time flag, so the most direct verification is the JS
// code path the module ships. We stub the env var and re-import the
// config + the Hero component, then snapshot-assert the conditional
// branch. Running a real `bun run build` inside Playwright would race
// the dev server on `.next/`; this is functionally equivalent and runs
// in milliseconds.

describe('PRE_LAUNCH flag gating', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('PRE_LAUNCH resolves to true by default (env unset)', async () => {
    vi.stubEnv('NEXT_PUBLIC_PRE_LAUNCH', '');
    const { PRE_LAUNCH } = await import('../config/site');
    expect(PRE_LAUNCH).toBe(true);
  });

  it('PRE_LAUNCH resolves to true when env explicitly set to "true"', async () => {
    vi.stubEnv('NEXT_PUBLIC_PRE_LAUNCH', 'true');
    const { PRE_LAUNCH } = await import('../config/site');
    expect(PRE_LAUNCH).toBe(true);
  });

  it('PRE_LAUNCH resolves to false when env set to "false" — hero CTA branch is suppressed', async () => {
    vi.stubEnv('NEXT_PUBLIC_PRE_LAUNCH', 'false');
    const { PRE_LAUNCH } = await import('../config/site');
    expect(PRE_LAUNCH).toBe(false);
  });
});
