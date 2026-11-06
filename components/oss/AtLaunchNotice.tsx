import Link from 'next/link';
import { PageHead, Arrow } from './Shell';

/**
 * Stand-in page for repository-backed pages (docs, project documents) while
 * PRELAUNCH is true. One short page, no chapter list, no links into the repo.
 */
export default function AtLaunchNotice({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  return (
    <>
      <PageHead eyebrow={eyebrow} title={title} lede={lede} />
      <section className="oss-wrap py-20">
        <Link href={`/what-it-does/`} className="oss-btn">
          See what it does <Arrow />
        </Link>
      </section>
    </>
  );
}
