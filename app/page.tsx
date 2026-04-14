import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import FeatureCards from '@/components/sections/FeatureCards';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export default function HomePage() {
  const cms = getContent();

  return (
    <div className="relative z-[1]">
      <Navbar content={cms.content.nav} />
      <main className="mx-auto max-w-[1200px] px-0">
        <Hero content={cms.content.hero} />
        <FeatureCards content={cms.content.features} />

        {/* Companion, not competitor */}
        <section className="border-b border-border-default px-8 py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <ScrollReveal>
              <h2 className="mb-6 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                A companion to OpenClaw, not a competitor.
              </h2>
              <p className="mb-4 text-base leading-[1.8] text-text-secondary sm:text-lg">
                OpenClaw is one of the most impressive open-source AI projects
                in the world — a community big enough to ship new releases
                almost every week. Clawless Computer is built on top of it,
                100% compatible, and exists to bring OpenClaw to people who
                cannot live in a terminal all day.
              </p>
              <p className="text-base leading-[1.8] text-text-secondary sm:text-lg">
                We do not fork OpenClaw. We do not compete with it. We track
                every release, test it, and ship the upgrades so you do not
                have to. Our success is OpenClaw&apos;s success.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <CtaSection content={cms.content.cta} />
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
