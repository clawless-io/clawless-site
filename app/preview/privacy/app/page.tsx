import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectDocPage from '@/components/oss/ProjectDocPage';
import { PRELAUNCH } from '@/components/oss/content';

export const metadata: Metadata = {
  title: 'App privacy',
  description: PRELAUNCH
    ? 'The Clawless Computer app privacy notice is published with the source at launch.'
    : 'What the Clawless Computer app stores on your computer and every network connection it makes, in plain language.',
  robots: { index: false, follow: true },
};

/** PRELAUNCH: the repository (and its PRIVACY.md) is not public yet, so this
 *  route renders a short notice instead of the verbatim document. Nothing links
 *  here until launch. */
export default function Page() {
  if (PRELAUNCH) {
    return (
      <div className="oss-wrap py-12">
        <article className="mx-auto max-w-[760px]">
          <h1 className="oss-h2">App privacy</h1>
          <p className="oss-body mt-6">The Clawless Computer app privacy notice is published with the source at launch.</p>
          <p className="oss-body mt-4">
            This website has its own notice:{' '}
            <Link href="/preview/privacy/" className="oss-link">
              website privacy
            </Link>
            .
          </p>
        </article>
      </div>
    );
  }
  return (
    <ProjectDocPage
      slug="privacy"
      preface={
        <div className="oss-card p-5">
          <p className="oss-eyebrow">Scope</p>
          <p className="oss-body mt-2 !text-[0.95rem]">
            This notice covers the Clawless Computer app. This website has its own notice:{' '}
            <Link href="/preview/privacy/" className="oss-link">
              website privacy
            </Link>
            .
          </p>
        </div>
      }
    />
  );
}
