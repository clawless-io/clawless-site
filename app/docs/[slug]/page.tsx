import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/effects/ScrollReveal';
import MarkdownContent from '@/components/docs/MarkdownContent';
import { getContent } from '@/lib/cms';
import {
  getAllChapterSlugs,
  getCategoryForSlug,
  getChapterMarkdown,
  getChapterMeta,
} from '@/lib/docs';
import { pageMetadata, SITE_URL } from '@/lib/metadata';

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

export function generateStaticParams(): PageParams[] {
  return getAllChapterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterMeta(slug);
  if (!chapter) return { title: 'Documentation' };
  return pageMetadata(`/docs/${slug}/`, {
    title: `${chapter.title} | Documentation`,
    description: chapter.description,
  });
}

export default async function DocsChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapterMeta(slug);
  const category = getCategoryForSlug(slug);
  if (!chapter || !category) {
    notFound();
  }

  const markdown = getChapterMarkdown(slug);
  const pageUrl = `${SITE_URL}/docs/${slug}/`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: chapter.title,
      description: chapter.description,
      url: pageUrl,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Documentation', item: `${SITE_URL}/docs/` },
        { '@type': 'ListItem', position: 3, name: chapter.title, item: pageUrl },
      ],
    },
  ];

  return (
    <div className="relative z-[1]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar content={getContent().content.nav} />
      <main id="main-content" className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <section className="pb-8 pt-28">
          <ScrollReveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-3 text-[12px] font-medium uppercase tracking-[0.16em] text-text-muted"
            >
              <Link href="/docs/" className="hover:text-accent">
                Docs
              </Link>
              <span className="mx-2 text-text-muted/60">/</span>
              <span>{category.title}</span>
            </nav>
          </ScrollReveal>
        </section>

        <section className="mx-auto max-w-[760px] pb-24">
          <ScrollReveal>
            <article className="text-text-secondary">
              <MarkdownContent source={markdown} />
            </article>

            <nav
              aria-label="Section navigation"
              className="mt-16 flex items-center justify-between border-t border-border-light pt-8 text-[14px] text-text-muted"
            >
              <Link
                href="/docs/"
                className="text-accent hover:text-text-primary"
              >
                ← Back to all chapters
              </Link>
              <span className="text-[12px] uppercase tracking-[0.12em]">
                {category.title}
              </span>
            </nav>
          </ScrollReveal>
        </section>
      </main>
      <Footer content={getContent().content.footer} />
    </div>
  );
}
