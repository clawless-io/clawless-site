import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, H2, Para, Mail } from '@/components/oss/LegalPage';

export const metadata: Metadata = {
  title: 'Website privacy',
  description:
    'Privacy notice for the clawless.ai website. One cookieless visit counter, no cookies, no forms, no accounts. The Clawless Computer app has its own notice.',
  robots: { index: false, follow: true },
};

/**
 * WEBSITE privacy notice, DRAFT redline of the live app/privacy/page.tsx for
 * the open-source launch. Scope is the website only; the app's notice is the
 * repository's PRIVACY.md, rendered verbatim at /privacy/app/.
 *
 * Carried forward (still true): controller paragraph, Cloudflare edge-log
 * acknowledgment, no-sale CCPA statement, children, jurisdiction, the
 * update-before-changing commitment, and the full changelog history.
 *
 * Removed (false for a free AGPL app): Lemon Squeezy as separate controller,
 * the licensing server and device identifier, future paid-product rights
 * language, and the in-app issue-reporting endpoint (the open-source app's
 * Report button opens a draft email in the user's own client: PRIVACY.md and
 * IssueLogModal.tsx).
 *
 * Added (verified 2026-10-21): Google Workspace as email provider (MX records
 * for clawless.ai and rbjglobal.com both resolve to aspmx.l.google.com), and the
 * GitHub Releases download path.
 *
 * Changed: the live notice promised to acknowledge security reports "within two
 * business days"; SECURITY.md says no fixed response time can be promised, so
 * this follows SECURITY.md.
 *
 * Dropped pending a ruling: the LinkedIn-link paragraph. The redesign has no
 * LinkedIn link; restore the paragraph if one is added.
 */
export default function WebsitePrivacy() {
  return (
    <LegalPage title="Website privacy" updated="[set on launch day]">
      <Para>
        This notice covers the clawless.ai website. The Clawless Computer app is described in its own notice,{' '}
        <Link href="/preview/privacy/app/" className="oss-link">
          app privacy
        </Link>
        , which is published from the project&apos;s source repository.
      </Para>

      <H2>What this website collects</H2>
      <Para>
        We use one privacy-first, cookieless analytics counter (Cloudflare Web Analytics, provided by our host) to see how many people
        visit and which pages are read. It counts page views in aggregate and records general, non-identifying information such as the
        referring website, approximate country, and browser and device type. It sets no cookies, does not associate visits with any
        identity, and does not track you across other sites.
      </Para>
      <Para>We run no advertising or behavioral tracking scripts, no forms, and no user accounts on this site.</Para>

      <H2>Hosting</H2>
      <Para>
        The site is hosted on Cloudflare Pages, which, like any web host, processes connection metadata such as IP address, user agent, and
        request timestamp at the network edge for delivery, security, and abuse prevention. We do not access, retain, or analyze that edge
        data ourselves. Cloudflare&apos;s processing of that infrastructure data is governed by Cloudflare&apos;s own privacy documentation.
      </Para>

      <H2>Downloads and source code</H2>
      <Para>
        Downloads of Clawless Computer, and links to its source code, take you to GitHub. Once you are on GitHub, GitHub&apos;s own privacy
        practices apply.
      </Para>

      <H2>Email</H2>
      <Para>
        If you write to us, for example at <Mail to="support@clawless.ai" />, we receive your message and the address you send it from. Our
        email is hosted by Google Workspace. We use your message only to respond to you, and you can ask us to delete it at any time.
      </Para>

      <H2>Who we are</H2>
      <Para>
        This site is operated by RBJ Global LLC, a United States limited liability company organized in the State of Texas. RBJ Global LLC is
        the controller of any personal information collected in connection with this site, which is limited to the infrastructure metadata
        held by our host and any email you choose to send us.
      </Para>
      <Para>The service providers that support this site are Cloudflare, for hosting and the visit counter, and Google, for email.</Para>

      <H2>California</H2>
      <Para>
        We do not sell personal information, and we do not share personal information for cross-context behavioral advertising, as those
        terms are defined under the California Consumer Privacy Act.
      </Para>

      <H2>Children</H2>
      <Para>
        We do not knowingly collect personal information from children under 13, and we do not direct this site to children under 13. If you
        believe a child under 13 has provided personal information to us, contact <Mail to="info@rbjglobal.com" /> and we will delete it.
      </Para>

      <H2>Where this site operates from</H2>
      <Para>
        This site is operated from the United States. If you access it from outside the United States, your connection is delivered by
        infrastructure located in the United States. We do not target users in the European Economic Area, the United Kingdom, or other
        regions where local data protection law would impose additional obligations on a service of this scope, and you are welcome to read
        this site from anywhere.
      </Para>

      <H2>Changes to this notice</H2>
      <Para>
        If our practices change, we will update this notice with a new date and a clear description of what changed. In particular, if we ever
        add anything that collects personal data or tracks individuals, we will update this notice first, deploy any consent mechanism
        required for your jurisdiction, and describe specifically what is collected and why. We commit to updating before changing, not
        after.
      </Para>

      <H2>Contact</H2>
      <Para>
        For privacy questions, contact <Mail to="info@rbjglobal.com" />. To report a security vulnerability, please use private reporting as
        described in our{' '}
        <Link href="/preview/security/" className="oss-link">
          security policy
        </Link>
        , or email <Mail to="security@clawless.ai" />.
      </Para>

      <H2>Changelog</H2>
      <ul className="ml-5 list-disc space-y-3 text-[0.95rem] leading-[1.75] text-[var(--oss-ink-2)]">
        <li>
          <strong className="text-[var(--oss-ink)]">[Launch day]:</strong> MATERIAL CHANGE. Clawless Computer is released as free, open
          source software under the AGPL-3.0. This notice now covers the website only; the app&apos;s notice is published from the source
          repository. Removed: the payment processor at checkout, the licensing server, and in-app issue reporting through this domain. The
          open-source app&apos;s Report button instead opens a draft email in your own email client. Added: Google Workspace named as our email
          provider. Security reports now follow the security policy, which does not promise a fixed response time.
        </li>
        <li>
          <strong className="text-[var(--oss-ink)]">2026-09-18:</strong> Clawless Computer gains user-initiated issue reporting through an
          endpoint on this domain, filed at GitHub and emailed through Resend. Superseded on launch day.
        </li>
        <li>
          <strong className="text-[var(--oss-ink)]">2026-05-12:</strong> Added a disclosure for the Follow-on-LinkedIn link.
        </li>
        <li>
          <strong className="text-[var(--oss-ink)]">2026-05-05:</strong> Cross-link to the subprocessors list added. Principal-office street
          address removed; entity name, state of formation, and email contact retained.
        </li>
        <li>
          <strong className="text-[var(--oss-ink)]">2026-05-03:</strong> Browser Automation disclosure added. Cloudflare edge-log
          acknowledgment, controller statement, CCPA statement, children statement and a security contact added.
        </li>
        <li>
          <strong className="text-[var(--oss-ink)]">2026-05-02:</strong> Forward-looking practices, jurisdiction and entity-of-record
          paragraphs added.
        </li>
      </ul>
    </LegalPage>
  );
}
