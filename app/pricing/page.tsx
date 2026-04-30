import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import CtaButton from '@/components/ui/CtaButton';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Clawless Computer pricing. One plan, three ways to pay: $4.95 monthly, $50 yearly, or $199 founding-member lifetime. Same features at every price. 7-day trial with no card, no email, no account.',
};

export default function PricingPage() {
  const cms = getContent();
  const p = cms.content.pricingPage;

  return (
    <div className="relative z-[1]">
      <Navbar content={cms.content.nav} />
      <main className="mx-auto max-w-[1200px] px-6 sm:px-8">
        {/* ── Page hero ── */}
        <section className="relative overflow-hidden pb-12 pt-[100px] text-center sm:pb-16 sm:pt-[120px]">
          <div
            className="pointer-events-none absolute left-1/2 top-[-160px] h-[600px] w-[600px] rounded-full"
            style={{
              transform: 'translateX(-50%)',
              background:
                'radial-gradient(circle, rgba(0,212,255,0.10) 0%, rgba(34,255,170,0.05) 40%, transparent 65%)',
              filter: 'blur(40px)',
            }}
            aria-hidden
          />

          <ScrollReveal>
            <h1
              className="relative mb-6 text-[40px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[52px] md:text-[60px]"
              style={{
                background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {p.pageTitle}
            </h1>
            <p className="relative mx-auto mb-8 max-w-[640px] text-base leading-[1.7] text-text-secondary sm:text-lg">
              {p.pageSubhead}
            </p>
            {p.privacyHook && (
              <p className="relative mx-auto inline-flex items-center gap-2 rounded-full border border-border-light bg-bg-surface px-4 py-2 text-[13px] font-medium text-text-primary">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: '#22FFAA' }}
                  aria-hidden
                />
                {p.privacyHook}
              </p>
            )}
          </ScrollReveal>
        </section>

        {/* ── Pre-launch banner ── */}
        <section className="px-2 pb-8 sm:px-8">
          <ScrollReveal>
            <div
              role="status"
              className="mx-auto flex max-w-[860px] items-center justify-center rounded-2xl border border-border-default bg-bg-surface px-6 py-4 text-center text-sm text-text-muted sm:text-base"
            >
              <span
                className="mr-3 inline-block h-2 w-2 rounded-full"
                style={{
                  background: '#FFB800',
                  animation: 'pulse 2s infinite',
                }}
                aria-hidden
              />
              {p.preLaunchBanner}
            </div>
          </ScrollReveal>
        </section>

        {/* ── Tier cards ── */}
        <section className="px-2 pb-12 sm:px-8">
          <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-5 md:grid-cols-3">
            {p.tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.08}>
                <div
                  className={`relative h-full rounded-2xl border bg-bg-surface p-7 transition-all duration-300 ${
                    tier.highlighted
                      ? 'border-accent'
                      : 'border-border-light hover:border-text-muted'
                  }`}
                  style={
                    tier.highlighted
                      ? { boxShadow: '0 0 32px rgba(0, 212, 255, 0.18)' }
                      : undefined
                  }
                >
                  {tier.badge && (
                    <span
                      className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                      style={{
                        background:
                          'linear-gradient(135deg, #00D4FF, #22FFAA)',
                        color: '#05070F',
                      }}
                    >
                      {tier.badge}
                    </span>
                  )}

                  <h2 className="mb-3 text-[15px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
                    {tier.name}
                  </h2>
                  <p
                    className="mb-2 text-[44px] font-extrabold leading-none tracking-[-0.02em]"
                    style={
                      tier.highlighted
                        ? {
                            background:
                              'linear-gradient(135deg, #00D4FF 0%, #22FFAA 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }
                        : undefined
                    }
                  >
                    {tier.priceLabel}
                  </p>
                  {tier.priceNote && (
                    <p className="mb-7 min-h-[3em] text-sm leading-relaxed text-text-muted">
                      {tier.priceNote}
                    </p>
                  )}

                  <div className="mt-auto">
                    <div className="flex justify-center">
                      <CtaButton cta={tier.cta} comingSoonSuffix="" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── What's included ── */}
        <section className="px-2 py-16 sm:px-8">
          <div className="mx-auto max-w-[760px]">
            <ScrollReveal>
              <h2 className="mb-6 text-center text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                {p.includesHeadline}
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {p.includes.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 rounded-xl border border-border-light bg-bg-surface px-5 py-4"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: '#22FFAA', marginTop: 2, flexShrink: 0 }}
                      aria-hidden
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Comparison strip ── */}
        {p.comparison && (
          <section className="border-t border-border-light px-2 py-16 sm:px-8">
            <div className="mx-auto max-w-[1080px]">
              <ScrollReveal>
                <h2 className="mb-8 text-center text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                  {p.comparison.headline}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {p.comparison.rows.map((row) => (
                    <div
                      key={row.product}
                      className="rounded-xl border border-border-light bg-bg-surface px-5 py-4"
                    >
                      <p className="mb-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">
                        {row.product}
                      </p>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {row.details}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center text-xs text-text-muted">
                  Prices and feature sets are factual at the time of writing.
                  Different products solve different jobs; the price line is
                  one variable among many.
                </p>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {p.faq && p.faq.length > 0 && (
          <section className="border-t border-border-light px-2 py-16 sm:px-8">
            <div className="mx-auto max-w-[760px]">
              <ScrollReveal>
                <h2 className="mb-8 text-center text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                  Common questions
                </h2>
              </ScrollReveal>
              <dl className="space-y-6">
                {p.faq.map((item, i) => (
                  <ScrollReveal key={item.question} delay={i * 0.05}>
                    <div className="rounded-2xl border border-border-light bg-bg-surface p-6">
                      <dt className="mb-2 text-base font-semibold text-text-primary">
                        {item.question}
                      </dt>
                      <dd className="text-sm leading-relaxed text-text-secondary">
                        {item.answer}
                      </dd>
                    </div>
                  </ScrollReveal>
                ))}
              </dl>
            </div>
          </section>
        )}
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
