import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getContent } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'The page you are looking for does not exist on clawless.ai.',
};

export default function NotFound() {
  const cms = getContent();

  return (
    <div className="relative z-[1]">
      <Navbar content={cms.content.nav} />
      <main
        id="main-content"
        className="mx-auto max-w-[1200px] px-6 sm:px-8"
      >
        <section className="py-32 text-center sm:py-40">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.16em] text-text-muted">
            404
          </p>
          <h1 className="mb-6 text-[40px] font-extrabold leading-[1.1] tracking-[-0.02em] text-text-primary sm:text-[52px]">
            Page not found
          </h1>
          <p className="mx-auto mb-10 max-w-[560px] text-base leading-[1.7] text-text-secondary sm:text-lg">
            The page you are looking for does not exist on clawless.ai. The URL
            may be out of date, or the page may have moved as the site evolves
            toward launch.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-xl border border-border-light bg-bg-surface px-7 py-3 text-[15px] font-semibold text-text-primary transition-colors duration-200 hover:bg-bg-surface-hover"
            >
              Back to home
            </Link>
            <Link
              href="/docs/"
              className="text-[15px] font-medium text-accent transition-colors duration-200 hover:text-text-primary"
            >
              Browse documentation
            </Link>
          </div>
        </section>
      </main>
      <Footer content={cms.content.footer} />
    </div>
  );
}
