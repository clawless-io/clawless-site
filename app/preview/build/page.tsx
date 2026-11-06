import type { Metadata } from 'next';
import Link from 'next/link';
import { P, PageHead, Source, Arrow } from '@/components/oss/Shell';
import { RepoLink } from '@/components/oss/RepoLink';
import { CODE_MAP, EXTENSION_POINTS, PRELAUNCH, REPO, RISK_TIERS, blob, tree } from '@/components/oss/content';

export const metadata: Metadata = { title: 'Build on it' };

const STEPS = [
  ['Fork and branch', 'Fork the repository and create a branch for your change.'],
  ['Change, with tests', 'Make your change, with tests for any new behavior.'],
  ['Check locally', 'Run bun run typecheck and bun run test:unit.'],
  ['Open a pull request', 'Open it against main. CI runs on every pull request.'],
  ['Sign the CLA', 'Once, when the CLA bot asks, by posting the signing statement as a comment.'],
  ['Review', 'Depth is proportional to risk. Pull requests are welcome, with no promises about timing or acceptance.'],
];

export default function Build() {
  return (
    <>
      <PageHead
        eyebrow="Build on it"
        title={PRELAUNCH ? "The code will be open, organized, and documented. Here is how you will find your way in." : "The code is open, organized, and documented. Here is how to find your way in."}
        lede="Clone it, build it, change it. Clawless Computer is maintained as energy allows, so the most useful thing you can bring is a working change with tests."
      />

      <section className="oss-wrap grid gap-10 py-20 lg:grid-cols-2">
        <div>
          <p className="oss-eyebrow">Set up</p>
          <h2 className="oss-h2 mt-4">Five commands.</h2>
          <p className="oss-body mt-4">
            You need Bun, Node.js 24.16 or newer, and Git. macOS on Apple silicon is the primary development platform today. Install also applies a small set of
            compatibility patches to the bundled engine.
          </p>
          <div className="mt-4">
            <Source path="README.md" />
          </div>
        </div>
        <pre className="oss-pre self-start">
          <span className="text-[var(--oss-muted)]"># clone and run{PRELAUNCH && ', available at launch'}</span>
          {'\n'}git clone {PRELAUNCH ? '<repository URL, published at launch>' : `${REPO}.git`}{'\n'}cd clawless-computer{'\n'}bun install{'\n'}bun run build{'\n'}bun run start{'\n\n'}
          <span className="text-[var(--oss-muted)]"># before a pull request</span>
          {'\n'}bun run typecheck{'\n'}bun run test:unit
        </pre>
      </section>

      <section className="border-y border-[var(--oss-line)] bg-[var(--oss-surface-2)]">
        <div className="oss-wrap py-20">
          <p className="oss-eyebrow">Code tour</p>
          <h2 className="oss-h2 mt-4 max-w-2xl">Where things live.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {CODE_MAP.map((c) => (
              <RepoLink key={c.path} href={tree(c.path)} mark={false} className="oss-card block p-6 transition-transform hover:-translate-y-0.5">
                <p className="oss-mono text-[0.95rem] font-semibold text-[var(--oss-accent)]">{c.path}</p>
                <p className="oss-body mt-2 !text-[0.95rem]">{c.role}</p>
              </RepoLink>
            ))}
          </div>
          <p className="oss-body mt-6 max-w-2xl">
            One rule shapes the whole tree: every engine call goes through the single gateway bridge.
          </p>
          <div className="mt-3">
            <Source path="CONTRIBUTING.md" />
          </div>
        </div>
      </section>

      <section className="oss-wrap py-20">
        <p className="oss-eyebrow">Extension points</p>
        <h2 className="oss-h2 mt-4 max-w-2xl">Places to start.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {EXTENSION_POINTS.map((e) => (
            <div key={e.title} className="oss-card flex flex-col justify-between p-6">
              <div>
                <h3 className="oss-h3">{e.title}</h3>
                <p className="oss-body mt-2 !text-[0.95rem]">{e.body}</p>
              </div>
              <div className="mt-5">
                <Source path={e.source} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="oss-wrap grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="oss-eyebrow">From change to merge</p>
          <h2 className="oss-h2 mt-4">How a pull request lands.</h2>
          <p className="oss-body mt-4">
            Merging is not releasing. Merged code reaches people who download the app only when a maintainer cuts a signed, tagged release.
          </p>
          <div className="mt-4">
            <Source path="CONTRIBUTING.md" />
          </div>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-[var(--oss-line)] bg-[var(--oss-line)]">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="flex gap-4 bg-[var(--oss-surface)] p-5">
              <span className="oss-mono mt-0.5 text-[0.72rem] text-[var(--oss-accent)]">0{i + 1}</span>
              <div>
                <p className="font-semibold text-[var(--oss-ink)]">{t}</p>
                <p className="oss-small mt-1">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-[var(--oss-line)]">
        <div className="oss-wrap py-20">
          <p className="oss-eyebrow">Review, by risk</p>
          <h2 className="oss-h2 mt-4 max-w-2xl">Review depth matches what a change touches.</h2>
          <div className="oss-card mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--oss-line)] text-[var(--oss-muted)]">
                  <th className="px-5 py-3 font-medium">Tier</th>
                  <th className="px-5 py-3 font-medium">What it touches</th>
                  <th className="px-5 py-3 font-medium">Review</th>
                </tr>
              </thead>
              <tbody>
                {RISK_TIERS.map((r) => (
                  <tr key={r.tier} className="border-b border-[var(--oss-line)] last:border-0">
                    <td className="oss-mono px-5 py-4 font-semibold text-[var(--oss-accent)]">{r.tier}</td>
                    <td className="px-5 py-4 text-[var(--oss-ink-2)]">{r.touches}</td>
                    <td className="px-5 py-4 text-[var(--oss-ink-2)]">{r.review}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="oss-card p-6">
              <h3 className="oss-h3">AI-assisted review</h3>
              <p className="oss-body mt-2 !text-[0.95rem]">
                AI agents operated by the maintainers summarize changes, classify risk and may comment. They cannot merge. A person makes every
                merge decision.
              </p>
            </div>
            <div className="oss-card p-6">
              <h3 className="oss-h3">Privacy is a merge rule</h3>
              <p className="oss-body mt-2 !text-[0.95rem]">
                Pull requests that add telemetry, analytics or crash reporting will not be merged.
              </p>
            </div>
            <div className="oss-card p-6">
              <h3 className="oss-h3">Contributor License Agreement</h3>
              <p className="oss-body mt-2 !text-[0.95rem]">
                Every contributor signs the CLA once, before a first pull request can be merged. Read it before you start.
              </p>
              {PRELAUNCH ? (
                <p className="oss-small mt-3">CLA.md is published with the source at launch.</p>
              ) : (
                <a href={blob('CLA.md')} className="oss-link mt-3 inline-flex items-center gap-1 text-sm">
                  CLA.md <Arrow size={12} />
                </a>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Source path="CONTRIBUTING.md" />
          </div>
          <p className="oss-small mt-8">
            Found a security issue? Please do not open a public issue. Report it privately; see{' '}
            {PRELAUNCH ? (
              <Link href={`${P}/trust/`} className="oss-link">
                Security and trust
              </Link>
            ) : (
              <a href={blob('SECURITY.md')} className="oss-link">
                SECURITY.md
              </a>
            )}
            .
          </p>
        </div>
      </section>
    </>
  );
}
