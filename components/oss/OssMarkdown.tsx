/**
 * Renders a markdown file from the open-source tree in the redesign's theme.
 * Server component (react-markdown runs at build time in the static export).
 *
 * Link rewriting maps the repository's relative links onto the site, so a
 * reader moves between chapters and policies without bouncing out to GitHub:
 *   memory-system.md          -> /docs/memory-system/
 *   PRIVACY.md, SECURITY.md   -> /privacy/app/, /security/
 *   LICENSE                   -> /license/
 *   docs/knowledge-base/      -> /docs/
 *   src/..., build/..., etc.  -> the file on GitHub
 */
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { blob, tree } from './content';

const ROOT_DOCS: Record<string, string> = {
  'CONTRIBUTING.md': `/contributing/`,
  'CLA.md': `/cla/`,
  'PRIVACY.md': `/privacy/app/`,
  'SECURITY.md': `/security/`,
  LICENSE: `/license/`,
  'README.md': `/docs/`,
};

export function resolveHref(href: string | undefined): { href: string; external: boolean } {
  if (!href) return { href: '#', external: false };
  if (/^(https?:|mailto:)/.test(href)) return { href, external: href.startsWith('http') };
  if (href.startsWith('#')) return { href, external: false };
  const [p, hash = ''] = href.split('#');
  const h = hash ? `#${hash}` : '';
  const clean = p.replace(/^\.\//, '').replace(/^(\.\.\/)+/, '');
  if (ROOT_DOCS[clean]) return { href: ROOT_DOCS[clean] + h, external: false };
  const kb = clean.match(/^(?:docs\/knowledge-base\/)?([a-z0-9-]+)\.md$/);
  if (kb) return { href: `/docs/${kb[1]}/${h}`, external: false };
  if (/^docs\/knowledge-base\/?$/.test(clean)) return { href: `/docs/`, external: false };
  // Anything else is a path inside the repository: send it to GitHub.
  return { href: clean.endsWith('/') ? tree(clean) : blob(clean), external: true };
}

const components: Components = {
  h1: ({ children }) => <h1 className="oss-h2 mb-6 mt-2">{children}</h1>,
  h2: ({ children, id }) => (
    <h2 id={id} className="oss-display mb-4 mt-14 scroll-mt-24 text-[1.6rem] font-semibold tracking-[-0.02em] text-[var(--oss-ink)]">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="oss-display mb-3 mt-9 scroll-mt-24 text-[1.2rem] font-semibold tracking-[-0.01em] text-[var(--oss-ink)]">
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4 id={id} className="mb-2 mt-6 scroll-mt-24 font-semibold text-[var(--oss-ink)]">
      {children}
    </h4>
  ),
  p: ({ children }) => <p className="oss-body mb-5 !text-[1.02rem]">{children}</p>,
  a: ({ href, children }) => {
    const r = resolveHref(href);
    return (
      <a href={r.href} rel={r.external ? 'noopener' : undefined} className="oss-link">
        {children}
      </a>
    );
  },
  ul: ({ children }) => <ul className="mb-5 ml-5 list-disc space-y-2 text-[1.02rem] leading-[1.75] text-[var(--oss-ink-2)] marker:text-[var(--oss-muted)]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-5 ml-5 list-decimal space-y-2 text-[1.02rem] leading-[1.75] text-[var(--oss-ink-2)] marker:text-[var(--oss-muted)]">{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-[var(--oss-ink)]">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-r-lg border-l-2 border-[var(--oss-accent-bright)] bg-[var(--oss-surface-2)] px-5 py-1">{children}</blockquote>
  ),
  hr: () => <hr className="oss-rule my-10" />,
  code: ({ className, children }) => {
    const text = String(children ?? '');
    // The knowledge base tags each chapter `[Live]` or `[Planned]`; show it as a status pill.
    const status = text.match(/^\[(Live|Planned)\]$/);
    if (status)
      return (
        <span className="oss-pill !py-0.5 !text-[0.72rem]">
          <span className="oss-dot" style={status[1] === 'Planned' ? { background: 'var(--oss-muted)', boxShadow: 'none' } : undefined} />
          {status[1]}
        </span>
      );
    if (className) return <code className={className}>{children}</code>;
    return <code className="oss-code">{children}</code>;
  },
  pre: ({ children }) => <pre className="oss-pre my-6">{children}</pre>,
  table: ({ children }) => (
    <div className="oss-card my-6 overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-[0.92rem]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-b border-[var(--oss-line)] text-[var(--oss-muted)]">{children}</thead>,
  th: ({ children }) => <th className="px-4 py-3 font-medium">{children}</th>,
  tr: ({ children }) => <tr className="border-b border-[var(--oss-line)] last:border-0">{children}</tr>,
  td: ({ children }) => <td className="px-4 py-3 align-top text-[var(--oss-ink-2)]">{children}</td>,
};

export default function OssMarkdown({ source }: { source: string }) {
  return (
    <div className="oss-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // rehype-slug gives headings ids for deep links. No autolink plugin: wrapping every
        // heading in an <a> would pick up the link style and turn all headings into links.
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
