import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { PageHead, Source } from '@/components/oss/Shell';
import { FEATURES, PRELAUNCH } from '@/components/oss/content';

export const metadata: Metadata = pageMetadata('/what-it-does/', {
  title: 'What it does',
  description:
    'What Clawless Computer does on your Mac: chat with major AI providers, a team of agents, memory, tools and MCP servers, skills, channels, scheduled automations, browser control and budget caps.',
});

export default function WhatItDoes() {
  return (
    <>
      <PageHead
        eyebrow="What it does"
        title="Everything the engine can do, behind an interface you do not have to configure by hand."
        lede={
          PRELAUNCH
            ? 'Each feature below is live in the first release and documented in the knowledge base that ships with the source. Each card names its chapter; the knowledge base is published with the source at launch.'
            : 'Each feature below is live in the first release and documented in the knowledge base that ships with the source. Follow any link to read the full chapter.'
        }
      />
      <section className="oss-wrap py-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <article key={f.key} className="oss-card flex flex-col justify-between p-6">
              <div>
                <span className="oss-mono text-[0.72rem] text-[var(--oss-accent)]">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="oss-h3 mt-3">{f.title}</h2>
                <p className="oss-body mt-2 !text-[0.95rem]">{f.body}</p>
              </div>
              <div className="mt-6">
                <Source path={f.doc} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
