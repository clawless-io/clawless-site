import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

// Required for `output: 'export'` static export — same as sitemap.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Placeholder legal pages are noindex'd at the page level too.
      // Disallow here is the politeness layer; the per-page robots meta
      // is the authoritative signal. Revisit when these pages get real
      // entity-of-record content per project-privacy-terms-llc-backlog.md.
      disallow: ['/privacy', '/terms'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
