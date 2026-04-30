'use client';

import ScrollReveal from '@/components/effects/ScrollReveal';
import type { ZeroDataContent } from '@/lib/cms-types';

interface Props {
  content?: ZeroDataContent;
}

const FALLBACK: ZeroDataContent = {
  eyebrow: 'Privacy is the product',
  headline: 'We do not ask for anything.',
  lead: 'Most AI apps want at least your email before you can try them. Clawless does not.',
  chips: ['No credit card', 'No email', 'No account', 'No telemetry'],
  paragraphs: [
    'Download, install, start a 7-day trial in the app. No signup, no login, no profile. We do not know who you are, by design.',
    'If we are not collecting anything, there is nothing to leak. No customer database to breach. No mailing list to harvest. No cookies, no analytics, no identifiers. The marketing site is a brochure with a download button.',
    'When you pay, Lemon Squeezy handles checkout on their domain as the merchant of record. They take your card. We never see it.',
  ],
};

export default function ZeroData({ content }: Props) {
  const c = content ?? FALLBACK;

  return (
    <section
      id="privacy"
      className="relative overflow-hidden border-b border-border-default px-8 py-24"
    >
      {/* Soft accent glow to make this section read as a deliberate beat. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] rounded-full"
        style={{
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(ellipse, rgba(34,255,170,0.10) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[860px] text-center">
        <ScrollReveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {c.eyebrow}
          </p>
          <h2 className="mb-6 text-[32px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[44px]">
            {c.headline}
          </h2>
          <p className="mx-auto mb-10 max-w-[640px] text-[18px] leading-[1.55] text-text-secondary sm:text-[20px]">
            {c.lead}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ul className="mx-auto mb-12 flex max-w-[720px] flex-wrap items-center justify-center gap-3">
            {c.chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-border-light bg-bg-surface px-4 py-2 text-sm font-medium text-text-primary"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: '#22FFAA' }}
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {chip}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <div className="mx-auto max-w-[680px] space-y-5 text-left">
          {c.paragraphs.map((p, i) => (
            <ScrollReveal key={i} delay={0.15 + i * 0.05}>
              <p className="text-base leading-[1.8] text-text-secondary sm:text-lg">
                {p}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
