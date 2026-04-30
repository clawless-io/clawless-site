'use client';

import ScrollReveal from '@/components/effects/ScrollReveal';
import type { CtaContent } from '@/lib/cms-types';

interface Props {
  content?: CtaContent;
}

export default function CtaSection({ content }: Props) {
  const headline = content?.headline ?? 'Coming Q3 2026.';
  const description =
    content?.description ??
    'Currently in active development. The first public release is targeted for Q3 2026.';
  const buttonLabel = content?.buttonLabel ?? '';
  const buttonHref = content?.buttonHref ?? '';
  const buttonComingSoon = content?.buttonComingSoon ?? false;
  const showButton = !!buttonLabel && !!buttonHref;

  return (
    <section className="border-b border-border-default px-8 py-20">
      <div className="mx-auto max-w-[1200px] text-center">
        <ScrollReveal>
          <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
            {headline}
          </h2>
          <p className="mx-auto mb-10 max-w-[580px] text-base text-text-secondary sm:text-lg">
            {description}
          </p>
          {showButton && (
            buttonComingSoon ? (
              <span
                aria-disabled="true"
                className="inline-flex min-h-[56px] cursor-not-allowed items-center justify-center rounded-[14px] border border-border-default bg-bg-surface px-8 py-[18px] text-[16px] font-semibold text-text-muted sm:px-11 sm:text-[17px]"
              >
                {buttonLabel}
                <span className="ml-2 opacity-70">· Coming Q3 2026</span>
              </span>
            ) : (
              <a
                href={buttonHref}
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
                {buttonLabel}
              </a>
            )
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
