import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectDocPage from '@/components/oss/ProjectDocPage';

export const metadata: Metadata = {
  title: 'App privacy',
  description: 'What the Clawless Computer app stores on your computer and every network connection it makes, in plain language.',
  robots: { index: false, follow: true },
};

export default function Page() {
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
