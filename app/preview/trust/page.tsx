import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, H2, Para, Mail } from '@/components/oss/LegalPage';
import { Source } from '@/components/oss/Shell';
import { RELEASES } from '@/components/oss/content';

export const metadata: Metadata = {
  title: 'Security and trust',
  description: 'How Clawless Computer is built to be checked: open source, signed releases, a security layer that treats agent output as untrusted, and private vulnerability reporting.',
  robots: { index: false, follow: true },
};

/** DRAFT rewrite of the live /trust page (which described license keys and the
 *  paid product). Every statement cites the public file that backs it.
 *  "Notarized" is verified on the actual release artifact before launch. */
export default function Trust() {
  return (
    <LegalPage title="Security and trust" updated="[set on launch day]">
      <Para>
        Clawless Computer is open source, so you do not have to take our word for anything here. Each section points at the code or document
        that backs it.
      </Para>

      <H2>The source is public</H2>
      <Para>
        The app is free software under the GNU Affero General Public License v3. Anyone can read every line, build it themselves, and propose
        changes. The engine it runs, OpenClaw, is a separate open source project under the MIT license.
      </Para>
      <Source path="docs/knowledge-base/whats-under-the-hood.md" />

      <H2>Signed releases</H2>
      <Para>
        Official builds are signed and notarized for macOS and published on the project&apos;s{' '}
        <a href={RELEASES} className="oss-link">
          GitHub Releases
        </a>{' '}
        page. Building from source produces an unsigned app unless you supply your own signing identity.
      </Para>
      <Source path="README.md" />

      <H2>Agent output is treated as untrusted</H2>
      <Para>
        A tool approval that times out is denied, not allowed. File paths an agent produces are validated before anything is rendered, and
        content an agent writes is scanned before it is saved or run. Skills pass up to three checks before install: the engine&apos;s
        manifest validation, a local pattern scanner that is always on, and optional VirusTotal scanning with your own key.{' '}
        <Link href="/preview/architecture/" className="oss-link">
          See the architecture
        </Link>
        .
      </Para>
      <Source path="src/main/services/ApprovalPolicyOverride.ts" />

      <H2>Nothing leaves your Mac that you did not send</H2>
      <Para>
        The app adds no telemetry, analytics, or crash reporting, and pull requests that add any of these will not be merged. The engine is
        reached only on your own machine. The complete list of network connections is in the{' '}
        <Link href="/preview/privacy/app/" className="oss-link">
          app privacy notice
        </Link>
        .
      </Para>
      <Source path="CONTRIBUTING.md" />

      <H2>Every change is reviewed by risk</H2>
      <Para>
        Pull requests are reviewed with depth proportional to what they touch, and changes to the main process, IPC handlers, or any network
        endpoint get a security pass. AI agents operated by the maintainers help pre-review; they can comment and label, and a person makes
        every merge decision.
      </Para>
      <Source path="CONTRIBUTING.md" />

      <H2>Reporting a vulnerability</H2>
      <Para>
        Please do not open a public issue. Use GitHub&apos;s private vulnerability reporting from the repository&apos;s Security tab, or email{' '}
        <Mail to="security@clawless.ai" /> with &quot;Clawless security&quot; in the subject. Security reports are prioritized over other work,
        though as the project is maintained as energy allows we cannot promise a fixed response time. Fixes ship in the next signed release;
        older releases are not patched.{' '}
        <Link href="/preview/security/" className="oss-link">
          Read the security policy
        </Link>
        .
      </Para>
      <Source path="SECURITY.md" />

      <H2>What you are trusting, and to whom</H2>
      <Para>
        You trust us to ship an app that does what it claims and protects your local data. You trust your AI provider with the contents of
        your messages. You trust OpenClaw to be a faithful engine, which you can audit. And you trust any tool or skill you install with the
        permissions it asks for.
      </Para>
      <Source path="docs/knowledge-base/whats-under-the-hood.md" />
    </LegalPage>
  );
}
