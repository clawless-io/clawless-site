import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';
import { SHOW_ABOUT } from '@/components/oss/content';

// Required for `output: 'export'` static export: Next.js otherwise treats
// metadata routes as dynamic and refuses to prerender them.
export const dynamic = 'force-static';

/**
 * Every URL ends with a trailing slash to match the site's
 * `trailingSlash: true` config. Sitemap entries without the slash
 * redirect to the slashed canonical form, costing search engines one
 * extra crawl hop per URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  });

  return [
    entry('/', 1, 'weekly'),
    entry('/what-it-does/', 0.9),
    entry('/architecture/', 0.8),
    entry('/build/', 0.7),
    entry('/download/', 0.9),
    entry('/learn/', 0.5),
    entry('/family/', 0.5),
    ...(SHOW_ABOUT ? [entry('/about/', 0.8)] : []),
    entry('/support/', 0.4),
    // Excluded on purpose:
    // - /privacy/, /legal/, /trust/: legal pages, each with a noindex,follow
    //   robots meta tag (RBJ Global family rule). Footer links stay.
    // - /docs/ and /docs/<chapter>/: a one-line "published with the source at
    //   launch" notice before launch, noindex,follow. Add them at launch, along
    //   with /contributing/ (parked in app/_at-launch until then).
  ];
}
