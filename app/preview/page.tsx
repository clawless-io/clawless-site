import Link from 'next/link';
import Mark from '@/components/oss/Mark';
import Countdown from '@/components/oss/Countdown';
import { P, Arrow, GitHubIcon, Source } from '@/components/oss/Shell';
import { APP_VERSION, ENGINE_VERSION, FACTS, PRELAUNCH, REPO, SEND_PATH, SEND_PATH_SOURCE, blob } from '@/components/oss/content';
import { ComingSoon } from '@/components/oss/RepoLink';

export default function PreviewHome() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="oss-glow" />
        <div className="oss-grid-bg pointer-events-none absolute inset-0" />
        <div className="oss-wrap relative grid items-center gap-14 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="oss-pill">
              <span className="oss-dot" />
              Open source under AGPL-3.0{!PRELAUNCH && <span className="text-[var(--oss-muted)]"> · v{APP_VERSION}</span>}
            </span>
            <h1 className="oss-h1 mt-7">
              Run AI agents on your own Mac, with your own keys.
            </h1>
            <p className="oss-lede mt-7 max-w-xl">
              Clawless Computer is a desktop home for OpenClaw, the open source AI agent engine. Chat with any major provider, keep a team of
              agents, and automate real work, all without a terminal.{' '}
              {PRELAUNCH ? 'It is free, and every line will be on GitHub at launch.' : 'It is free, and every line is on GitHub.'}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {PRELAUNCH ? (
                <>
                  <ComingSoon className="oss-btn oss-btn-primary" />
                  <span className="inline-flex items-center gap-2 px-2 text-sm text-[var(--oss-muted)]">
                    <GitHubIcon /> Source on GitHub at launch
                  </span>
                </>
              ) : (
                <>
                  <Link href={`${P}/download/`} className="oss-btn oss-btn-primary">
                    Download for Mac <Arrow />
                  </Link>
                  <a href={REPO} className="oss-btn">
                    <GitHubIcon /> Read the source
                  </a>
                </>
              )}
            </div>
            <p className="oss-small mt-6">macOS on Apple silicon · No account · No email · No card</p>
          </div>

          {/* The one-sentence architecture, drawn. */}
          <div className="oss-card relative p-6 md:p-7">
            <div className="flex items-center gap-3">
              <Mark size={44} />
              <div>
                <p className="oss-display font-semibold">Where your message goes</p>
                <p className="oss-small !text-[0.8rem]">The complete path, end to end</p>
              </div>
            </div>
            <ol className="mt-6 space-y-2.5">
              {[
                ['Your Mac', 'Clawless and the OpenClaw engine', true],
                ['Your AI provider', 'Anthropic, OpenAI, Google, Groq and more', false],
                ['Your Mac', 'The reply streams back into the chat', true],
              ].map(([t, d, local], i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl border border-[var(--oss-line)] bg-[var(--oss-surface-2)] px-4 py-3">
                  <span
                    className="oss-mono flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[0.7rem] font-semibold"
                    style={{ background: local ? 'var(--oss-accent-soft)' : 'var(--oss-surface)', color: 'var(--oss-accent)', border: '1px solid var(--oss-line-strong)' }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.92rem] font-semibold text-[var(--oss-ink)]">{t as string}</p>
                    <p className="oss-small truncate !text-[0.8rem]">{d as string}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-dashed border-[var(--oss-line-strong)] px-4 py-3">
              <span className="text-lg leading-none text-[var(--oss-muted)]">&#8856;</span>
              <p className="text-[0.86rem] text-[var(--oss-ink-2)]">
                <strong className="font-semibold text-[var(--oss-ink)]">No Clawless server in the path.</strong> Nothing to sign in to, nothing
                holding your chats.
              </p>
            </div>
            <div className="mt-4">
              <Source path="docs/knowledge-base/whats-under-the-hood.md" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Countdown ───────────────────────────────────────────── */}
      <section className="border-y border-[var(--oss-line)] bg-[var(--oss-surface-2)]">
        <div className="oss-wrap flex flex-col items-center gap-6 py-14 text-center">
          <p className="oss-eyebrow">Launch</p>
          <Countdown />
        </div>
      </section>

      {/* ── Checkable facts ─────────────────────────────────────── */}
      <section className="oss-wrap py-24">
        <div className="max-w-2xl">
          <p className="oss-eyebrow">Built to be checked</p>
          <h2 className="oss-h2 mt-4">Every claim on this page points at the code.</h2>
          <p className="oss-lede mt-5">
            {PRELAUNCH
              ? 'Clawless will be open source, so you will not have to take our word for anything. Each fact below names the file that backs it; the files are published with the source at launch.'
              : 'Clawless is open source, so you do not have to take our word for anything. Each fact below links to the file that backs it.'}
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACTS.map((f) => (
            <div key={f.label} className="oss-card flex flex-col justify-between p-5">
              <div>
                <p className="oss-display text-lg font-semibold">{f.label}</p>
                <p className="oss-small mt-1.5">{f.detail}</p>
              </div>
              <div className="mt-5">
                <Source path={f.source} />
              </div>
            </div>
          ))}
        </div>

        <div className="oss-card mt-4 flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
          <p className="oss-body !text-[0.95rem]">
            <strong className="font-semibold text-[var(--oss-ink)]">Reviewed by risk.</strong> Every pull request is checked against a written merge
            checklist, and changes to the main process, IPC or the network get a security pass.
          </p>
          <Source path="CONTRIBUTING.md" />
        </div>
      </section>

      {/* ── One Send, step by step ──────────────────────────────── */}
      <section className="border-t border-[var(--oss-line)]">
        <div className="oss-wrap py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="oss-eyebrow">What happens when you click Send</p>
              <h2 className="oss-h2 mt-4">Six steps, and you can read every one.</h2>
            </div>
            <Link href={`${P}/architecture/`} className="oss-btn">
              Trace it on the diagram <Arrow />
            </Link>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--oss-line)] bg-[var(--oss-line)] sm:grid-cols-2 lg:grid-cols-3">
            {SEND_PATH.map((s, i) => (
              <li key={i} className="bg-[var(--oss-surface)] p-6">
                <div className="flex items-center gap-3">
                  <span className="oss-mono text-[0.72rem] text-[var(--oss-accent)]">0{i + 1}</span>
                  <span className="oss-eyebrow !text-[var(--oss-muted)]">{s.who}</span>
                </div>
                <p className="oss-body mt-3">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-4">
            <Source path={SEND_PATH_SOURCE} />
          </div>
        </div>
      </section>

      {/* ── Three doors ─────────────────────────────────────────── */}
      <section className="oss-wrap pb-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['What it does', 'Agents, memory, skills, channels, automations, browser control and budget caps.', `${P}/what-it-does/`],
            ['Architecture', PRELAUNCH ? 'An interactive map of the system, with every part naming the files behind it.' : 'An interactive map of the system, with every part linked to the files behind it.', `${P}/architecture/`],
            ['Build on it', 'Set up the code, find your way around it, and send your first pull request.', `${P}/build/`],
          ].map(([t, d, h]) => (
            <Link key={h} href={h} className="oss-card group block p-6 transition-transform hover:-translate-y-0.5">
              <p className="oss-h3">{t}</p>
              <p className="oss-small mt-2">{d}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--oss-accent)]">
                Explore <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Invitation ──────────────────────────────────────────── */}
      <section className="oss-wrap pt-24">
        <div className="oss-card relative overflow-hidden p-8 md:p-14">
          <div className="oss-grid-bg pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div>
              <p className="oss-eyebrow">The source is yours</p>
              <h2 className="oss-h2 mt-4 max-w-xl">Fork it, extend it, take it somewhere new.</h2>
              <p className="oss-lede mt-5 max-w-xl">
                Clawless ships with a tested engine pairing, a security layer that treats agent output as untrusted, and a code base with a
                single, auditable boundary to the engine. Start from there.
              </p>
              <p className="oss-body mt-5 max-w-xl">
                Pull requests are welcome, with no promises: Clawless is maintained as energy allows and has no roadmap commitment. A
                natural first contribution is a Windows or Linux build.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`${P}/build/`} className="oss-btn oss-btn-primary">
                  Start building <Arrow />
                </Link>
                {PRELAUNCH ? (
                  <span className="inline-flex items-center px-2 text-sm text-[var(--oss-muted)]">CONTRIBUTING.md is published at launch</span>
                ) : (
                  <a href={blob('CONTRIBUTING.md')} className="oss-btn">
                    Read CONTRIBUTING.md
                  </a>
                )}
              </div>
            </div>
            <div className="oss-pre self-center text-[0.78rem]">
              <span className="text-[var(--oss-muted)]"># build from source{PRELAUNCH && ', available at launch'}</span>
              {'\n'}git clone {PRELAUNCH ? '<repository URL, published at launch>' : `${REPO}.git`}{'\n'}cd clawless-computer{'\n'}bun install{'\n'}bun run build{'\n'}bun run start
            </div>
          </div>
          <p className="oss-small relative mt-8">
            Engine: OpenClaw {ENGINE_VERSION}, MIT. Bundled and version-pinned. <Source path="package.json" />
          </p>
        </div>
      </section>
    </>
  );
}
