import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Acceptable Use Policy',
  description:
    'Clawless Computer acceptable use policy. What you can do with the app, what you cannot, how the BYOK provider relationship interacts with this policy, and how to report abuse.',
  robots: { index: false, follow: true },
};

export default function AcceptableUsePage() {
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
              Acceptable Use
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
                Use Clawless Computer for your own work or your team&apos;s
                work. Respect every applicable law. Do not use the app to
                harm other people. Do not try to circumvent the license
                mechanism. The AI provider you bring your own key to has
                its own acceptable use policy; that policy applies to the
                prompts you send through your key.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  1. What this policy is
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                This Acceptable Use Policy describes the categories of
                behavior that are not allowed when using Clawless Computer.
                It is part of, and should be read alongside, our terms of
                service. Where this page covers a situation explicitly, the
                language here applies. Where a situation is not explicitly
                covered but clearly violates the spirit of the terms, we
                reserve the right to act on it.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  2. What you can do
                </strong>
              </p>
              <ul className="ml-6 mb-4 list-disc space-y-2 leading-[1.8]">
                <li>
                  Use Clawless Computer for personal work, professional
                  work, research, study, or any creative or productive
                  purpose
                </li>
                <li>
                  Connect your own API keys for any supported AI provider
                  (Anthropic, OpenAI, Google, Groq, and others), and use
                  the app to send prompts through those keys under each
                  provider&apos;s terms
                </li>
                <li>
                  Install and develop your own skills, agents, and tools on
                  top of the application
                </li>
                <li>
                  Activate Clawless Computer on multiple Macs you own or
                  control, up to your license&apos;s activation limit
                </li>
                <li>
                  Build automations or workflows on top of the local
                  Clawless surfaces (the bundled tools, the browser
                  automation, the local channels integrations) for your
                  own use
                </li>
              </ul>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  3. What you cannot do
                </strong>
              </p>

              <p className="mb-2 mt-6 leading-[1.8]">
                <strong className="text-text-primary">
                  3.1 Unlawful or harmful content
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Do not use Clawless Computer to generate, store, distribute,
                or process content that:
              </p>
              <ul className="ml-6 mb-4 list-disc space-y-2 leading-[1.8]">
                <li>
                  Is illegal under the laws of your jurisdiction or the
                  United States, including child sexual abuse material,
                  material that incites violence or terrorism, or material
                  that infringes copyright you do not hold
                </li>
                <li>
                  Targets identifiable individuals with harassment,
                  defamation, threats, or stalking, or that violates a
                  specific person&apos;s privacy without lawful basis
                </li>
                <li>
                  Is designed to facilitate fraud, identity theft, phishing,
                  social engineering, or other deception against third
                  parties
                </li>
                <li>
                  Generates or distributes malicious code, malware, or
                  exploits against systems you do not own or are not
                  authorized to test
                </li>
                <li>
                  Was obtained through unauthorized access to a system,
                  network, or account
                </li>
              </ul>

              <p className="mb-2 mt-6 leading-[1.8]">
                <strong className="text-text-primary">
                  3.2 BYOK provider rules apply to your prompts
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                When you connect an AI provider with your own API key, the
                prompts you send and the responses you receive flow
                directly between your computer and that provider. The
                provider&apos;s own acceptable use policy applies to that
                traffic. Anthropic, OpenAI, Google, Groq, and the others
                each publish their own usage policies, and each can suspend
                or revoke your API access for content that violates those
                rules. Clawless does not see, log, or moderate your
                provider traffic; you are responsible for staying within
                each provider&apos;s terms.
              </p>

              <p className="mb-2 mt-6 leading-[1.8]">
                <strong className="text-text-primary">
                  3.3 Software and license abuse
                </strong>
              </p>
              <ul className="ml-6 mb-4 list-disc space-y-2 leading-[1.8]">
                <li>
                  Do not reverse-engineer, decompile, or disassemble the
                  app except to the extent expressly permitted by
                  applicable law
                </li>
                <li>
                  Do not attempt to circumvent the license activation
                  mechanism, use a license key that was not issued to you,
                  or share a license key in a way that exceeds your
                  activation limit
                </li>
                <li>
                  Do not redistribute, resell, sublicense, rent, or
                  transfer Clawless Computer or any license key
                </li>
                <li>
                  Do not remove or modify the proprietary notices,
                  trademarks, or copyright marks shipped with the app
                </li>
                <li>
                  Do not use Clawless Computer, its outputs, or its
                  behavior to develop, train, evaluate, or benchmark a
                  product that competes with Clawless Computer
                </li>
              </ul>

              <p className="mb-2 mt-6 leading-[1.8]">
                <strong className="text-text-primary">
                  3.4 Infrastructure abuse
                </strong>
              </p>
              <ul className="ml-6 mb-4 list-disc space-y-2 leading-[1.8]">
                <li>
                  Do not use Clawless Computer in a manner that
                  overburdens our license-validation infrastructure or
                  that of our subprocessors (Lemon Squeezy, Cloudflare)
                </li>
                <li>
                  Do not script or automate license activation,
                  deactivation, or validation requests beyond ordinary
                  single-user usage
                </li>
                <li>
                  Do not expose the bundled local services (MCP servers,
                  browser automation endpoints, IPC surfaces) to the
                  public internet, and do not use them to provide Clawless
                  Computer functionality as a service to users other than
                  yourself or members of your immediate household or team
                  operating under your license
                </li>
              </ul>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  4. Where the responsibility sits
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Clawless Computer is local-first: conversations, settings,
                memory entries, and your work product live on your Mac. We
                do not see what you generate. The legal responsibility for
                what you produce, store, or distribute using the app rests
                with you. If you enable any optional feature that sends
                data off your Mac (a BYOK provider connection, the Help
                mode lookup to our knowledge base, license validation with
                Lemon Squeezy), the terms of that downstream service apply
                to that specific traffic, in addition to this policy.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  5. Reporting abuse
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                If you believe a license holder is using Clawless Computer
                in violation of this policy (for example, redistributing
                license keys, exposing the app&apos;s services as a public
                product, or using it to violate someone&apos;s privacy),
                email{' '}
                <a
                  href="mailto:info@clawless.ai"
                  className="text-accent underline hover:text-text-primary"
                >
                  info@clawless.ai
                </a>{' '}
                with the subject line &quot;Acceptable Use Report&quot; and
                as much detail as you can provide. We investigate every
                credible report.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">
                  6. Consequences of violation
                </strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                We may suspend or revoke a license that we determine, in
                good faith, has been used in material violation of this
                policy. We may also report serious violations to the
                appropriate authorities. License revocation for cause does
                not entitle you to a refund.
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">7. Contact</strong>
              </p>
              <p className="mb-4 leading-[1.8]">
                Questions about this policy go to{' '}
                <a
                  href="mailto:info@clawless.ai"
                  className="text-accent underline hover:text-text-primary"
                >
                  info@clawless.ai
                </a>
                . Refund-related questions, including the relationship
                between this policy and a license revocation, are covered
                on the{' '}
                <a
                  href="/refunds"
                  className="text-accent underline hover:text-text-primary"
                >
                  refunds page
                </a>
                .
              </p>

              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Changelog</strong>
              </p>
              <ul className="ml-6 list-disc space-y-2 leading-[1.8]">
                <li>
                  <strong>2026-05-17:</strong> Initial publication. Names
                  the BYOK provider relationship explicitly: provider AUPs
                  apply to your prompts because the traffic goes directly
                  from your Mac to the provider without us in the path.
                  Replaces the forward-looking paragraph that previously
                  bundled acceptable-use posture into the{' '}
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
