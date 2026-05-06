import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Subprocessors',
  description:
    'The third-party services that run clawless.ai and the purchase flow it links to. Lemon Squeezy as Merchant of Record (with Stripe under the hood), Cloudflare as host.',
};

export default function SubprocessorsPage() {
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
              Subprocessors
            </h1>
            <p className="mx-auto mt-4 max-w-[520px] text-base leading-relaxed text-text-secondary">
              Effective: May 5, 2026
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
                A subprocessor is a third-party service we rely on to operate
                parts of clawless.ai or the purchase flow it links to. We name
                each one below, describe what it does, and describe what data
                flows through it.
              </p>

              <p className="mb-6 leading-[1.8]">
                This page covers the marketing site (clawless.ai) and the
                purchase flow it links to. The Clawless Computer desktop
                application has its own list of subprocessors inside the app,
                because those depend on which AI providers you choose to
                connect with your own API keys.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Payment processing</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                <strong className="text-text-primary">Lemon Squeezy</strong> is
                our Merchant of Record for the upcoming Clawless Computer
                product. When the product launches and you click a buy button
                on this site, you complete checkout on Lemon Squeezy&apos;s
                domain, not ours. Lemon Squeezy receives your name, email
                address, billing address, payment method, and the IP address
                you check out from. They handle the card transaction,
                sales-tax computation and remittance, refunds, and the
                customer billing portal. Their privacy policy is at{' '}
                <a
                  href="https://www.lemonsqueezy.com/privacy"
                  className="text-accent underline hover:text-text-primary"
                >
                  lemonsqueezy.com/privacy
                </a>
                .
              </p>
              <p className="mb-4 leading-[1.8]">
                <strong className="text-text-primary">Stripe</strong> is Lemon
                Squeezy&apos;s underlying payment processor. We do not
                contract with Stripe directly. Stripe receives card data and
                authorization requests from Lemon Squeezy on our customers&apos;
                behalf. We disclose Stripe here so the legal trail is
                complete; Lemon Squeezy is the entity our customers contract
                with at checkout.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Hosting and delivery</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                <strong className="text-text-primary">Cloudflare</strong>{' '}
                hosts clawless.ai and serves every page through their edge
                network. Cloudflare Pages handles static-site hosting for the
                build output; Cloudflare DNS resolves the domain; the
                Cloudflare CDN caches and delivers pages globally; and
                Cloudflare&apos;s edge protections defend against
                denial-of-service traffic and abuse. In delivering pages to
                your browser, Cloudflare&apos;s edge processes connection
                metadata such as your IP address, your User-Agent header, and
                the path you requested. This is standard web-server-log data,
                used for delivery and abuse defense. We do not enable
                Cloudflare&apos;s analytics products on this site, and we do
                not access Cloudflare&apos;s operational logs to profile
                visitors, build audiences, or run marketing. Cloudflare&apos;s
                privacy policy is at{' '}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  className="text-accent underline hover:text-text-primary"
                >
                  cloudflare.com/privacypolicy
                </a>
                .
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  Desktop application subprocessors
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                The Clawless Computer desktop application uses additional
                subprocessors that depend on which AI providers you choose to
                connect with your own API keys. Those are listed inside the
                application under Settings, Legal, Subprocessors, because they
                only apply once you have purchased and installed the product.
                The list inside the app is the source of truth for in-app
                subprocessors. This page does not enumerate them, since the
                connection is the user&apos;s choice and the keys live on the
                user&apos;s computer.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Updates</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                We update this page when our subprocessor list changes. The
                &quot;Effective&quot; date at the top reflects the most recent
                version. Changes that introduce a new subprocessor or
                substantially expand the categories of data a current
                subprocessor receives will be flagged at the top of{' '}
                <a
                  href="/privacy"
                  className="text-accent underline hover:text-text-primary"
                >
                  /privacy
                </a>{' '}
                for at least 30 days. We commit to updating before changing,
                not after.
              </p>
              <p className="mb-4 leading-[1.8]">
                For questions about this list, contact{' '}
                <a
                  href="mailto:info@rbjglobal.com"
                  className="text-accent underline hover:text-text-primary"
                >
                  info@rbjglobal.com
                </a>
                .
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Changelog</strong>
              </p>
              <ul className="ml-6 list-disc space-y-2 leading-[1.8]">
                <li>
                  <strong>2026-05-05</strong> — Initial publication. Lemon
                  Squeezy named as Merchant of Record (Stripe disclosed as
                  Lemon Squeezy&apos;s underlying processor); Cloudflare named
                  as host. Pointer to the in-app subprocessors page added for
                  the desktop product.
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
