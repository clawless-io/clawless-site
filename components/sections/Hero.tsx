import ScrollReveal from '@/components/effects/ScrollReveal';
import CtaButton from '@/components/ui/CtaButton';
import type { HeroContent } from '@/lib/cms-types';

interface Props {
  content: HeroContent;
}

export default function Hero({ content }: Props) {
  const {
    badgeText,
    eyebrow,
    headline,
    valueProps,
    tagline,
    primaryCta,
    secondaryCta,
  } = content;
  const showPrimary = !!primaryCta.label && !!primaryCta.href;
  const showSecondary = !!secondaryCta.label && !!secondaryCta.href;
  const showBadge = !!badgeText;
  const showValueProps = !!valueProps;

  return (
    <section className="relative overflow-hidden px-8 pb-[80px] pt-[120px] text-center">
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
        {/* Wordmark, first impression of the full brand name */}
        <div className="relative mb-6 text-[15px] font-semibold uppercase tracking-[0.18em] text-text-secondary sm:text-base">
          <span className="text-text-primary">Clawless</span>
          <span
            className="ml-2"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-success) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Computer
          </span>
        </div>

        {/* Status pill, optional. Empty badgeText disables. */}
        {showBadge && (
          <div className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-border-light bg-bg-surface px-4 py-1.5 text-[13px] font-medium text-text-secondary">
            <span
              className="h-1.5 w-1.5 rounded-full bg-success"
              style={{ animation: 'pulse 2s infinite' }}
            />
            {badgeText}
          </div>
        )}

        {/* Eyebrow kicker, the high-level conceptual line above the
            concrete headline. */}
        {eyebrow && (
          <p className="relative mb-4 text-[15px] font-medium tracking-[0.01em] text-text-secondary sm:text-base">
            {eyebrow}
          </p>
        )}

        {/* Headline */}
        <h1
          className="relative mb-7 text-[42px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[58px] md:text-[64px] lg:text-[72px]"
          style={{
            background: 'linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {headline.length > 1 &&
            headline.slice(0, -1).map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-success) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {headline[headline.length - 1] ?? ''}
          </span>
        </h1>

        {/* Value props, optional. Empty string disables (default after the
            2026-05-26 redesign). */}
        {showValueProps && (
          <p className="relative mx-auto mb-5 max-w-[720px] text-[20px] font-semibold leading-[1.4] tracking-[-0.01em] text-text-primary sm:text-[26px]">
            {valueProps}
          </p>
        )}

        {/* Tagline, the single elevator sentence. Sets up the screenshot
            block beneath this section. */}
        <p className="mx-auto mb-10 max-w-[760px] text-base leading-[1.7] tracking-[0.01em] text-text-secondary sm:text-lg">
          {tagline}
        </p>

        {/* CTAs */}
        {(showPrimary || showSecondary) && (
          <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {showPrimary && <CtaButton cta={primaryCta} />}
            {showSecondary && (
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
