import type { CtaButtonContent } from '@/lib/cms-types';

interface Props {
  cta: CtaButtonContent;
  /**
   * Override the suffix used on the disabled (coming-soon) state.
   * Defaults to "Coming Q3 2026" to match the hero pill. Pass an empty
   * string to render the label alone (e.g. "Available Q3 2026") without
   * a trailing "· ..." marker.
   */
  comingSoonSuffix?: string;
}

/**
 * Primary CTA button shared across home (Hero, footer CTA) and /features
 * (closing CTA). Server component, no client hooks. Uses Tailwind arbitrary
 * hover values instead of inline JS handlers so the component does not pull
 * its parent into the client bundle.
 *
 * When `cta.comingSoon` is true, renders as a non-clickable gray `<span>`
 * with an `aria-label` that reads the full state to screen readers (the
 * visible suffix lives in a child span with `aria-hidden`). Flip
 * `comingSoon` to false in lib/cms.ts to re-enable the active link at
 * launch; one place per CTA, no component edits needed.
 */
export default function CtaButton({
  cta,
  comingSoonSuffix = 'Coming Q3 2026',
}: Props) {
  if (cta.comingSoon) {
    const ariaLabel = comingSoonSuffix
      ? `${cta.label}, ${comingSoonSuffix.toLowerCase()}`
      : cta.label;
    return (
      <span
        aria-disabled="true"
        aria-label={ariaLabel}
        className="inline-flex min-h-[56px] cursor-not-allowed items-center justify-center rounded-[14px] border border-border-default bg-bg-surface px-8 py-[18px] text-[16px] font-semibold text-text-muted sm:px-11 sm:text-[17px]"
      >
        {cta.label}
        {comingSoonSuffix && (
          <span className="ml-2 opacity-70" aria-hidden="true">
            · {comingSoonSuffix}
          </span>
        )}
      </span>
    );
  }

  return (
    <a
      href={cta.href}
      className="inline-flex min-h-[56px] items-center justify-center rounded-[14px] px-11 py-[18px] text-[17px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(0,212,255,0.45)]"
      style={{
        background: 'linear-gradient(135deg, var(--color-accent), var(--color-success))',
        color: 'var(--color-bg-primary)',
        boxShadow: '0 0 24px rgba(0, 212, 255, 0.25)',
      }}
    >
      {cta.label}
    </a>
  );
}
