import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import CtaButton from '@/components/ui/CtaButton';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Download',
  description:
    'Download Clawless Computer for Mac or Ubuntu. Available Q3 2026. About 200 MB to download, around 500 MB installed. No card, no email, no account to start the 7-day trial.',
};

const osIcons: Record<'macos' | 'windows' | 'linux', React.ReactNode> = {
  macos: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12-1.03.396-2.07 1.124-2.91.81-.94 2.22-1.65 3.04-1.74zM20.5 17.45c-.55 1.27-.81 1.83-1.5 2.94-.97 1.55-2.34 3.49-4.04 3.51-1.51.01-1.9-.99-3.95-.98-2.05.01-2.48.99-3.99.98-1.7-.02-3-1.78-3.97-3.32C.42 16.32.13 11.07 2.41 8.36c1.57-1.86 4.03-2.95 6.34-2.95 2.36 0 3.84 1.3 5.79 1.3 1.89 0 3.04-1.3 5.77-1.3 2.06 0 4.24 1.13 5.79 3.07-5.09 2.79-4.27 10.01-1.6 11.97z" />
    </svg>
  ),
  windows: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  ),
  linux: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.6.058.399.116.755.027.93-.354.671-.413 1.075-.219 1.379.293.456.892.43 1.515.295.624-.135 1.297-.346 1.901-.27.768.025 1.27.434 1.815.626.479.125.881.075 1.274-.207.255-.193.469-.467.63-.838.157-.371.301-.85.301-1.456v-.012c.087.087.193.156.301.225.276.179.59.301.92.301h.01c.314.014.624-.07.92-.255.293-.184.529-.479.624-.835l.012-.04c.111-.422.154-.875.082-1.355-.156-.876-.59-1.736-1.166-2.546-.66-.929-1.494-1.683-2.394-2.397-.39-.297-.661-.582-.78-.832-.116-.232-.13-.428-.103-.694.064-.65.353-1.323.604-1.825.135-.273.32-.586.484-.928.11-.225.215-.486.27-.766z" />
    </svg>
  ),
};

export default function DownloadPage() {
  const cms = getContent();
  const d = cms.content.downloadPage;

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
                background:
                  'linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {d.pageTitle}
            </h1>
            <p className="relative mx-auto mb-8 max-w-[680px] text-base leading-[1.7] text-text-secondary sm:text-lg">
              {d.pageSubhead}
            </p>
            {d.privacyHook && (
              <p className="relative mx-auto inline-flex items-center gap-2 rounded-full border border-border-light bg-bg-surface px-4 py-2 text-[13px] font-medium text-text-primary">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: 'var(--color-success)' }}
                  aria-hidden
                />
                {d.privacyHook}
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
                  background: 'var(--color-warning)',
                  animation: 'pulse 2s infinite',
                }}
                aria-hidden
              />
              {d.preLaunchBanner}
            </div>
          </ScrollReveal>
        </section>

        {/* ── Install flow ── */}
        <section className="px-2 py-16 sm:px-8">
          <div className="mx-auto max-w-[860px]">
            <ScrollReveal>
              <h2 className="mb-8 text-center text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                {d.installFlow.headline}
              </h2>
              <ol className="space-y-4">
                {d.installFlow.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-border-light bg-bg-surface px-6 py-5"
                  >
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[15px] font-semibold"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--color-accent), var(--color-success))',
                        color: 'var(--color-bg-primary)',
                      }}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span className="text-base leading-relaxed text-text-secondary">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </section>

        {/* ── OS cards ── */}
        <section className="border-t border-border-light px-2 py-16 sm:px-8">
          <div className="mx-auto max-w-[1080px]">
            <ScrollReveal>
              <h2 className="mb-8 text-center text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                Choose your platform
              </h2>
            </ScrollReveal>
            <div className="mx-auto grid max-w-[760px] grid-cols-1 gap-5 md:grid-cols-2">
              {d.osCards.map((card, i) => (
                <ScrollReveal key={card.os} delay={i * 0.08}>
                  <div className="flex h-full flex-col rounded-2xl border border-border-light bg-bg-surface p-7 transition-all duration-300 hover:border-text-muted">
                    <div
                      className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-xl"
                      style={{
                        background: 'rgba(0, 212, 255, 0.12)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      {osIcons[card.iconKey]}
                    </div>
                    <h3 className="mb-3 text-[20px] font-bold tracking-[-0.02em]">
                      {card.os}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-text-muted">
                      {card.versionLabel}
                    </p>
                    {card.architectures.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {card.architectures.map((arch) => (
                          <span
                            key={arch}
                            className="inline-flex items-center rounded-full border border-border-light bg-bg-surface-hover px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-text-muted"
                          >
                            {arch}
                          </span>
                        ))}
                      </div>
                    )}
                    {card.formats && card.formats.length > 0 && (
                      <ul className="mb-5 space-y-1.5 text-sm text-text-secondary">
                        {card.formats.map((fmt) => (
                          <li key={fmt} className="flex items-start gap-2">
                            <span
                              className="mt-2 h-1 w-1 flex-shrink-0 rounded-full"
                              style={{ background: 'var(--color-success)' }}
                              aria-hidden
                            />
                            {fmt}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto flex justify-center pt-2">
                      <CtaButton cta={card.cta} comingSoonSuffix="" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── System requirements ── */}
        <section className="border-t border-border-light px-2 py-16 sm:px-8">
          <div className="mx-auto max-w-[760px]">
            <ScrollReveal>
              <h2 className="mb-6 text-center text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                {d.systemRequirements.headline}
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {d.systemRequirements.items.map((item) => (
                  <li
                    key={item}
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
                      style={{
                        color: 'var(--color-success)',
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                      aria-hidden
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Install footprint disclosure ── */}
        <section className="border-t border-border-light px-2 py-16 sm:px-8">
          <div className="mx-auto max-w-[760px] text-center">
            <ScrollReveal>
              <h2 className="mb-5 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                {d.installFootprint.headline}
              </h2>
              <p className="mx-auto max-w-[640px] text-base leading-[1.7] text-text-secondary sm:text-lg">
                {d.installFootprint.body}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Trust strip ── */}
        <section className="border-t border-border-light px-2 pb-20 pt-12 sm:px-8">
          <div className="mx-auto max-w-[760px] text-center">
            <ScrollReveal>
              <p className="text-sm leading-relaxed text-text-muted">
                {d.trustStrip}
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
