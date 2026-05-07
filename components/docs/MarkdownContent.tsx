import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { Components } from 'react-markdown';

interface Props {
  source: string;
}

// Component overrides for prose rendering inside /docs chapters.
// Voice: institutional reading-page tone matching the rest of clawless.ai;
// styling is conservative and avoids fancy effects so the docs feel like
// reference material, not a marketing surface.
const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 mt-8 font-serif text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-text-primary first:mt-0 sm:text-[40px]">
      {children}
    </h1>
  ),
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="group mb-4 mt-12 scroll-mt-24 font-serif text-[24px] font-medium tracking-[-0.01em] text-text-primary sm:text-[28px]"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      className="mb-3 mt-8 scroll-mt-24 font-serif text-[19px] font-medium tracking-[-0.005em] text-text-primary sm:text-[20px]"
    >
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4
      id={id}
      className="mb-2 mt-6 scroll-mt-24 text-[16px] font-semibold text-text-primary"
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-[16px] leading-[1.8] text-text-secondary sm:text-[17px]">
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-accent underline underline-offset-2 hover:text-text-primary"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-[16px] leading-[1.8] text-text-secondary sm:text-[17px]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-[16px] leading-[1.8] text-text-secondary sm:text-[17px]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-accent/60 pl-5 text-[15px] italic leading-[1.8] text-text-muted sm:text-[16px]">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.startsWith('language-');
    if (isBlock) {
      return (
        <code className={`${className ?? ''} text-[14px]`}>{children}</code>
      );
    }
    return (
      <code className="rounded bg-bg-surface px-1.5 py-0.5 font-mono text-[0.92em] text-text-primary">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-5 overflow-x-auto rounded-xl border border-border-default bg-bg-surface p-4 font-mono text-[14px] leading-[1.7] text-text-secondary">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-10 border-border-light" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-[15px]">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-border-default px-3 py-2 text-left font-semibold text-text-primary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border-light px-3 py-2 align-top text-text-secondary">
      {children}
    </td>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
};

export default function MarkdownContent({ source }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
      components={components}
    >
      {source}
    </ReactMarkdown>
  );
}
