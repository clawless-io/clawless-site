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
        primaryCta: { label: 'Get Clawless', href: '/download', comingSoon: true },
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
      pricingPage: {
        pageTitle: 'Pricing',
        pageSubhead:
          'One plan. Pay monthly, yearly, or once for life. Same features at every price.',
        privacyHook:
          'No card to start the trial. No email signup. No account.',
        preLaunchBanner:
          'Pricing locked. Available for purchase when Clawless launches in Q3 2026.',
        tiers: [
          {
            name: 'Monthly',
            priceLabel: '$4.95',
            priceNote: 'per month',
            cta: { label: 'Available Q3 2026', href: '#', comingSoon: true },
          },
          {
            name: 'Yearly',
            priceLabel: '$50',
            priceNote: 'per year, about 16% less than monthly',
            cta: { label: 'Available Q3 2026', href: '#', comingSoon: true },
          },
          {
            name: 'Lifetime',
            priceLabel: '$199',
            priceNote:
              'Founding-member price for the first 3 months from public launch. $299 after.',
            badge: 'Founding member',
            highlighted: true,
            cta: { label: 'Available Q3 2026', href: '#', comingSoon: true },
          },
        ],
        includesHeadline: 'Every plan includes',
        includes: [
          'Every Clawless feature, present and future',
          '7-day free trial. No card, no email, no account.',
          'All major AI providers: Claude, GPT, Gemini, Groq, plus 800+ models through OpenRouter',
          'Bring your own provider keys. You pay AI providers directly at their rates.',
          'Local-first storage. No telemetry, no analytics, no cookies.',
          'Cancel anytime through the Lemon Squeezy customer portal.',
        ],
        comparison: {
          headline: 'How the price compares',
          rows: [
            {
              product: 'Clawless',
              details: '$4.95 per month. BYOK. No account.',
            },
            {
              product: 'Cursor',
              details: '$20 per month. Account required. AI usage included.',
            },
            {
              product: 'Claude Pro',
              details: '$20 per month. Account required. AI usage included.',
            },
          ],
        },
        faq: [
          {
            question: 'How does the 7-day trial work?',
            answer:
              'Download Clawless, install it, and the trial starts inside the app. No card, no email, no account on this site. When the trial ends, the in-app upgrade button opens the Lemon Squeezy customer portal in your browser. Decide then.',
          },
          {
            question: 'How do I cancel?',
            answer:
              'Cancellation is handled through the Lemon Squeezy customer portal. From the desktop app, click Manage Subscription in Settings. Or visit clawless.ai/portal and sign in with the email tied to your purchase. No account creation, magic-link only.',
          },
          {
            question: 'Why one plan instead of tiered pricing?',
            answer:
              'Every Clawless feature ships to every customer. There is no Pro tier, no Enterprise upsell, no usage cap. The only choice is whether you pay monthly, yearly, or once for life.',
          },
          {
            question: 'What does BYOK mean?',
            answer:
              'Bring your own keys. You sign up directly with the AI providers you want to use (Claude, GPT, Gemini, etc.) and pay them at their rates. Clawless never marks up provider tokens because Clawless never sees them. Your keys live on your computer.',
          },
        ],
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
        closingButton: { label: 'Get Clawless', href: '/download', comingSoon: true },
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
        button: { label: 'Get Clawless', href: '/download', comingSoon: true },
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
