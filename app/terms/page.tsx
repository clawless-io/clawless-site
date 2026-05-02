import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Terms',
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
                a United States limited liability company registered in the
                State of Texas, with its principal office at 5900 Balcones
                Drive, STE 100, Austin, TX 78731, USA. Once the product
                launches, RBJ Global LLC will be the contracting party for
                the Clawless Computer license. The full terms of service
                published with launch will name this entity and specify
                governing law and dispute resolution.
              </p>
              <p className="mb-4 leading-[1.8]">
                Nothing on this page constitutes an offer, warranty, or
                contract. Product features, naming, pricing, availability, and
                release timing may change between now and the first public
                release.
              </p>
              <p className="leading-[1.8]">
                Full terms of service for the Clawless Computer product will
                be published with the launch and replace this placeholder.
                They will cover license grant, acceptable use, payment terms,
                refund policy, warranty disclaimers, and limitation of
                liability.
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
