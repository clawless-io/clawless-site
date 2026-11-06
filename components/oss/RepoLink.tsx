/**
 * Pre-launch helpers. No 'use client': server pages and client components
 * (Shell, ArchitectureFlow) both import from here.
 *
 * While PRELAUNCH is true the repository is not public, so a link into it would
 * 404. Everything that points into RBJGlobal/clawless-computer goes through
 * RepoLink, which renders plain text marked "at launch" instead of a link.
 * Launch day: flip PRELAUNCH in content.ts and every one of these becomes a link.
 */
import { PRELAUNCH } from './content';

/** A link into the repository, or plain text marked "at launch" before launch. */
export function RepoLink({
  href,
  className,
  children,
  mark = true,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  /** Append "at launch" to the plain-text form. Off where the context already says so. */
  mark?: boolean;
}) {
  if (!PRELAUNCH) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  // Plain text must not look clickable: drop hover styles and the link underline class.
  const plain = className
    ?.split(/\s+/)
    .filter((c) => !c.startsWith('hover:') && !c.startsWith('group-hover:') && c !== 'oss-link')
    .join(' ');
  return (
    <span className={plain}>
      {children}
      {mark && <span className="text-[var(--oss-muted)]"> · at launch</span>}
    </span>
  );
}

/** The download CTA before launch: looks like the button, is not a link. */
export function ComingSoon({ className }: { className?: string }) {
  return (
    <span className={(className ?? '') + ' cursor-default'}>Coming soon</span>
  );
}
