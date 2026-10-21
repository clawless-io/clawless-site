import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, H2, Para, Mail } from '@/components/oss/LegalPage';
import { REPO } from '@/components/oss/content';

export const metadata: Metadata = {
  title: 'Support',
  description: 'How to get help with Clawless Computer: GitHub Issues for bugs and feature requests, email for questions, private reporting for security.',
};

/** DRAFT rewrite of the live /support page (which described refunds and the
 *  paid product). Sources: README.md, CONTRIBUTING.md, SECURITY.md, PRIVACY.md. */
export default function Support() {
  return (
    <LegalPage title="Support" updated="[set on launch day]">
      <Para>
        Clawless Computer is open source and maintained as energy allows. There is no support SLA and no roadmap commitment; issues and fixes
        from the community are what keep it moving.
      </Para>

      <H2>Bugs, features and questions</H2>
      <Para>
        Open an issue on GitHub using the matching form: Bug report, Feature request, or Question. For a bug, include the app version, your
        operating system, and the engine version, all shown in Settings, About.
      </Para>
      <a href={`${REPO}/issues/new/choose`} className="oss-btn oss-btn-primary mb-4">
        Open an issue on GitHub
      </a>

      <H2>Email</H2>
      <Para>
        For anything that does not fit an issue, write to <Mail to="support@clawless.ai" />.
      </Para>

      <H2>Security problems</H2>
      <Para>
        Please do not report a vulnerability in a public issue. Use private reporting as described in the{' '}
        <Link href="/preview/security/" className="oss-link">
          security policy
        </Link>
        , or email <Mail to="security@clawless.ai" />.
      </Para>

      <H2>Read first</H2>
      <Para>
        Most answers are in the{' '}
        <Link href="/preview/docs/" className="oss-link">
          documentation
        </Link>
        . Start with{' '}
        <Link href="/preview/docs/getting-started/" className="oss-link">
          Getting started
        </Link>
        .
      </Para>
    </LegalPage>
  );
}
