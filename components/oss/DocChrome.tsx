import Link from 'next/link';
import { blob } from './content';
import { GitHubIcon } from './Shell';
import { RepoLink } from './RepoLink';

/** Breadcrumb + the "this is the repository's own file" provenance strip. */
export function DocHeader({ crumbs, file, commit }: { crumbs: [string, string?][]; file: string; commit: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--oss-line)] pb-5">
      <nav aria-label="Breadcrumb" className="oss-small flex flex-wrap items-center gap-1.5 !text-[0.82rem]">
        {crumbs.map(([label, href], i) => (
          <span key={label} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-[var(--oss-line-strong)]">/</span>}
            {href ? (
              <Link href={href} className="hover:text-[var(--oss-ink)]">
                {label}
              </Link>
            ) : (
              <span className="text-[var(--oss-ink)]">{label}</span>
            )}
          </span>
        ))}
      </nav>
      <RepoLink href={blob(file)} className="oss-mono inline-flex items-center gap-1.5 text-[0.74rem] text-[var(--oss-muted)] hover:text-[var(--oss-accent)]">
        <GitHubIcon size={12} /> {file} at {commit.slice(0, 7)}
      </RepoLink>
    </div>
  );
}

export function SourceNote({ file }: { file: string }) {
  return (
    <p className="oss-small mt-14 border-t border-[var(--oss-line)] pt-6">
      This page is rendered from <span className="oss-code">{file}</span> in the repository, so it always matches the source.{' '}
      <RepoLink href={blob(file)} className="oss-link">
        View it on GitHub
      </RepoLink>
      .
    </p>
  );
}
