import type { Metadata } from 'next';
import Link from 'next/link';
import OssMarkdown from '@/components/oss/OssMarkdown';
import { DocHeader, SourceNote } from '@/components/oss/DocChrome';
import { Arrow } from '@/components/oss/Shell';
import AtLaunchNotice from '@/components/oss/AtLaunchNotice';
import { DOCS, PRELAUNCH } from '@/components/oss/content';
import { getKb, kbSlugs, source } from '@/lib/oss-docs';

const P = '/preview';
type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return kbSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  if (PRELAUNCH) return { title: 'Docs', description: 'The Clawless Computer documentation is published with the source at launch.' };
  const { slug } = await params;
  const d = getKb(slug);
  return { title: d.title, description: d.description };
}

/** Reading order as the knowledge base README groups it. */
const ORDER = DOCS.flatMap((g) => g.items.map(([slug, title]) => ({ slug, title, group: g.group })));

export default async function KbChapter({ params }: { params: Promise<Params> }) {
  // Routes stay generated (generateStaticParams above) so launch day is a flag flip;
  // before launch every chapter URL renders the same short notice.
  if (PRELAUNCH)
    return (
      <AtLaunchNotice
        eyebrow="Docs"
        title="The documentation is published with the source at launch."
        lede="The knowledge base lives in the repository next to the code it describes, and goes public on launch day."
      />
    );
  const { slug } = await params;
  const d = getKb(slug);
  const { commit } = source();
  const i = ORDER.findIndex((o) => o.slug === slug);
  const prev = i > 0 ? ORDER[i - 1] : null;
  const next = i >= 0 && i < ORDER.length - 1 ? ORDER[i + 1] : null;

  return (
    <div className="oss-wrap grid gap-12 py-12 lg:grid-cols-[230px_1fr]">
      <aside className="hidden lg:block">
        <nav aria-label="Knowledge base" className="sticky top-24 space-y-6">
          {DOCS.map((g) => (
            <div key={g.group}>
              <p className="oss-eyebrow !text-[0.66rem] !text-[var(--oss-muted)]">{g.group}</p>
              <ul className="mt-2 space-y-0.5">
                {g.items.map(([s, title]) => (
                  <li key={s}>
                    <Link
                      href={`${P}/docs/${s}/`}
                      className={
                        'block rounded-md px-2.5 py-1.5 text-[0.86rem] transition-colors ' +
                        (s === slug ? 'bg-[var(--oss-surface-2)] font-medium text-[var(--oss-ink)]' : 'text-[var(--oss-muted)] hover:text-[var(--oss-ink)]')
                      }
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <article className="min-w-0 max-w-[760px]">
        <DocHeader crumbs={[['Docs', `${P}/docs/`], [d.title]]} file={`docs/knowledge-base/${slug}.md`} commit={commit} />
        <div className="mt-8">
          <OssMarkdown source={d.body} />
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link href={`${P}/docs/${prev.slug}/`} className="oss-card block p-4 hover:border-[var(--oss-line-strong)]">
              <span className="oss-small !text-[0.72rem]">Previous</span>
              <p className="font-semibold text-[var(--oss-ink)]">{prev.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`${P}/docs/${next.slug}/`} className="oss-card block p-4 text-right hover:border-[var(--oss-line-strong)]">
              <span className="oss-small !text-[0.72rem]">Next</span>
              <p className="inline-flex items-center gap-1.5 font-semibold text-[var(--oss-ink)]">
                {next.title} <Arrow size={12} />
              </p>
            </Link>
          )}
        </div>
        <SourceNote file={`docs/knowledge-base/${slug}.md`} />
      </article>
    </div>
  );
}
