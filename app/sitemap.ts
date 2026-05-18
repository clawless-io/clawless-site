import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';
import { getAllChapterSlugs } from '@/lib/docs';

// Required for `output: 'export'` static export — Next.js otherwise treats
// metadata routes as dynamic and refuses to prerender them.
export const dynamic = 'force-static';

/**
 * Every URL ends with a trailing slash to match the site's
 * `trailingSlash: true` config. Sitemap entries without the slash
 * 301-redirect to the slashed canonical form, costing search
 * engines one extra crawl hop per URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const docsChapters = getAllChapterSlugs().map((slug) => ({
    url: `${SITE_URL}/docs/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/features/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pricing/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/docs/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...docsChapters,
    {
      url: `${SITE_URL}/download/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/family/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // /privacy, /terms, /subprocessors, /trust, /refunds, /acceptable-use
    // are intentionally excluded. Each carries a `noindex,follow` robots
    // meta tag so crawlers that discover them via footer links do not
    // include them in search results. Matches the rbjglobal-site pattern.
  ];
}
