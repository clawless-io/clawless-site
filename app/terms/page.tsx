import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Clawless Computer terms placeholder. RBJ Global LLC is the operator of the site and the upcoming product. Full terms of service ship with the launch.',
};

export default function TermsPage() {
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
              Terms
            </h1>
            <p className="mx-auto mt-4 max-w-[520px] text-base leading-relaxed text-text-secondary">
              Last updated: May 2026
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
                This site is the pre-launch presence for{' '}
                <strong className="text-text-primary">Clawless Computer</strong>,
                an upcoming desktop product built on top of the open-source
                OpenClaw engine. The site is provided for informational
                purposes only.
              </p>
              <p className="mb-4 leading-[1.8]">
                The site and the upcoming Clawless Computer product are
                operated by{' '}
                <strong className="text-text-primary">RBJ Global LLC</strong>,
                a United States limited liability company organized in the
                State of Texas, with a principal office at 5900 Balcones
                Drive, STE 100, Austin, TX 78731, USA. Once the product
                launches, RBJ Global LLC will be the contracting party for
                the Clawless Computer license. The full terms of service
                published with launch will be governed by the laws of the
                State of Texas, USA, without regard to its conflict-of-laws
                principles, with venue in the state or federal courts located
                in Travis County, Texas. Until those terms are published, no
                contract for the Clawless Computer product exists, and use of
                this informational site is governed by these placeholder
                terms.
              </p>
              <p className="mb-4 leading-[1.8]">
                If you have a concern about this site, please contact{' '}
                <a
                  href="mailto:info@rbjglobal.com"
                  className="text-accent underline hover:text-text-primary"
                >
                  info@rbjglobal.com
                </a>{' '}
                first so we can address it directly. Most issues can be
                resolved by email and in good faith, without formal action.
              </p>
              <p className="mb-4 leading-[1.8]">
                Nothing on this page constitutes an offer, warranty, or
                contract. Product features, naming, pricing, availability, and
                release timing may change between now and the first public
                release.
              </p>
              <p className="mb-4 leading-[1.8]">
                This site is provided on an as-is, as-available basis. RBJ
                Global LLC makes no warranties, express or implied, about the
                accuracy, completeness, or availability of the information on
                this site, and disclaims all implied warranties to the maximum
                extent permitted by applicable law. Forward-looking statements
                about Clawless Computer (including features, pricing, naming,
                and release timing) reflect current intent and may change
                before the first public release.
              </p>
              <p className="mb-4 leading-[1.8]">
                Full terms of service for the Clawless Computer product will
                be published with the launch and will fully replace this
                placeholder. Those terms will cover license grant, acceptable
                use, payment terms, refund policy, warranty disclaimers,
                indemnity, limitation of liability, governing law, and dispute
                resolution. Until those terms are published, no purchases are
                being processed through this site, and no refund obligation
                can be created. After launch, the then-current refund policy
                in the published Terms of Service will apply to all purchases.
                In the event of any conflict between this placeholder and the
                full terms published at launch, the full terms control from
                the effective date stated in those terms.
              </p>
              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Changelog</strong>
              </p>
              <ul className="ml-6 list-disc space-y-2 leading-[1.8]">
                <li>
                  <strong>2026-05-03</strong> — Senior-policy-reviewer audit
                  applied: Texas governing law and Travis County venue named
                  on the placeholder, informal-first dispute resolution
                  paragraph added, as-is/as-available warranty disclaimer for
                  the site itself added (separate from the future product
                  license). Non-material clarifications.
                </li>
                <li>
                  <strong>2026-05-02</strong> — Closing paragraph expanded
                  with indemnity, governing-law, dispute-resolution coverage;
                  precedence clause added; entity-of-record paragraph names
                  RBJ Global LLC; site reindexed at sitemap priority 0.3.
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
