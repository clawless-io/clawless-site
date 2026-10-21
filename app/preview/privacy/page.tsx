import type { Metadata } from 'next';
import ProjectDocPage from '@/components/oss/ProjectDocPage';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What the Clawless Computer app stores on your computer and every network connection it makes, in plain language.',
  robots: { index: false, follow: true },
};

/**
 * The repository's PRIVACY.md describes the APP. This website separately runs a
 * cookieless visit counter, so the page states its scope first, using the
 * disclosure sentence already approved for the footer rather than new legal copy.
 * Which notice governs the WEBSITE at launch is an open decision (see the review
 * flag below and the note to Founder Advisor).
 */
export default function Page() {
  return (
    <ProjectDocPage
      slug="privacy"
      preface={
        <div className="space-y-3">
          <div className="oss-card p-5">
            <p className="oss-eyebrow">Scope</p>
            <p className="oss-body mt-2 !text-[0.95rem]">
              This policy covers the Clawless Computer app. This website counts visits with one cookieless, privacy-first counter. The app
              itself has no telemetry.
            </p>
          </div>
          <p className="oss-small flex flex-wrap items-center gap-2">
            <span className="oss-unverified">Review only</span>
            The website&apos;s own privacy notice for launch is a pending decision.
          </p>
        </div>
      }
    />
  );
}
