'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Mark from './Mark';
import { ThemeToggle } from './Theme';
import { PRELAUNCH, RELEASES, REPO, SHOW_ABOUT, blob } from './content';
import { ComingSoon, RepoLink } from './RepoLink';

/** Every redesign route lives under /preview/ until launch. Promoting it to the
 *  site root on launch day is a mechanical move plus this one constant. */
export const P = '/preview';

/** Docs are hidden until launch (the knowledge base is published with the source). */
const NAV = [
  { href: `${P}/what-it-does/`, label: 'What it does' },
  { href: `${P}/architecture/`, label: 'Architecture' },
  { href: `${P}/build/`, label: 'Build on it' },
  ...(PRELAUNCH ? [] : [{ href: `${P}/docs/`, label: 'Docs' }]),
  { href: `${P}/learn/`, label: 'Learn' },
];

export function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function ReviewBar() {
  return (
    <div className="border-b border-[var(--oss-line)] bg-[var(--oss-surface-2)]">
      <div className="oss-wrap flex flex-wrap items-center justify-between gap-3 py-2 text-xs">
        <span className="flex items-center gap-2 text-[var(--oss-muted)]">
          <span className="oss-mono rounded bg-[var(--oss-warn-bg)] px-1.5 py-0.5 text-[var(--oss-warn-ink)]">REVIEW BUILD</span>
          Local only, not public. Open-source redesign draft for the founder.
        </span>
        <span className="flex items-center gap-2 text-[var(--oss-muted)]">
          Direction <ThemeToggle />
        </span>
      </div>
    </div>
  );
}

export function Nav() {
  const path = usePathname() || '';
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--oss-line)] bg-[color-mix(in_srgb,var(--oss-bg)_82%,transparent)] backdrop-blur-xl">
      <div className="oss-wrap flex h-16 items-center justify-between gap-6">
        <Link href={`${P}/`} className="flex items-center gap-2.5" aria-label="Clawless Computer home">
          <Mark size={30} />
          <span className="oss-display text-lg font-semibold">Clawless Computer</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((n) => {
            const active = path.startsWith(n.href.replace(/\/$/, ''));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={
                  'rounded-full px-3 py-1.5 text-sm transition-colors ' +
                  (active ? 'bg-[var(--oss-surface-2)] text-[var(--oss-ink)]' : 'text-[var(--oss-muted)] hover:text-[var(--oss-ink)]')
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {PRELAUNCH ? (
            <>
              <span className="flex items-center gap-1.5 px-2 text-sm text-[var(--oss-muted)]">
                <GitHubIcon />
                Source at launch
              </span>
              <ComingSoon className="oss-btn oss-btn-primary !py-2 text-sm" />
            </>
          ) : (
            <>
              <a href={REPO} className="oss-btn !px-3 !py-2" aria-label="Source on GitHub">
                <GitHubIcon />
                <span className="text-sm">Source</span>
              </a>
              <Link href={`${P}/download/`} className="oss-btn oss-btn-primary !py-2 text-sm">
                Download
              </Link>
            </>
          )}
        </div>

        {/* Wrapper carries md:hidden: .oss-btn's display:inline-flex would override it on the button itself. */}
        <div className="md:hidden">
          <button className="oss-btn !px-3 !py-2 text-sm" aria-expanded={open} onClick={() => setOpen(!open)}>
            Menu
          </button>
        </div>
      </div>
      {open && (
        <nav className="oss-wrap flex flex-col gap-1 pb-4 md:hidden" aria-label="Mobile">
          {[...NAV, ...(PRELAUNCH ? [] : [{ href: `${P}/download/`, label: 'Download' }])].map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-[var(--oss-ink-2)] hover:bg-[var(--oss-surface-2)]">
              {n.label}
            </Link>
          ))}
          {PRELAUNCH && <span className="px-3 py-2 text-sm text-[var(--oss-muted)]">Download: coming soon</span>}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--oss-line)]">
      <div className="oss-wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Mark size={26} />
            <span className="oss-display font-semibold">Clawless Computer</span>
          </div>
          <p className="oss-small mt-4">
            A desktop app for OpenClaw. Free software under the GNU Affero General Public License v3. OpenClaw is a separate
            project under the MIT license.
          </p>
          <p className="oss-small mt-3">
            Stewarded by{' '}
            <a href="https://rbjglobal.com/" className="oss-link">
              RBJ Global LLC
            </a>
            .
          </p>
        </div>
        {PRELAUNCH ? (
          <FooterCol
            title="Project"
            links={[['Build on it', `${P}/build/`]]}
            note="The source, releases, contributing guide and Contributor License Agreement are published on GitHub at launch."
          />
        ) : (
          <FooterCol
            title="Project"
            links={[
              ['Source on GitHub', REPO],
              ['Releases', RELEASES],
              ['Contributing', `${P}/contributing/`],
              ['Contributor License Agreement', `${P}/cla/`],
            ]}
          />
        )}
        <FooterCol
          title="Trust"
          links={[
            ['Legal', `${P}/legal/`],
            ['Website privacy', `${P}/privacy/`],
            ...(PRELAUNCH ? [] : ([['App privacy', `${P}/privacy/app/`]] as [string, string][])),
            ['Security and trust', `${P}/trust/`],
            ['Support', `${P}/support/`],
          ]}
        />
        <FooterCol
          title="Site"
          links={[
            ['Architecture', `${P}/architecture/`],
            ...(PRELAUNCH ? [] : ([['Docs', `${P}/docs/`]] as [string, string][])),
            ['Learn', `${P}/learn/`],
            ['Family', `${P}/family/`],
            ...(SHOW_ABOUT ? ([['About', `${P}/about/`]] as [string, string][]) : []),
          ]}
        />
      </div>
      <div className="oss-wrap flex flex-col gap-2 border-t border-[var(--oss-line)] py-6 md:flex-row md:items-center md:justify-between">
        <p className="oss-small">
          This website counts visits with one cookieless, privacy-first counter. The app itself has no telemetry.
        </p>
        <p className="oss-small">The Clawless Computer name and logo identify the official project.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, note }: { title: string; links: [string, string][]; note?: string }) {
  return (
    <div>
      <p className="oss-eyebrow !text-[var(--oss-muted)]">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            {href.startsWith('http') ? (
              <a href={href} className="text-sm text-[var(--oss-ink-2)] hover:text-[var(--oss-ink)]">
                {label}
              </a>
            ) : (
              <Link href={href} className="text-sm text-[var(--oss-ink-2)] hover:text-[var(--oss-ink)]">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      {note && <p className="oss-small mt-3 max-w-[16rem] !text-[0.8rem]">{note}</p>}
    </div>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="oss">
      <ReviewBar />
      <Nav />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}

/** Shared page header for inner pages. */
export function PageHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--oss-line)]">
      <div className="oss-glow" />
      <div className="oss-grid-bg pointer-events-none absolute inset-0" />
      <div className="oss-wrap relative py-20 md:py-28">
        <p className="oss-eyebrow">{eyebrow}</p>
        <h1 className="oss-h2 mt-4 max-w-3xl">{title}</h1>
        <p className="oss-lede mt-5 max-w-2xl">{lede}</p>
      </div>
    </section>
  );
}

/** Small source citation, rendered under claims so a reader can check them. */
export function Source({ path }: { path: string }) {
  return (
    <RepoLink href={blob(path)} className="oss-mono inline-flex items-center gap-1 text-[0.72rem] text-[var(--oss-muted)] hover:text-[var(--oss-accent)]">
      <GitHubIcon size={11} />
      {path}
    </RepoLink>
  );
}
