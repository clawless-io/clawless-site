import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Clawless Computer privacy notice, what this pre-launch site collects and what it does not.',
  // Pre-launch placeholder copy. Keep it crawlable for trust, but
  // out of the index so it does not surface above the marketing
  // surface on brand queries. Revisit once the entity-of-record
  // paragraph lands (project-privacy-terms-llc-backlog.md).
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  const cms = getContent();

  return (
    <div className="relative z-[1]">
      <Navbar content={cms.content.nav} />
      <main className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <section className="pb-12 pt-32 text-center">
          <ScrollReveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
              Legal
            </p>
            <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary sm:text-[52px]">
              Privacy
            </h1>
            <p className="mx-auto mt-4 max-w-[520px] text-base leading-relaxed text-text-secondary">
              Last updated: April 2026
            </p>
          </ScrollReveal>
        </section>

        <section className="mx-auto max-w-[760px] pb-24">
          <ScrollReveal>
            <div
              className="rounded-2xl border border-border-default p-8 text-text-secondary sm:p-10"
              style={{ background: 'rgba(10, 15, 28, 0.6)' }}
            >
              <p className="mb-4 leading-[1.8]">
                This is the pre-launch website for{' '}
                <strong className="text-text-primary">Clawless Computer</strong>.
                It is an informational site only. We do not collect anything
                from visitors here. No analytics, no cookies, no tracking
                scripts, no email signups, no logins. Visit, read, leave.
                Nothing is recorded.
              </p>
              <p className="mb-4 leading-[1.8]">
                When the Clawless Computer product launches, this page will be
                replaced with a full privacy policy covering what the desktop
                application stores locally, what (minimal) data the licensing
                system tracks server-side, and how to exercise your data
                rights including export and deletion.
              </p>
              <p className="leading-[1.8]">
                Until then: there is nothing to disclose, because there is
                nothing being collected. If you have questions, the contact
                channel will be added in a future update to this site.
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
