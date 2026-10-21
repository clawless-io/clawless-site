import Link from 'next/link';

const P = '/preview';

/**
 * Frame for the site's OWN legal pages (website privacy, security and trust,
 * support, the legal hub). Distinct from ProjectDocPage, which renders the
 * repository's files verbatim.
 *
 * These are DRAFTS prepared for the founder's ruling and Founder Advisor's
 * review (2026-10-21). They ship only on launch day, with the founder's direct
 * word, and the advisor legal-docs mirror is synced in the same session.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="oss-wrap py-12">
      <article className="mx-auto max-w-[760px]">
        <nav aria-label="Breadcrumb" className="oss-small flex items-center gap-1.5 border-b border-[var(--oss-line)] pb-5 !text-[0.82rem]">
          <Link href={`${P}/legal/`} className="hover:text-[var(--oss-ink)]">
            Legal
          </Link>
          <span className="text-[var(--oss-line-strong)]">/</span>
          <span className="text-[var(--oss-ink)]">{title}</span>
        </nav>
        <div className="mt-8 flex flex-wrap items-center gap-2 rounded-lg border border-[var(--oss-warn-line)] bg-[var(--oss-warn-bg)] px-4 py-3 text-[0.86rem] text-[var(--oss-warn-ink)]">
          <span className="oss-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em]">Draft</span>
          Prepared for the founder&apos;s ruling. Not published. The current notice stays live until launch day.
        </div>
        <h1 className="oss-h2 mt-8">{title}</h1>
        <p className="oss-small mt-3">Last updated: {updated}</p>
        <div className="mt-8">{children}</div>
      </article>
    </div>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="oss-display mb-3 mt-12 text-[1.35rem] font-semibold tracking-[-0.015em] text-[var(--oss-ink)]">{children}</h2>;
}
export function Para({ children }: { children: React.ReactNode }) {
  return <p className="oss-body mb-4 !text-[1.02rem]">{children}</p>;
}
export function Mail({ to }: { to: string }) {
  return (
    <a href={`mailto:${to}`} className="oss-link">
      {to}
    </a>
  );
}
