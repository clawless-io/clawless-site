/**
 * Content layer, phase 1 inlined.
 * No external CMS, no API fetch, no ISR. Everything below is hardcoded
 * from constants.ts. Edit constants.ts (or this file) to update the site,
 * push to GitHub, Cloudflare Pages rebuilds and redeploys automatically.
 */

import { NAV_LINKS, FEATURES, FEATURE_GROUPS, WHO_ITS_FOR } from './constants';
import type { CmsData } from './cms-types';

export function getContent(): CmsData {
  return {
    content: {
      hero: {
        badgeText: 'Coming Q3 2026',
        headline: ['An operating system', 'for AI.'],
        valueProps:
          'Download. No credit card. No email. No account. 7-day trial.',
        tagline:
          'A polished desktop home for OpenClaw, the open-source AI engine, built so everyday users can run agents, models, and tools without a terminal.',
        primaryCta: { label: 'Get Clawless', href: '/download' },
        secondaryCta: { label: 'See how it works', href: '#demo' },
      },
      zeroData: {
        eyebrow: 'Privacy is the product',
        headline: 'We do not ask for anything.',
        lead: 'Most AI apps want at least your email before you can try them. Clawless does not.',
        chips: ['No credit card', 'No email', 'No account', 'No telemetry'],
        paragraphs: [
          'Download, install, start a 7-day trial in the app. No signup, no login, no profile. We do not know who you are, by design.',
          'If we are not collecting anything, there is nothing to leak. No customer database to breach. No mailing list to harvest. No cookies, no analytics, no identifiers. The marketing site is a brochure with a download button.',
          'When you pay, Lemon Squeezy handles checkout on their domain as the merchant of record. They take your card. We never see it.',
        ],
      },
      features: {
        sectionLabel: 'What Clawless Computer is',
        sectionTitle: 'What Clawless does for you.',
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
      whoItsFor: {
        sectionLabel: 'Who it is for',
        sectionTitle: 'Built for the people OpenClaw cannot reach yet.',
        columns: WHO_ITS_FOR.map((c) => ({
          title: c.title,
          description: c.description,
        })),
      },
      demoVideo: {
        caption: 'A walkthrough video lands here before launch.',
      },
      companion: {
        headline: 'A companion to OpenClaw, not a competitor.',
        paragraphs: [
          'OpenClaw is one of the most impressive open-source AI projects in the world, a community big enough to ship new releases almost every week. Clawless Computer is built on top of it, 100% compatible, and exists to bring OpenClaw to people who cannot live in a terminal all day.',
          "We do not fork OpenClaw. We do not compete with it. We track every release, test it, and ship the upgrades so you do not have to. Our success is OpenClaw's success.",
        ],
      },
      cta: {
        headline: 'Try Clawless free for 7 days.',
        description:
          'No credit card. No email. No signup. Download, install, paste a provider API key, start chatting. When the trial ends, pick a plan from the in-app upgrade button or keep the app in read-only mode.',
        buttonLabel: 'Get Clawless',
        buttonHref: '/download',
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
