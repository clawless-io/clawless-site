'use client';

import ScrollReveal from '@/components/effects/ScrollReveal';
import type { HeroContent } from '@/lib/cms-types';

interface Props {
  content?: HeroContent;
}

export default function Hero({ content }: Props) {
  const badgeText = content?.badgeText ?? 'Coming Q3 2026';
  const headline = content?.headline ?? ['An operating system', 'for AI.'];
  const tagline =
    content?.tagline ??
    'Run AI agents, models, and tools on any computer you own. Your desktop, a spare laptop, a home server, a VPS. Whatever you point it at becomes your Clawless Computer.';
  const valueProps =
    content?.valueProps ?? 'Download. No credit card. No email. 7-day trial.';
  const primaryCta = content?.primaryCta;
  const secondaryCta = content?.secondaryCta;
  const showPrimary = !!primaryCta?.label && !!primaryCta?.href;
  const showSecondary = !!secondaryCta?.label && !!secondaryCta?.href;

  return (
    <section className="relative overflow-hidden px-8 pb-[100px] pt-[120px] text-center">
      {/* Glow orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[700px] w-[700px] rounded-full"
        style={{
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(0,212,255,0.14) 0%, rgba(0,212,255,0.06) 35%, rgba(34,255,170,0.04) 55%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'orbBreathe 8s ease-in-out infinite',
        }}
      />

      <ScrollReveal>
        {/* Wordmark — first impression of the full brand name */}
        <div className="relative mb-6 text-[15px] font-semibold uppercase tracking-[0.18em] text-text-secondary sm:text-base">
          <span className="text-text-primary">Clawless</span>{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #00D4FF 0%, #22FFAA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Computer
          </span>
        </div>

        {/* Status pill */}
        <div className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-border-light bg-bg-surface px-4 py-1.5 text-[13px] font-medium text-text-secondary">
          <span
            className="h-1.5 w-1.5 rounded-full bg-success"
            style={{ animation: 'pulse 2s infinite' }}
          />
          {badgeText}
        </div>

        {/* Headline */}
        <h1
          className="relative mb-7 text-[42px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[58px] md:text-[64px] lg:text-[72px]"
          style={{
            background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {headline.slice(0, -1).map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
          <span
            style={{
              background: 'linear-gradient(135deg, #00D4FF 0%, #22FFAA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {headline[headline.length - 1]}
          </span>
        </h1>

        {/* Value props, the four-no positioning hook. Locked phrase. */}
        {valueProps && (
          <p className="relative mx-auto mb-5 max-w-[720px] text-[20px] font-semibold leading-[1.4] tracking-[-0.01em] text-text-primary sm:text-[26px]">
            {valueProps}
          </p>
        )}

        {/* Tagline */}
        <p className="mx-auto mb-10 max-w-[680px] text-base leading-[1.7] tracking-[0.01em] text-text-secondary sm:text-lg">
          {tagline}
        </p>

        {/* CTAs */}
        {(showPrimary || showSecondary) && (
          <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {showPrimary && primaryCta && (
              <a
                href={primaryCta.href}
                className="inline-flex min-h-[56px] items-center justify-center rounded-[14px] px-11 py-[18px] text-[17px] font-semibold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #00D4FF, #22FFAA)',
                  color: '#05070F',
                  boxShadow: '0 0 24px rgba(0, 212, 255, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 48px rgba(0, 212, 255, 0.45)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(0, 212, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {primaryCta.label}
              </a>
            )}
            {showSecondary && secondaryCta && (
              <a
                href={secondaryCta.href}
                className="inline-flex min-h-[56px] items-center justify-center rounded-[14px] border border-border-light bg-bg-surface px-11 py-[18px] text-[17px] font-semibold text-text-primary transition-all duration-300 hover:border-text-muted hover:bg-bg-surface-hover"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        )}
      </ScrollReveal>
    </section>
  );
}
