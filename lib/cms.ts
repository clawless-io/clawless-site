/**
 * Content layer — phase 1 inlined.
 * No external CMS, no API fetch, no ISR. Everything below is hardcoded
 * from constants.ts. Edit constants.ts (or this file) to update the site,
 * push to GitHub, Cloudflare Pages rebuilds and redeploys automatically.
 */

import { NAV_LINKS, FEATURES, FEATURE_GROUPS } from './constants';
import type { CmsData } from './cms-types';

export function getContent(): CmsData {
  return {
    content: {
      hero: {
        badgeText: 'Coming Q3 2026',
        headline: ['An operating system', 'for AI.'],
        tagline:
          'Run AI agents, models, and tools on any computer you own. Your desktop, a spare laptop, a home server, a VPS. Whatever you point it at becomes your Clawless Computer.',
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
      featuresPage: {
        pageTitle: 'Everything Clawless does.',
        pageLead:
          'The full feature surface, pulled straight from what ships in the desktop app. Every group below maps to a panel you can open inside Clawless on day one.',
        privacyHook:
          'Download. No credit card. No email. No account. 7-day trial.',
        groups: FEATURE_GROUPS.map((g) => ({
          eyebrow: g.eyebrow,
          title: g.title,
          lead: g.lead,
          bullets: [...g.bullets],
        })),
        closingHeadline: 'Try Clawless free for 7 days.',
        closingDescription:
          'No credit card. No email. No account. Download, install, paste a provider API key, start chatting. When the trial ends, pick a plan from the in-app upgrade button or keep the app in read-only mode.',
        closingButtonLabel: 'Get Clawless',
        closingButtonHref: '/download',
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
