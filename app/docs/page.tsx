import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { PageHead, Arrow } from '@/components/oss/Shell';
import AtLaunchNotice from '@/components/oss/AtLaunchNotice';
import { DOCS, PRELAUNCH, tree } from '@/components/oss/content';

/** Before launch this is a one-line notice: noindex,follow and out of the sitemap. */
export const metadata: Metadata = {
  ...pageMetadata('/docs/', {
    title: 'Docs',
    description: PRELAUNCH
      ? 'The Clawless Computer knowledge base lives in the repository next to the code it describes, and is published with the source at launch.'
      : 'The Clawless Computer knowledge base, written for people who use the app, with one chapter per feature.',
  }),
  ...(PRELAUNCH ? { robots: { index: false, follow: true } } : {}),
};

export default function Docs() {
  if (PRELAUNCH)
    return (
      <AtLaunchNotice
        eyebrow="Docs"
        title="The documentation is published with the source at launch."
        lede="The knowledge base lives in the repository next to the code it describes, and goes public on launch day."
      />
    );
  return (
    <>
      <PageHead
        eyebrow="Docs"
        title="The knowledge base, written for people who use the app."
        lede="Every chapter lives in the repository next to the code it describes, and changes to the app update the matching chapter in the same pull request."
      />
      <section className="oss-wrap py-20">
        <div className="grid gap-12">
          {DOCS.map((g) => (
            <div key={g.group}>
              <p className="oss-eyebrow">{g.group}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {g.items.map(([slug, title, desc]) => (
                  <Link key={slug} href={`/docs/${slug}/`} className="oss-card group block p-5 transition-transform hover:-translate-y-0.5">
                    <p className="font-semibold text-[var(--oss-ink)]">{title}</p>
                    <p className="oss-small mt-1">{desc}</p>
                    <span className="oss-mono mt-4 inline-flex items-center gap-1 text-[0.7rem] text-[var(--oss-muted)] group-hover:text-[var(--oss-accent)]">
                      Read <Arrow size={11} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <a href={tree('docs/knowledge-base')} className="oss-btn mt-14">
          View the knowledge base on GitHub <Arrow />
        </a>
      </section>
    </>
  );
}
