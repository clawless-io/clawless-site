import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { LegalPage, H2, Para, Mail } from '@/components/oss/LegalPage';
import { PRELAUNCH, REPO } from '@/components/oss/content';
import { PUBLICATION_DATE } from '@/components/oss/legal-dates';

export const metadata: Metadata = {
  ...pageMetadata('/support/', {
    title: 'Support',
    description: PRELAUNCH
      ? 'How to get help with Clawless Computer: email for questions now, GitHub Issues for bugs and feature requests at launch, and private reporting for security.'
      : 'How to get help with Clawless Computer: GitHub Issues for bugs and feature requests, email for questions, private reporting for security.',
  }),
};

/** Rewrite of the previous /support page (which described refunds and the
 *  paid product). Sources: README.md, CONTRIBUTING.md, SECURITY.md, PRIVACY.md.
 *  PRELAUNCH: no links into the repository, /security or /docs (none are
 *  public until launch); the issue forms are described in the future tense. */
export default function Support() {
  return (
    <LegalPage title="Support" updated={PUBLICATION_DATE}>
      <Para>
        {PRELAUNCH
          ? 'Clawless Computer will be open source and maintained as energy allows. There is no support SLA and no roadmap commitment; issues and fixes from the community are what will keep it moving.'
          : 'Clawless Computer is open source and maintained as energy allows. There is no support SLA and no roadmap commitment; issues and fixes from the community are what keep it moving.'}
      </Para>

      <H2>Bugs, features and questions</H2>
      {PRELAUNCH ? (
        <Para>
          GitHub Issues forms open at launch: Bug report, Feature request, and Question. For a bug, you will be asked for the app version,
          your operating system, and the engine version, all shown in Settings, About.
        </Para>
      ) : (
        <>
          <Para>
            Open an issue on GitHub using the matching form: Bug report, Feature request, or Question. For a bug, include the app version,
            your operating system, and the engine version, all shown in Settings, About.
          </Para>
          <a href={`${REPO}/issues/new/choose`} className="oss-btn oss-btn-primary mb-4">
            Open an issue on GitHub
          </a>
        </>
      )}

      <H2>Email</H2>
      <Para>
        {PRELAUNCH ? 'For questions, write to ' : 'For anything that does not fit an issue, write to '}
        <Mail to="support@clawless.ai" />.
      </Para>

      <H2>Security problems</H2>
      {PRELAUNCH ? (
        <Para>
          Please do not report a vulnerability in public. Email <Mail to="security@clawless.ai" />. The security policy, with GitHub&apos;s
          private reporting, is published with the source at launch.
        </Para>
      ) : (
        <Para>
          Please do not report a vulnerability in a public issue. Use private reporting as described in the{' '}
          <Link href="/security/" className="oss-link">
            security policy
          </Link>
          , or email <Mail to="security@clawless.ai" />.
        </Para>
      )}

      <H2>Read first</H2>
      {PRELAUNCH ? (
        <Para>The documentation is published with the source at launch.</Para>
      ) : (
        <Para>
          Most answers are in the{' '}
          <Link href="/docs/" className="oss-link">
            documentation
          </Link>
          . Start with{' '}
          <Link href="/docs/getting-started/" className="oss-link">
            Getting started
          </Link>
          .
        </Para>
      )}
    </LegalPage>
  );
}
