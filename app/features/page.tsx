import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import FeatureGroups from '@/components/sections/FeatureGroups';
import CtaButton from '@/components/ui/CtaButton';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Every feature that ships in Clawless Computer: chat with any AI model, specialized agents, tiered memory, tools and MCP, skills, channels, and scheduled automations. Built on top of OpenClaw and polished for everyday users.',
};

export default function FeaturesPage() {
  const cms = getContent();
  const fp = cms.content.featuresPage;

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
            <p className="relative mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Features
            </p>
            <h1
              className="relative mb-6 text-[40px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[52px] md:text-[60px]"
              style={{
                background: 'linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {fp.pageTitle}
            </h1>
            <p className="relative mx-auto mb-8 max-w-[680px] text-base leading-[1.7] text-text-secondary sm:text-lg">
              {fp.pageLead}
            </p>
            {fp.privacyHook && (
              <p className="relative mx-auto inline-flex items-center gap-2 rounded-full border border-border-light bg-bg-surface px-4 py-2 text-[13px] font-medium text-text-primary">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: 'var(--color-success)' }}
                  aria-hidden
                />
                {fp.privacyHook}
              </p>
            )}
          </ScrollReveal>
        </section>

        {/* ── Seven feature groups ── */}
        <FeatureGroups groups={fp.groups} />

        {/* ── Closing CTA ── */}
        <section className="px-2 py-20 sm:px-8">
          <div className="mx-auto max-w-[760px] text-center">
            <ScrollReveal>
              <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
                {fp.closingHeadline}
              </h2>
              <p className="mx-auto mb-10 max-w-[600px] text-base text-text-secondary sm:text-lg">
                {fp.closingDescription}
              </p>
              {fp.closingButton && <CtaButton cta={fp.closingButton} />}
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
