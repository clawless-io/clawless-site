import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Get help with Clawless Computer. Email support for license activation, billing, and product questions, or start with the documentation.',
  alternates: { canonical: 'https://clawless.ai/support/' },
};

export default function SupportPage() {
  const cms = getContent();

  return (
    <div className="relative z-[1]">
      <Navbar content={cms.content.nav} />
      <main id="main-content" className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <section className="pb-12 pt-32 text-center">
          <ScrollReveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
              Support
            </p>
            <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary sm:text-[52px]">
              Need help?
            </h1>
            <p className="mx-auto mt-4 max-w-[560px] text-base leading-relaxed text-text-secondary">
              A person reads every message. Email us and we will get back
              to you.
            </p>
          </ScrollReveal>
        </section>

        <section className="mx-auto max-w-[760px] pb-24">
          <ScrollReveal>
            <div
              className="rounded-2xl border border-border-default p-8 text-text-secondary sm:p-10"
              style={{ background: 'rgba(10, 15, 28, 0.6)' }}
            >
              <p className="mb-2 leading-[1.8]">
                <strong className="text-text-primary">Email support</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                For license activation, billing, or anything else about
                Clawless Computer, email{' '}
                <a
                  href="mailto:support@clawless.ai"
                  className="text-accent underline hover:text-text-primary"
                >
                  support@clawless.ai
                </a>
                . If your question is about a purchase or a license, include
                the email address on your order; it is the fastest way for
                us to find your record.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  Documentation
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Setup, provider keys, and day-to-day usage are covered in{' '}
                <a
                  href="/docs/"
                  className="text-accent underline hover:text-text-primary"
                >
                  the documentation
                </a>
                . Many activation and configuration questions are answered
                there.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  Refunds and billing
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Every purchase carries a fourteen-day no-questions-asked
                refund window. The details, and how to request one, are in
                the{' '}
                <a
                  href="/refunds/"
                  className="text-accent underline hover:text-text-primary"
                >
                  refund policy
                </a>
                .
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  Security reports
                </strong>
              </p>
              <p className="leading-[1.8]">
                Found a security issue? Email{' '}
                <a
                  href="mailto:security@clawless.ai"
                  className="text-accent underline hover:text-text-primary"
                >
                  security@clawless.ai
                </a>{' '}
                directly. See the{' '}
                <a
                  href="/trust/"
                  className="text-accent underline hover:text-text-primary"
                >
                  trust page
                </a>{' '}
                for how we handle reports.
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
