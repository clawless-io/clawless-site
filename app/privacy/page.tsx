import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description:
    'Clawless Computer privacy notice. This pre-launch site collects no visitor data beyond standard host-level metadata. RBJ Global LLC operates this site and the upcoming Clawless Computer desktop product.',
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
                This is the pre-launch website for{' '}
                <strong className="text-text-primary">Clawless Computer</strong>.
                It is an informational site only. We operate no analytics, no
                cookies, no tracking scripts, no email signup forms, and no
                user accounts on this site. We do not associate visits with
                any identity, and we do not log or analyze visitor traffic
                ourselves. The site is hosted on Cloudflare Pages, which, like
                any web host, processes connection metadata such as IP
                address, user agent, and request timestamp at the network edge
                for delivery, security, and abuse prevention. We do not
                access, retain, or analyze that data ourselves. Cloudflare&apos;s
                processing of that infrastructure data is governed by
                Cloudflare&apos;s own privacy documentation.
              </p>
              <p className="mb-4 leading-[1.8]">
                The site and the upcoming Clawless Computer product are
                operated by{' '}
                <strong className="text-text-primary">RBJ Global LLC</strong>,
                a United States limited liability company organized in the
                State of Texas, with a principal office at 5900 Balcones
                Drive, STE 100, Austin, TX 78731, USA. RBJ Global LLC is the
                controller of any personal information collected in connection
                with this site (today: none beyond infrastructure metadata
                held by our host) and will be the controller of personal
                information processed in connection with Clawless Computer
                licensing, payments, and customer support once the product
                launches. At launch, our payment processor (Lemon Squeezy,
                operated by Lemon Squeezy LLC) will act as a separate
                controller for checkout-stage personal and payment information
                under its own privacy policy.
              </p>
              <p className="mb-4 leading-[1.8]">
                We do not sell personal information, and we do not share
                personal information for cross-context behavioral advertising,
                as those terms are defined under the California Consumer
                Privacy Act. This statement applies to the marketing site
                today and to the Clawless Computer product at launch.
                California residents will have the right to know, delete,
                correct, and limit the use of their personal information once
                the product launches. The current site does not collect
                personal information from visitors, so there is nothing to
                know, delete, or correct here.
              </p>
              <p className="mb-4 leading-[1.8]">
                When the Clawless Computer product launches, this page will be
                replaced with a full privacy policy. That policy will describe
                (a) what the desktop application stores locally on your
                device, (b) the minimal license-validation data exchanged with
                our licensing server (expected to include a license key and
                an opaque device identifier, with no content of your work or
                prompts leaving your device by default), (c) the personal and
                payment information our payment processor (Lemon Squeezy)
                handles at checkout, (d) the support information you choose to
                share with us at support@clawless.ai, and (e) how to exercise
                rights of access, correction, deletion, export, and complaint.
              </p>
              <p className="mb-4 leading-[1.8]">
                Clawless Computer is intended for adult professional use. We
                do not knowingly collect personal information from children
                under 13, and we do not direct this site or the Clawless
                Computer product to children under 13. If you believe a child
                under 13 has provided personal information to us, contact{' '}
                <a
                  href="mailto:info@rbjglobal.com"
                  className="text-accent underline hover:text-text-primary"
                >
                  info@rbjglobal.com
                </a>{' '}
                and we will delete it.
              </p>
              <p className="mb-4 leading-[1.8]">
                This site is operated from the United States. If you access it
                from outside the United States, your connection is delivered by
                infrastructure located in the United States. We do not target
                users in the European Economic Area, the United Kingdom, or
                other regions where local data protection law would impose
                additional obligations on a service of this scope, and you are
                welcome to read this site from anywhere.
              </p>
              <p className="mb-4 leading-[1.8]">
                <strong className="text-text-primary">
                  Future changes to these practices.
                </strong>{' '}
                We currently collect no visitor data on this site. If our
                practices change in the future, we will update this policy with
                a new effective date and clear disclosure of what changed. In
                particular, if we ever add analytics or marketing measurement,
                we will update this policy first, deploy any consent mechanism
                required for your jurisdiction, and describe specifically what
                is collected and why. We commit to updating before changing,
                not after.
              </p>
              <p className="mb-4 leading-[1.8]">
                Until then there is nothing to disclose, because there is
                nothing being collected. For privacy questions, contact{' '}
                <a
                  href="mailto:info@rbjglobal.com"
                  className="text-accent underline hover:text-text-primary"
                >
                  info@rbjglobal.com
                </a>
                . For suspected security vulnerabilities affecting this site
                or the Clawless Computer product, contact{' '}
                <a
                  href="mailto:security@clawless.ai"
                  className="text-accent underline hover:text-text-primary"
                >
                  security@clawless.ai
                </a>
                . We aim to acknowledge security reports within two business
                days.
              </p>
              <p className="mb-2 mt-8 leading-[1.8]">
                <strong className="text-text-primary">Changelog</strong>
              </p>
              <ul className="ml-6 list-disc space-y-2 leading-[1.8]">
                <li>
                  <strong>2026-05-03</strong> — Senior-policy-reviewer audit
                  applied: Cloudflare edge-log acknowledgment, RBJ Global LLC
                  established as data controller today, Lemon Squeezy
                  pre-named as separate controller at checkout, CCPA stub,
                  COPPA statement, dedicated security-vulnerability contact
                  path, forward-looking PII categories enumerated. Non-material
                  clarifications.
                </li>
                <li>
                  <strong>2026-05-02</strong> — Forward-looking practices
                  paragraph added; jurisdiction line added; entity-of-record
                  paragraph names RBJ Global LLC; site reindexed at sitemap
                  priority 0.3; placeholder dates aligned to May 2026.
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
