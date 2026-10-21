import type { Metadata } from 'next';
import { PageHead, Arrow } from '@/components/oss/Shell';
import { DOCS, blob, tree } from '@/components/oss/content';

export const metadata: Metadata = { title: 'Docs' };

export default function Docs() {
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
                  <a key={slug} href={blob(`docs/knowledge-base/${slug}.md`)} className="oss-card group block p-5 transition-transform hover:-translate-y-0.5">
                    <p className="font-semibold text-[var(--oss-ink)]">{title}</p>
                    <p className="oss-small mt-1">{desc}</p>
                    <span className="oss-mono mt-4 inline-flex items-center gap-1 text-[0.7rem] text-[var(--oss-muted)] group-hover:text-[var(--oss-accent)]">
                      {slug}.md <Arrow size={11} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <a href={tree('docs/knowledge-base')} className="oss-btn mt-14">
          Browse the knowledge base on GitHub <Arrow />
        </a>
      </section>
    </>
  );
}
