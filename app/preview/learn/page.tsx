import type { Metadata } from 'next';
import { PageHead, Arrow } from '@/components/oss/Shell';

export const metadata: Metadata = { title: 'Learn' };

/** General link only. Do NOT deep-link specific Clawless lessons on Clawdemy:
 *  its Track 6 still cites knowledge-base wording ("closed source", "license
 *  server") that is being corrected before the countdown (Advisor, 2026-10-21). */
export default function Learn() {
  return (
    <>
      <PageHead
        eyebrow="Learn"
        title="Understand the ideas underneath the agents."
        lede="If you want to go deeper than the app, Clawdemy is a free online curriculum from the same family, covering machine learning and the mathematics behind it."
      />
      <section className="oss-wrap py-20">
        <a href="https://clawdemy.org/" className="oss-card group flex flex-col justify-between gap-8 p-8 md:flex-row md:items-center md:p-10">
          <div className="max-w-xl">
            <p className="oss-eyebrow">clawdemy.org</p>
            <p className="oss-h2 mt-3">Clawdemy</p>
            <p className="oss-body mt-3">Free to read, no account needed.</p>
          </div>
          <span className="oss-btn oss-btn-primary self-start md:self-center">
            Visit Clawdemy <Arrow />
          </span>
        </a>
      </section>
    </>
  );
}
