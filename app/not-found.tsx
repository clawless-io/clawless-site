import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/oss/Shell';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist on clawless.ai.',
};

/** Renders inside the root layout, so the site's own header and footer frame it. */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--oss-line)]">
      <div className="oss-glow" />
      <div className="oss-grid-bg pointer-events-none absolute inset-0" />
      <div className="oss-wrap relative py-28 md:py-36">
        <p className="oss-eyebrow">404</p>
        <h1 className="oss-h2 mt-4 max-w-3xl">Page not found</h1>
        <p className="oss-lede mt-5 max-w-2xl">
          The page you are looking for does not exist on clawless.ai. The address may be out of date, or the page may have moved.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href="/" className="oss-btn oss-btn-primary">
            Back to home <Arrow />
          </Link>
          <Link href="/what-it-does/" className="oss-btn">
            See what it does
          </Link>
        </div>
      </div>
    </section>
  );
}
