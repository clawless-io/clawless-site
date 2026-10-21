import type { Metadata } from 'next';
import Link from 'next/link';
import Mark from '@/components/oss/Mark';
import { P, PageHead, Source, Arrow, GitHubIcon } from '@/components/oss/Shell';
import { APP_VERSION, ENGINE_VERSION, RELEASES, REPO, blob } from '@/components/oss/content';

export const metadata: Metadata = { title: 'Download' };

export default function Download() {
  return (
    <>
      <PageHead
        eyebrow="Download"
        title="Clawless Computer for Mac."
        lede="Free and open source. Downloads come from the project's GitHub Releases page, so the build you install is the one anyone can inspect."
      />
      <section className="oss-wrap grid gap-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="oss-card p-8">
          <div className="flex items-center gap-4">
            <Mark size={64} />
            <div>
              <p className="oss-display text-2xl font-semibold">Clawless Computer {APP_VERSION}</p>
              <p className="oss-small">macOS on Apple silicon · signed and notarized</p>
            </div>
          </div>
          <a href={RELEASES} className="oss-btn oss-btn-primary mt-8 w-full justify-center !py-3.5 text-base">
            <GitHubIcon /> Download from GitHub Releases
          </a>
          <p className="oss-small mt-5 text-center">
            Provided as is under the AGPL-3.0, without warranty.{' '}
            <a href={blob('LICENSE')} className="oss-link">
              Read the license
            </a>
            .
          </p>
          <hr className="oss-rule my-8" />
          <dl className="grid gap-5 sm:grid-cols-2">
            {[
              ['You will need', 'A Mac with Apple silicon, and a key from an AI provider you choose. A local model works too.'],
              ['No sign-up', 'There is no Clawless account. No email, no card.'],
              ['Engine', `OpenClaw ${ENGINE_VERSION} is bundled and version-pinned. Nothing extra to install.`],
              ['Updates', 'Check from Settings. Automatic checks are off until you turn them on.'],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="font-semibold text-[var(--oss-ink)]">{t}</dt>
                <dd className="oss-small mt-1">{d}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
            <Source path="README.md" />
            <Source path="PRIVACY.md" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="oss-card p-7">
            <p className="oss-eyebrow">Prefer to build it yourself</p>
            <h2 className="oss-h3 mt-3">Build from source</h2>
            <p className="oss-body mt-2 !text-[0.95rem]">
              Packaging locally produces an unsigned app unless you supply your own Apple signing identity and notarization credentials.
            </p>
            <pre className="oss-pre mt-4 text-[0.8rem]">
              git clone {REPO}.git{'\n'}cd clawless-computer && bun install{'\n'}bun run build && bun run start
            </pre>
            <Link href={`${P}/build/`} className="oss-link mt-4 inline-flex items-center gap-1 text-sm">
              Full setup guide <Arrow size={12} />
            </Link>
          </div>
          <div className="oss-card p-7">
            <p className="oss-eyebrow">First launch</p>
            <h2 className="oss-h3 mt-3">From install to first message</h2>
            <p className="oss-body mt-2 !text-[0.95rem]">
              Onboarding walks you through adding a provider key, picking your first agent and sending a message.
            </p>
            <div className="mt-4">
              <Source path="docs/knowledge-base/getting-started.md" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
