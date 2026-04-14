/**
 * Content layer — phase 1 inlined.
 * No external CMS, no API fetch, no ISR. Everything below is hardcoded
 * from constants.ts. Edit constants.ts (or this file) to update the site,
 * push to GitHub, Cloudflare Pages rebuilds and redeploys automatically.
 */

import { NAV_LINKS, FEATURES } from './constants';
import type { CmsData } from './cms-types';

export function getContent(): CmsData {
  return {
    content: {
      hero: {
        badgeText: 'Coming Q3 2026',
        headline: ['An operating system', 'for AI.'],
        tagline:
          'Run AI agents, models, and tools on any computer you own — your desktop, a spare laptop, a home server, a VPS. Whatever you point it at becomes your Clawless Computer.',
        primaryCta: { label: '', href: '' },
        secondaryCta: { label: '', href: '' },
      },
      features: {
        sectionLabel: 'What Clawless Computer is',
        sectionTitle: 'Built on OpenClaw. Polished for humans.',
        items: FEATURES.map((f) => ({
          title: f.title,
          description: f.description,
          icon: f.icon,
          color: f.color,
        })),
      },
      cta: {
        headline: 'Coming Q3 2026.',
        description:
          'Currently in active development. The first public release is targeted for Q3 2026.',
        buttonLabel: '',
        buttonHref: '',
      },
      nav: {
        links: NAV_LINKS.map((l) => ({ label: l.label, href: l.href })),
        ctaLabel: '',
      },
      footer: {
        tagline: 'An operating system for AI, on any computer you own.',
        madeWith: 'Built on top of OpenClaw',
      },
    },
  };
}

/** Backwards-compat alias for any caller that still uses the async name. */
export async function fetchAllContent(): Promise<CmsData> {
  return getContent();
}
