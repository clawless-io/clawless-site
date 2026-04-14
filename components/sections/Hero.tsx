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

        {/* Tagline */}
        <p className="mx-auto mb-2 max-w-[680px] text-base leading-[1.7] tracking-[0.01em] text-text-secondary sm:text-xl">
          {tagline}
        </p>
      </ScrollReveal>
    </section>
  );
}
