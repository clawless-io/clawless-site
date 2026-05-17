import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description:
    'Clawless Computer refund policy. Fourteen-day no-questions-asked window on every purchase, applied identically to monthly, yearly, and lifetime plans. Lemon Squeezy handles the refund transaction.',
  robots: { index: false, follow: true },
};

export default function RefundsPage() {
  const cms = getContent();

  return (
    <div className="relative z-[1]">
      <Navbar content={cms.content.nav} />
      <main id="main-content" className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <section className="pb-12 pt-32 text-center">
          <ScrollReveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
              Legal
            </p>
            <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary sm:text-[52px]">
              Refunds
            </h1>
            <p className="mx-auto mt-4 max-w-[560px] text-base leading-relaxed text-text-secondary">
              Last updated: May 17, 2026
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
                <strong className="text-text-primary">Summary</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Full refund within fourteen days of purchase, no questions
                asked, on every Clawless Computer plan. Email{' '}
                <a
                  href="mailto:info@clawless.ai"
                  className="text-accent underline hover:text-text-primary"
                >
                  info@clawless.ai
                </a>{' '}
                with your order number and we will process it. After fourteen
                days we generally do not offer refunds, except where required
                by law.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  1. The fourteen-day window
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Every Clawless Computer purchase comes with a fourteen-day
                no-questions-asked refund window. The window starts on the
                day of purchase, as recorded by Lemon Squeezy (our merchant
                of record) on your receipt. You do not need to provide a
                reason. The window applies identically to the monthly plan,
                the yearly plan, and the lifetime license; same purchase,
                same fourteen-day right to walk away.
              </p>
              <p className="mb-4 leading-[1.8]">
                The fourteen-day window exists so you can install Clawless
                Computer, configure your AI provider keys, run real work
                through it for two weeks, and decide whether it fits your
                workflow before the purchase becomes final.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  2. How to request a refund
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Email{' '}
                <a
                  href="mailto:info@clawless.ai"
                  className="text-accent underline hover:text-text-primary"
                >
                  info@clawless.ai
                </a>{' '}
                from the address you used to purchase. Include your Lemon
                Squeezy order number (it is on your receipt). We will:
              </p>
              <ul className="ml-6 mb-4 list-disc space-y-2 leading-[1.8]">
                <li>Confirm receipt within one business day</li>
                <li>
                  Initiate the refund with Lemon Squeezy within three
                  business days. Refunds typically appear on your statement
                  within three to ten business days after that, depending on
                  your bank
                </li>
                <li>
                  Deactivate the license on our side. The app on your Mac
                  will detect this on its next license check (within 24
                  hours) and revert to a read-only state, with a 30-day
                  offline grace window before full lock-out
                </li>
              </ul>
              <p className="mb-4 leading-[1.8]">
                Refunds are issued to the original payment method. Bank or
                card processing may take an additional three to ten business
                days depending on your bank.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  3. After the fourteen days
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                We do not offer refunds after the fourteen-day window has
                elapsed, except where required by applicable consumer
                protection law. If you believe you have a statutory right to
                a refund beyond the fourteen-day window, email us and tell
                us which jurisdiction and which provision. We will assess
                the request in good faith.
              </p>
              <p className="mb-4 leading-[1.8]">
                For the subscription plans (monthly and yearly), cancelling
                your subscription after the fourteen-day window stops the
                next billing cycle. You retain access for the remainder of
                the cycle you already paid for. Cancellation is not the same
                as a refund of the current cycle; we do not pro-rate
                partially-used subscription periods.
              </p>
              <p className="mb-4 leading-[1.8]">
                For the lifetime license, there is no further billing to
                stop, so the only mechanism after the fourteen-day window is
                the statutory-rights path described above.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  4. The seven-day trial comes first
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Clawless Computer activates a seven-day trial inside the app
                itself, with no credit card, no email, and no account. The
                trial is the right way to find out whether Clawless works
                for your workflow before you pay anything. The trial does
                not auto-convert to a paid plan; nothing is charged unless
                you decide to purchase a license and you complete the Lemon
                Squeezy checkout yourself.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  5. How subscriptions cancel
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                The monthly plan ($4.95 per month) and the yearly plan ($50
                per year) auto-renew at the end of each billing cycle until
                you cancel. You can cancel at any time from the customer
                portal Lemon Squeezy provides on your purchase receipt;
                cancellation takes effect at the end of the current paid
                period. You can also email us and we will cancel on your
                behalf.
              </p>
              <p className="mb-4 leading-[1.8]">
                The lifetime license is a one-time purchase. It does not
                auto-renew. The founding-member price of $199 is available
                for the first three months from public launch; after that
                window closes, the standard lifetime price applies.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  6. Lemon Squeezy is our merchant of record
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Lemon Squeezy handles the payment, the receipt, the tax
                invoice, and the refund transaction. We tell Lemon Squeezy
                to issue the refund and they do. You can also request a
                refund directly through Lemon Squeezy&apos;s customer portal;
                it goes to the same place. Their refund policy governs the
                payment side of the transaction. For the list of every
                third-party service involved in your purchase, see our{' '}
                <a
                  href="/subprocessors"
                  className="text-accent underline hover:text-text-primary"
                >
                  subprocessors page
                </a>
                .
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">7. Chargebacks</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Please email{' '}
                <a
                  href="mailto:info@clawless.ai"
                  className="text-accent underline hover:text-text-primary"
                >
                  info@clawless.ai
                </a>{' '}
                before initiating a credit-card chargeback. We would much
                rather refund you directly. It is faster for you and avoids
                fees on our side. If a chargeback is filed without first
                contacting us, and we determine the underlying transaction
                was valid (for example, a license that has been actively
                used past the fourteen-day refund window), we may dispute
                the chargeback with evidence of use, and we may suspend the
                associated license while the chargeback is open.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">8. Contact</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                All refund questions go to{' '}
                <a
                  href="mailto:info@clawless.ai"
                  className="text-accent underline hover:text-text-primary"
                >
                  info@clawless.ai
                </a>
                . The binding text on payments and refunds, once the full
                terms of service ship at launch, will live in those terms
                and will govern any conflict with this page from the
                effective date stated there.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Changelog</strong>
              </p>
              <ul className="ml-6 list-disc space-y-2 leading-[1.8]">
                <li>
                  <strong>2026-05-17:</strong> Initial publication.
                  Establishes the fourteen-day no-questions-asked window
                  across all three plans, the cancellation-versus-refund
                  distinction for subscriptions, and the Lemon Squeezy
                  merchant-of-record handling. Replaces the forward-looking
                  paragraph that previously bundled refund posture into the{' '}
                  <a
                    href="/terms"
                    className="text-accent underline hover:text-text-primary"
                  >
                    terms placeholder
                  </a>
                  .
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
